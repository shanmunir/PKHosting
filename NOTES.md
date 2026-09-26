# PKHosting pricing audit notes

Six observations from https://www.pkhosting.com/pricing/:

1. Element: Billing-period tabs (Monthly / Annually / 2 years / 3 years) — each tab label carries its own "Save up to X%" text (e.g. "Annually Save up to 16%"). Consequence: the discount is advertised on the control itself, before the user even selects it, which is stronger nudging than a badge appearing after the fact — I replicated this by keeping the toggle simple (two options only) since our brief only asks for Monthly/Annually.

2. Element: Per-plan annual disclosure line — every card prints "Rs X,XXX/yr (10× monthly) if billed annually · Recurring rate; notified price changes may apply" directly under the price. Consequence: the math is shown in plain text next to the number, not hidden in a tooltip or footnote — I followed this pattern by computing and displaying the annual total and per-month figure inline on each card rather than only in a badge.

3. Element: Inconsistent annual multiplier across product lines — shared hosting and dedicated servers use "10× monthly" for the annual price, but Cloud/Premium VPS plans use "11× monthly" (e.g. Cloud VPS Starter: Rs 3,499/mo → Rs 38,490/yr, which is 11 months, not 10). Consequence: the "10 months for 12" rule this assignment specifies is not universal on the live site — I stuck strictly to the assignment's stated 10-for-12 rule rather than copying VPS's actual 11× pattern.

4. Element: Currency indicator in the top bar — the live page only exposes a flag + currency code chip ("PKR") in the header, not a visible dropdown of currency options in the static markup. Consequence: currency switching there is likely driven by a client-side control (JS-rendered) rather than a plain <select>, so the underlying prices are probably fetched or converted dynamically — I chose a plain, visible <select> instead so the currency control still works with JavaScript disabled (prices just stay in PKR, per the assignment's testing note).

5. Element: Tier badges ("Economical", "Most Popular", "Best Value") on every card grid, with the middle tier consistently marked "Most Popular". Consequence: visual hierarchy is used to steer buyers to the mid-tier plan — I used the same pattern, marking Growth (the second of four plans) as "Most popular".

6. Element: Footer payment strip — shows exactly five hotlinked SVG icons (Stripe, PayPal, JazzCash, Easypaisa, Bank account), not eight. Consequence: PKHosting's own live footer already keeps the list short and focused on methods relevant to a Pakistani buyer (two local wallets, one bank option, two card/international gateways) — I followed that logic rather than inventing extra methods, and noted this discrepancy with the assignment brief below.

Trade-offs made
- State persistence: used `localStorage` to persist currency + billing period across reloads. Simple, client-only, no cookies/consent needed for a static demo.
- Payment methods: the live site's footer shows five methods, not eight as the brief states — I could not find eight anywhere in the public pricing/checkout flow, so I kept PKHosting's own five (Bank transfer, cards via local gateway, JazzCash, Easypaisa, PayPal) rather than fabricate methods PKHosting doesn't actually list, and added Payoneer as a sixth for international freelancer-type buyers. No logos used — text-only labels, per the "no hotlinked logos" rule.
