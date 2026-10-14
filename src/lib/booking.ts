/**
 * Google Calendar appointment schedule for booking a demo.
 * Quinten's "Vesalius.ai demo" booking page; NEXT_PUBLIC_BOOKING_URL overrides it.
 * Set it to an empty string and the demo page falls back to the request form only.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ??
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ts89HzqE7VH6eh3EGxfUagsusw-osZWM8DxRpi98OYsAzLDQ-1finyfdgoM9PHkwB9aZ_km3n?gv=true';

/**
 * Google's embed needs the long schedule URL with ?gv=true; short calendar.app.google links are opened in a new tab instead.
 * `hl` shows Google's own labels (dates, buttons) in the site language.
 */
export function bookingEmbedUrl(url: string, locale: string): string | null {
  if (!url.includes('calendar.google.com/calendar/appointments')) return null;
  const embed = new URL(url);
  embed.searchParams.set('gv', 'true');
  embed.searchParams.set('hl', locale);
  return embed.toString();
}
