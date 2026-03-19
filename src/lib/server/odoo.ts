import 'server-only';

import type { TicketSubmission } from '@/lib/forms/types';

type OdooApiMode = 'json2' | 'jsonrpc';

type OdooConfig = {
  apiKey: string;
  apiMode: OdooApiMode;
  apiUser?: string;
  baseUrl: string;
  database?: string;
  helpdeskLocaleField?: string;
  helpdeskOrganisationField?: string;
  helpdeskSourcePageField?: string;
  helpdeskTeamId?: number;
  helpdeskTeamName: string;
  helpdeskTicketTypeField?: string;
  helpdeskTicketTypeMap: Record<string, string | number>;
};

type JsonRpcResult<T> = {
  error?: {
    code: number;
    message: string;
    data?: {
      message?: string;
    };
  };
  result?: T;
};

class OdooRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function parseOptionalInteger(name: string) {
  const value = getEnv(name);

  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : undefined;
}

function parseOptionalJson<T>(name: string, fallback: T): T {
  const value = getEnv(name);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getOdooConfig(): OdooConfig {
  const baseUrl = getEnv('ODOO_BASE_URL');
  const apiKey = getEnv('ODOO_API_KEY');

  if (!baseUrl || !apiKey) {
    throw new Error('Odoo configuration is incomplete.');
  }

  return {
    apiKey,
    apiMode: (getEnv('ODOO_API_MODE') as OdooApiMode | undefined) ?? 'json2',
    apiUser: getEnv('ODOO_API_USER'),
    baseUrl: baseUrl.replace(/\/$/, ''),
    database: getEnv('ODOO_DATABASE'),
    helpdeskLocaleField: getEnv('ODOO_HELPDESK_LOCALE_FIELD'),
    helpdeskOrganisationField: getEnv('ODOO_HELPDESK_ORGANISATION_FIELD'),
    helpdeskSourcePageField: getEnv('ODOO_HELPDESK_SOURCE_PAGE_FIELD'),
    helpdeskTeamId: parseOptionalInteger('ODOO_HELPDESK_TEAM_ID'),
    helpdeskTeamName: getEnv('ODOO_HELPDESK_TEAM_NAME') ?? 'Vesalius Support',
    helpdeskTicketTypeField: getEnv('ODOO_HELPDESK_TICKET_TYPE_FIELD'),
    helpdeskTicketTypeMap: parseOptionalJson<Record<string, string | number>>(
      'ODOO_HELPDESK_TICKET_TYPE_MAP',
      {},
    ),
  };
}

async function fetchJson<T>(url: string, init: RequestInit, timeoutMs = 15_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });

    const text = await response.text();
    let body: T | undefined;

    if (text) {
      try {
        body = JSON.parse(text) as T;
      } catch {
        body = undefined;
      }
    }

    if (!response.ok) {
      const message =
        typeof body === 'object' &&
        body !== null &&
        'message' in body &&
        typeof body.message === 'string'
          ? body.message
          : text
            ? `Odoo request failed with status ${response.status}: ${text.slice(0, 300)}`
            : `Odoo request failed with status ${response.status}.`;

      throw new OdooRequestError(message, response.status);
    }

    if (typeof body === 'undefined') {
      if (text) {
        throw new OdooRequestError(`Odoo returned a non-JSON response: ${text.slice(0, 300)}`);
      }

      return undefined as T;
    }

    return body;
  } finally {
    clearTimeout(timeout);
  }
}

async function callJson2<T>(
  config: OdooConfig,
  model: string,
  method: string,
  payload: Record<string, unknown>,
) {
  return fetchJson<T>(`${config.baseUrl}/json/2/${model}/${method}`, {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      ...(config.database ? { 'X-Odoo-Database': config.database } : {}),
    },
    method: 'POST',
  });
}

async function jsonRpcRequest<T>(
  config: OdooConfig,
  service: string,
  method: string,
  args: unknown[],
) {
  const body = await fetchJson<JsonRpcResult<T>>(`${config.baseUrl}/jsonrpc`, {
    body: JSON.stringify({
      id: Date.now(),
      jsonrpc: '2.0',
      method: 'call',
      params: {
        args,
        method,
        service,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (body.error) {
    throw new OdooRequestError(body.error.data?.message ?? body.error.message);
  }

  if (typeof body.result === 'undefined') {
    throw new OdooRequestError('Odoo returned an empty response.');
  }

  return body.result;
}

let cachedRpcUid: number | null = null;

async function getJsonRpcUid(config: OdooConfig) {
  if (cachedRpcUid !== null) {
    return cachedRpcUid;
  }

  if (!config.database || !config.apiUser) {
    throw new OdooRequestError('ODOO_DATABASE and ODOO_API_USER are required for JSON-RPC mode.');
  }

  const uid = await jsonRpcRequest<number>(config, 'common', 'authenticate', [
    config.database,
    config.apiUser,
    config.apiKey,
    {},
  ]);

  if (!uid) {
    throw new OdooRequestError('Unable to authenticate with Odoo.');
  }

  cachedRpcUid = uid;
  return uid;
}

async function callJsonRpcModelMethod<T>(
  config: OdooConfig,
  model: string,
  method: string,
  args: unknown[] = [],
  kwargs: Record<string, unknown> = {},
) {
  if (!config.database) {
    throw new OdooRequestError('ODOO_DATABASE is required for JSON-RPC mode.');
  }

  const uid = await getJsonRpcUid(config);

  return jsonRpcRequest<T>(config, 'object', 'execute_kw', [
    config.database,
    uid,
    config.apiKey,
    model,
    method,
    args,
    kwargs,
  ]);
}

function shouldFallbackToJsonRpc(error: unknown) {
  return error instanceof OdooRequestError && [404, 405, 501].includes(error.status ?? 0);
}

async function callModelMethod<T>(
  config: OdooConfig,
  model: string,
  method: string,
  payload: Record<string, unknown>,
  rpcArgs: unknown[] = [],
  rpcKwargs: Record<string, unknown> = {},
) {
  if (config.apiMode === 'json2') {
    try {
      return await callJson2<T>(config, model, method, payload);
    } catch (error) {
      if (!shouldFallbackToJsonRpc(error)) {
        throw error;
      }
    }
  }

  return callJsonRpcModelMethod<T>(config, model, method, rpcArgs, rpcKwargs);
}

async function searchRead<T>(
  config: OdooConfig,
  model: string,
  params: {
    domain: unknown[];
    fields: string[];
    limit?: number;
  },
) {
  return callModelMethod<T[]>(
    config,
    model,
    'search_read',
    params,
    [],
    params,
  );
}

export async function createOdooRecord(
  model: string,
  values: Record<string, unknown>,
) {
  const config = getOdooConfig();
  return callModelMethod<number>(
    config,
    model,
    'create',
    { vals_list: values },
    [values],
  );
}

async function resolveHelpdeskTeamId(config: OdooConfig) {
  if (config.helpdeskTeamId) {
    return config.helpdeskTeamId;
  }

  const teams = await searchRead<{ id: number }>(config, 'helpdesk.team', {
    domain: [['name', '=', config.helpdeskTeamName]],
    fields: ['id'],
    limit: 1,
  });

  const teamId = teams[0]?.id;

  if (!teamId) {
    throw new OdooRequestError(`Helpdesk team "${config.helpdeskTeamName}" was not found.`);
  }

  return teamId;
}

function formatTicketDescription(submission: TicketSubmission) {
  return [
    submission.description,
    '',
    '---',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Organisation: ${submission.organisation ?? 'Not provided'}`,
    `Ticket type: ${submission.ticketType}`,
    `Locale: ${submission.locale}`,
    `Source page: ${submission.sourcePage}`,
  ].join('\n');
}

export async function createHelpdeskTicket(submission: TicketSubmission) {
  const config = getOdooConfig();
  const teamId = await resolveHelpdeskTeamId(config);
  const ticketValues: Record<string, unknown> = {
    description: formatTicketDescription(submission),
    name: submission.subject,
    partner_email: submission.email,
    partner_name: submission.name,
    team_id: teamId,
  };

  if (config.helpdeskOrganisationField && submission.organisation) {
    ticketValues[config.helpdeskOrganisationField] = submission.organisation;
  }

  if (config.helpdeskLocaleField) {
    ticketValues[config.helpdeskLocaleField] = submission.locale;
  }

  if (config.helpdeskSourcePageField) {
    ticketValues[config.helpdeskSourcePageField] = submission.sourcePage;
  }

  if (config.helpdeskTicketTypeField) {
    ticketValues[config.helpdeskTicketTypeField] =
      config.helpdeskTicketTypeMap[submission.ticketType] ?? submission.ticketType;
  }

  const ticketId = await callModelMethod<number>(
    config,
    'helpdesk.ticket',
    'create',
    { vals_list: ticketValues },
    [ticketValues],
  );

  if (submission.attachment) {
    await createOdooRecord('ir.attachment', {
      datas: submission.attachment.dataBase64,
      mimetype: submission.attachment.type,
      name: submission.attachment.name,
      res_id: ticketId,
      res_model: 'helpdesk.ticket',
      type: 'binary',
    });
  }

  return ticketId;
}
