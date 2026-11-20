/** Where an existing customer goes to work: the app's root signs them in, or straight through when Keycloak still knows them. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://assistant.vesalius.ai/';

/** Set by the Vesalius app after a login, on the whole vesalius.ai domain; it holds no personal data, only "1". */
export const ACCOUNT_HINT_COOKIE = 'vh_has_account';

/** The cookie policy lists this cookie as a functionality cookie, so a visitor who switched those off is not recognised. */
function functionalityRefused(): boolean {
  try {
    const consent = window.localStorage.getItem('cookie-consent');
    return consent ? (JSON.parse(consent) as { functionality?: boolean }).functionality === false : false;
  } catch {
    return false;
  }
}

/** True when this browser has logged in to the Vesalius app before. Browser only; false on the server. */
export function hasAccountHint(): boolean {
  if (typeof document === 'undefined') return false;
  if (functionalityRefused()) return false;
  return document.cookie.split(';').some((part) => part.trim() === `${ACCOUNT_HINT_COOKIE}=1`);
}
