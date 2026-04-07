# Vesalius Website

Public marketing site built with Next.js. The frontend replaces the Odoo website pages while preserving the current live backend behavior:

- homepage contact section sends an email to `finance@vesalius.health`
- `/contactus` sends an email to `help@vesalius.health`
- pricing routes into the `/contactus` email flow
- support creates a Helpdesk ticket in Odoo under `Vesalius Support`
- demo currently uses an email-based request flow

## Getting Started

1. Copy `.env.example` to `.env.local`
2. Fill in the values you already know
3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Setup

### Values already known from the current Odoo setup

These can be filled in now:

```env
HOMEPAGE_CONTACT_RECIPIENT_EMAIL=finance@vesalius.health
CONTACT_PAGE_RECIPIENT_EMAIL=help@vesalius.health
PRICING_RECIPIENT_EMAIL=help@vesalius.health
DEMO_RECIPIENT_EMAIL=help@vesalius.health
ODOO_BASE_URL=https://vesalius.odoo.com
ODOO_HELPDESK_TEAM_NAME=Vesalius Support
DEMO_SUBMISSION_MODE=email
```

### Values that still need access from someone else

#### Mail / SMTP

These come from whoever manages the `vesalius.health` mailbox or email provider:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Without these, the contact and demo forms cannot send mail from the React app.

Set the Turnstile keys to enable Cloudflare's anti-spam challenge on the public contact, demo, and support forms. If the keys are left blank, the forms still keep the honeypot, submit-timing check, and in-memory rate limiting, but Turnstile verification stays disabled.

This may be free if Vesalius already pays for domain email that includes SMTP. If not, a transactional mail provider may be needed.

#### Odoo Helpdesk API

These are needed for the support form:

```env
ODOO_DATABASE=
ODOO_API_USER=
ODOO_API_KEY=
```

`ODOO_API_KEY` is generated inside Odoo on the user account used for the integration. A dedicated integration user is recommended, but if you do not have access to user management yet, someone with Odoo admin access will need to create it.

### Optional Odoo field mapping

These can stay blank for now:

```env
ODOO_HELPDESK_TICKET_TYPE_FIELD=
ODOO_HELPDESK_TICKET_TYPE_MAP={}
ODOO_HELPDESK_ORGANISATION_FIELD=
ODOO_HELPDESK_LOCALE_FIELD=
ODOO_HELPDESK_SOURCE_PAGE_FIELD=
```

If they stay blank, support tickets still get created, and those values remain visible in the generated ticket description text.

### FAQ CMS admin

To enable the FAQ admin, add these values:

```env
FAQ_ADMIN_USERNAME=
FAQ_ADMIN_PASSWORD=
FAQ_ADMIN_SECRET=
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOY_KEY=
```

Then visit `/en/admin/login`, `/nl/admin/login`, or `/fr/admin/login`.

The CMS now persists FAQ content and uploads through Convex.
The existing `src/data/faq-content.json` file remains as a local fallback and migration seed until Convex contains FAQ content.

## Current Blockers

- no SMTP credentials means email forms cannot work in production yet
- no Odoo API credentials means the support form cannot create Helpdesk tickets yet
- no Turnstile keys means public forms rely on the fallback anti-spam checks only

## Verification

Useful checks:

```bash
npm run lint
npm run build
```
