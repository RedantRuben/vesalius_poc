import 'server-only';

import { randomUUID } from 'node:crypto';
import net from 'node:net';
import tls from 'node:tls';

import {
  DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL,
  DEFAULT_DEMO_RECIPIENT_EMAIL,
} from '@/lib/forms/constants';
import type { ContactSubmission, DemoSubmission } from '@/lib/forms/types';

type MailMessage = {
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  to: string[];
};

type SmtpConfig = {
  from: string;
  host: string;
  pass?: string;
  port: number;
  secure: boolean;
  user?: string;
};

type SmtpResponse = {
  code: number;
  lines: string[];
};

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function getSmtpConfig(): SmtpConfig {
  const host = getEnv('SMTP_HOST');
  const portValue = getEnv('SMTP_PORT');
  const from = getEnv('SMTP_FROM');

  if (!host || !portValue || !from) {
    throw new Error('SMTP configuration is incomplete.');
  }

  const port = Number(portValue);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('SMTP_PORT must be a valid number.');
  }

  return {
    from,
    host,
    pass: getEnv('SMTP_PASS'),
    port,
    secure: port === 465,
    user: getEnv('SMTP_USER'),
  };
}

function parseEnvelopeAddress(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).trim();
}

function formatAddressList(addresses: string[]) {
  return addresses.join(', ');
}

function dotStuff(value: string) {
  return value
    .replace(/\r?\n/g, '\r\n')
    .split('\r\n')
    .map((line) => (line.startsWith('.') ? `.${line}` : line))
    .join('\r\n');
}

function createMessageId(domain: string) {
  return `<${randomUUID()}@${domain}>`;
}

function createResponseReader(socket: net.Socket | tls.TLSSocket) {
  let buffer = '';
  let currentLines: string[] = [];
  const queued: SmtpResponse[] = [];
  const waiters: Array<(response: SmtpResponse) => void> = [];

  socket.on('data', (chunk) => {
    buffer += chunk.toString('utf8');

    while (buffer.includes('\n')) {
      const newlineIndex = buffer.indexOf('\n');
      const line = buffer.slice(0, newlineIndex).replace(/\r$/, '');
      buffer = buffer.slice(newlineIndex + 1);
      currentLines.push(line);

      if (/^\d{3} /.test(line)) {
        const response = {
          code: Number(line.slice(0, 3)),
          lines: [...currentLines],
        };

        currentLines = [];

        const next = waiters.shift();

        if (next) {
          next(response);
        } else {
          queued.push(response);
        }
      }
    }
  });

  return {
    async read() {
      if (queued.length > 0) {
        return queued.shift()!;
      }

      return new Promise<SmtpResponse>((resolve) => {
        waiters.push(resolve);
      });
    },
  };
}

async function openSocket(config: SmtpConfig) {
  const socket = config.secure
    ? tls.connect({
        host: config.host,
        port: config.port,
        servername: config.host,
      })
    : net.createConnection({
        host: config.host,
        port: config.port,
      });

  socket.setTimeout(20_000);

  await new Promise<void>((resolve, reject) => {
    const successEvent = config.secure ? 'secureConnect' : 'connect';
    socket.once(successEvent, resolve);
    socket.once('error', reject);
    socket.once('timeout', () => reject(new Error('SMTP connection timed out.')));
  });

  return socket;
}

async function upgradeSocket(socket: net.Socket | tls.TLSSocket, host: string) {
  const secureSocket = tls.connect({
    servername: host,
    socket,
  });

  secureSocket.setTimeout(20_000);

  await new Promise<void>((resolve, reject) => {
    secureSocket.once('secureConnect', resolve);
    secureSocket.once('error', reject);
    secureSocket.once('timeout', () => reject(new Error('SMTP STARTTLS upgrade timed out.')));
  });

  return secureSocket;
}

async function expectResponse(
  reader: ReturnType<typeof createResponseReader>,
  expectedCodes: number[],
) {
  const response = await reader.read();

  if (!expectedCodes.includes(response.code)) {
    throw new Error(`SMTP error ${response.code}: ${response.lines.join(' ')}`);
  }

  return response;
}

async function writeLine(socket: net.Socket | tls.TLSSocket, line: string) {
  await new Promise<void>((resolve, reject) => {
    socket.write(`${line}\r\n`, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function writeRaw(socket: net.Socket | tls.TLSSocket, value: string) {
  await new Promise<void>((resolve, reject) => {
    socket.write(value, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function sendSmtpMail(message: MailMessage) {
  const config = getSmtpConfig();
  let socket = await openSocket(config);
  let reader = createResponseReader(socket);

  await expectResponse(reader, [220]);
  await writeLine(socket, `EHLO ${config.host}`);
  const ehloResponse = await expectResponse(reader, [250]);

  if (!config.secure && ehloResponse.lines.some((line) => line.includes('STARTTLS'))) {
    await writeLine(socket, 'STARTTLS');
    await expectResponse(reader, [220]);

    socket = await upgradeSocket(socket, config.host);
    reader = createResponseReader(socket);
    await writeLine(socket, `EHLO ${config.host}`);
    await expectResponse(reader, [250]);
  }

  if (config.user && config.pass) {
    await writeLine(socket, 'AUTH LOGIN');
    await expectResponse(reader, [334]);
    await writeLine(socket, Buffer.from(config.user).toString('base64'));
    await expectResponse(reader, [334]);
    await writeLine(socket, Buffer.from(config.pass).toString('base64'));
    await expectResponse(reader, [235]);
  }

  await writeLine(socket, `MAIL FROM:<${parseEnvelopeAddress(message.from)}>`);
  await expectResponse(reader, [250]);

  for (const recipient of message.to) {
    await writeLine(socket, `RCPT TO:<${parseEnvelopeAddress(recipient)}>`);
    await expectResponse(reader, [250, 251]);
  }

  await writeLine(socket, 'DATA');
  await expectResponse(reader, [354]);

  const domain = parseEnvelopeAddress(message.from).split('@')[1] ?? 'localhost';
  const headers = [
    `From: ${message.from}`,
    `To: ${formatAddressList(message.to)}`,
    `Subject: ${message.subject}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: ${createMessageId(domain)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
  ];

  if (message.replyTo) {
    headers.push(`Reply-To: ${message.replyTo}`);
  }

  const payload = `${headers.join('\r\n')}\r\n\r\n${dotStuff(message.text)}\r\n.\r\n`;
  await writeRaw(socket, payload);
  await expectResponse(reader, [250]);
  await writeLine(socket, 'QUIT');
  await expectResponse(reader, [221]);
  socket.end();
}

function createMetadataBlock(
  locale: string,
  organisation: string | undefined,
  sourcePage: string,
) {
  return [
    `Locale: ${locale}`,
    `Source page: ${sourcePage}`,
    `Organisation: ${organisation ?? 'Not provided'}`,
  ].join('\n');
}

export async function sendContactEmail(
  submission: ContactSubmission,
  recipient = process.env.CONTACT_PAGE_RECIPIENT_EMAIL?.trim() || DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL,
) {
  const text = [
    'New website contact form submission',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    createMetadataBlock(submission.locale, submission.organisation, submission.sourcePage),
    '',
    `Subject: ${submission.subject}`,
    '',
    submission.message,
  ].join('\n');

  await sendSmtpMail({
    from: getSmtpConfig().from,
    replyTo: submission.email,
    subject: `[Website Contact] ${submission.subject}`,
    text,
    to: [recipient],
  });
}

export async function sendDemoEmail(
  submission: DemoSubmission,
  recipient = process.env.DEMO_RECIPIENT_EMAIL?.trim() ||
    process.env.CONTACT_PAGE_RECIPIENT_EMAIL?.trim() ||
    DEFAULT_DEMO_RECIPIENT_EMAIL,
) {
  const text = [
    'New website demo request',
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    createMetadataBlock(submission.locale, submission.organisation, submission.sourcePage),
    `Role: ${submission.role ?? 'Not provided'}`,
    '',
    submission.message,
  ].join('\n');

  await sendSmtpMail({
    from: getSmtpConfig().from,
    replyTo: submission.email,
    subject: '[Website Demo] Demo request',
    text,
    to: [recipient],
  });
}
