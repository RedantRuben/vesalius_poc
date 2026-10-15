import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import {routing} from './i18n/routing';
import {
  CHOICE_COOKIE,
  SPECIALTY_URL_PARAMS,
  SPECIALTY_URL_VALUES,
  disciplinePath,
  hasDisciplineVersion,
  isTailoredId,
  type SiteLocale,
} from './lib/disciplines';
import { getLocalizedPath } from './lib/seo';

const intl = createMiddleware(routing);

/** "/nl/product/scribe" → nl, "/product/scribe"; unprefixed paths are English. */
function splitLocale(pathname: string): { locale: SiteLocale; rest: string } {
  const [, first = ''] = pathname.split('/');
  if (first === 'nl' || first === 'fr' || first === 'en') return { locale: first, rest: pathname.slice(first.length + 1) || '/' };
  return { locale: 'en', rest: pathname };
}

/**
 * Discipline URLs on the server, before any page renders:
 * - old sales links (?specialiteit=orthopedie) move permanently to the discipline's own URL;
 * - a visitor who chose a discipline earlier opens its version of the homepage and module pages.
 * Crawlers carry no cookie, so they always see the standard pages plus every discipline URL in the sitemap.
 */
export default function middleware(request: NextRequest) {
  const response = intl(request);
  if (response.headers.get('location')) return response; // the language redirect comes first

  const { pathname, searchParams } = request.nextUrl;
  const { locale, rest } = splitLocale(pathname);
  if (!hasDisciplineVersion(rest)) return response;

  const legacyKey = SPECIALTY_URL_PARAMS.find((key) => searchParams.has(key));
  const legacy = legacyKey ? SPECIALTY_URL_VALUES[searchParams.get(legacyKey)!.trim().toLowerCase()] : undefined;
  const choice = legacy ?? request.cookies.get(CHOICE_COOKIE)?.value;
  if (!isTailoredId(choice)) return response;

  // Other parameters are kept as written (a flag such as ?demo-nudge gets no "=")
  const kept = request.nextUrl.search
    .slice(1)
    .split('&')
    .filter((part) => part && !SPECIALTY_URL_PARAMS.includes(decodeURIComponent(part.split('=')[0])));
  const target = `${getLocalizedPath(locale, disciplinePath(choice, locale, rest))}${kept.length ? `?${kept.join('&')}` : ''}`;
  const redirect = NextResponse.redirect(new URL(target, request.url), legacy ? 308 : 307);
  if (legacy) redirect.cookies.set(CHOICE_COOKIE, choice, { path: '/', maxAge: 31536000, sameSite: 'lax' });
  return redirect;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
