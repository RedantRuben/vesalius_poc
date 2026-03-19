import 'server-only';

type LogLevel = 'info' | 'error';

function write(level: LogLevel, event: string, data: Record<string, unknown>) {
  const payload = {
    event,
    level,
    timestamp: new Date().toISOString(),
    ...data,
  };

  const serialized = JSON.stringify(payload);

  if (level === 'error') {
    console.error(serialized);
    return;
  }

  console.info(serialized);
}

export const submissionLogger = {
  error(event: string, data: Record<string, unknown>) {
    write('error', event, data);
  },
  info(event: string, data: Record<string, unknown>) {
    write('info', event, data);
  },
};
