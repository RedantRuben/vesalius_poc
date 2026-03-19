# Odoo export

These files flatten the current React homepage into Odoo-safe static fragments.

## Files

- `header_fragment.html`
  Paste into the Odoo header/layout area, not inside the homepage body.
- `homepage_fragment.html`
  Use this for the homepage body. If you are editing the raw `website.homepage` template, keep the outer `<t t-call="website.layout">...` wrapper and replace the current `#wrap` block with this fragment.
- `homepage_inline_fragment.html`
  Fallback version with the critical CSS embedded directly in the HTML. Use this if Odoo's CSS editor crashes or if you want a single pasteable homepage body first.
- `vesalius-odoo.css`
  Paste into Odoo custom CSS or your theme stylesheet.
- `vesalius-odoo.js`
  Paste into Odoo custom JS. It only handles the mobile nav, header scroll state, active nav highlighting, and reveal animations.

## Odoo placement

1. Header:
   Replace the content of your custom header template, usually under `Frontend Layout > Template Header Default` or the navbar-related template you already use.
2. Homepage:
   Replace the current homepage body with `homepage_fragment.html`.
   If the CSS panel in Odoo is unreliable, use `homepage_inline_fragment.html` instead.
3. CSS:
   Add `vesalius-odoo.css` in the Odoo HTML/CSS editor or in `Custom Code`.
4. JS:
   Add `vesalius-odoo.js` in the Odoo JS area or custom script block.

## Important adjustments after paste

- Logo path:
  `header_fragment.html` currently uses `/logo.webp`. Replace that with your real Odoo media path if needed.
- Product links:
  The product cards still point to paths like `/product/pre-consultation`. If those Odoo pages do not exist yet, swap those links before publishing.
- Contact form:
  The form keeps Odoo's `/website/form/` submission pattern and the `email_to` target from your current homepage. If your form model or recipient differs, update those fields.

## Notes

- The CSS is namespaced with `vo-` to reduce conflicts with Odoo styles.
- I kept the React visual hierarchy and tone, but replaced React/Tailwind/Framer Motion behavior with static HTML, custom CSS, and a little vanilla JS.
