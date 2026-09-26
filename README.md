# PKHosting VPS Hosting (static demo)

A static, offline pricing page for a hypothetical VPS product line, built as a front-end exercise. No real PKHosting data, accounts, or backend involved — prices and plans are invented for this assignment.

## How to open
1. Unzip / clone the repo.
2. Open `index.html` directly in a browser (double-click, or File → Open). No build step, no server, no dependencies — it's plain HTML/CSS/JS.
3. Works fully offline. Toggle billing period and currency; both persist across reloads via `localStorage`.

## Browsers tested
- Chrome (desktop, and responsive mode at 360 / 768 / 1440)
- Firefox (desktop)

## What is unfinished / out of scope
- No checkout flow or backend — the "Choose plan" buttons show a demo alert only.
- No real payment integration — payment method names in the footer are labels only, no logos, no live gateways.
- Currency conversion uses two hard-coded exchange rates (USD, GBP) rather than a live rate API, per the assignment's "no API keys" constraint.
- Lighthouse report included as a static export in the repo; scores not optimized to 100 (not required by the brief).

## AI assistant disclosure
I used Claude (Anthropic) as an assistant while building this: All code was written/reviewed by me and I can walk through and explain every part of it, including the pricing math and the accessibility choices, in a follow-up call.

## Key decisions
- Prices live in the HTML (`data-month` attributes) so the page is correct even with JavaScript disabled — JS only recalculates/reformats on top of that.
- Annual price = (monthly × 10) / 12, computed in code, not typed in — this matches the assignment's exact rule (not the live site's VPS 11× pattern, see NOTES.md).
- Comparison table sits in its own `overflow-x: auto` container so it scrolls internally on narrow viewports without causing page-level horizontal scroll.
- Price changes are pushed to a visually-hidden `aria-live="polite"` region so screen reader users hear updates without a visible layout change.
