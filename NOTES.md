# PKHosting pricing audit notes

1. Element: Billing toggle — PKHosting shows a billing toggle that changes visible pricing. Consequence: Users can compare monthly vs annual costs quickly.
2. Element: Currency selector — PKHosting offers currencies. Consequence: Exchange rates must be accurate and consistent; I hard-code rates to avoid external calls.
3. Element: Price badges — They highlight popular plans and promotions. Consequence: Visual emphasis drives conversions.
4. Element: Large comparison table — Shows many columns and rows. Consequence: Needs its own scroll container to avoid page-level overflow and maintain mobile usability.
5. Element: CTA placement — PKHosting repeats CTAs near plans and hero. Consequence: Keeps users funnelled to purchase; I include primary CTAs in both hero and plans.

Trade-offs made
- State persistence: I use `localStorage` to survive reloads. This is simple and privacy-friendly for a static demo.
- Dropped payment methods: PKHosting lists eight; I present six focusing on commonly used local methods and removing partnerships requiring affiliate integrations or brand assets.
