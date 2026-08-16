# Reference Ground Truth

This project is a **UI/UX case-study prototype** inspired by the public iMobile banking app listing and the user-provided reference imagery. The visual direction follows the supplied screenshots: warm orange-to-red banking brand energy, white utility surfaces, compact mobile-first cards, bottom navigation, account summary, service discovery, payments, cards, bills, investments, and offers.

The implementation is intentionally **not an exact deployable copy of a live banking product**. It is a clearly marked mock experience with no network banking APIs, no login collection, no OTP/PIN collection, no payment processing, and no real transaction capability. User-supplied account details are treated as case-study mock data and are displayed only in masked or clearly labeled prototype contexts.

## Visual System

- **Design movement:** Reference-led mobile banking editorialism: bold campaign orange, high-contrast white surfaces, soft depth, and product photography-like visual anchors translated into a responsive app shell.
- **Core principles:** fast recognition; action-first hierarchy; warm confidence without pretending to be live; dense capability discoverability; clear separation between overview, payment, and management tasks.
- **Color philosophy:** orange signals momentum and opportunity, deep maroon provides seriousness and depth, warm off-white keeps the utility layer calm, and blue-green accents are reserved for status and trust cues.
- **Layout paradigm:** a mobile app canvas centered in a desktop presentation frame, with a persistent top utility bar, horizontally scrollable summary rail, asymmetric action tiles, and a fixed bottom navigation on mobile.
- **Signature elements:** orange brand header, account card with reveal balance, rounded service tiles with line icons, and an always-visible prototype badge.
- **Interaction philosophy:** every tile should feel actionable; taps open a focused sheet or screen; successful mock actions produce a receipt-like confirmation; unavailable integrations explain themselves rather than dead-ending.
- **Animation:** quick 160–240ms ease-out transitions, gentle card elevation on press, staggered first-load content, and reduced-motion support.
- **Typography system:** Plus Jakarta Sans for the product UI with a heavier display weight for campaign headings; compact labels use uppercase tracking sparingly.
- **Brand essence:** a warm, approachable banking case-study prototype that shows how a large service catalog can feel navigable and human. Personality: assured, practical, optimistic.
- **Brand voice:** concise, reassuring, and explicit about mock state. Example lines: “Move money in a few considered taps.” and “This is a prototype receipt — no funds were moved.”
- **Wordmark & logo:** use a custom circular “i” signal mark paired with the word “iMobile” in a strong italicized display treatment, while keeping the prototype disclaimer visible.
- **Signature brand color:** `#F47B20` — a vivid saffron-orange chosen to carry the campaign identity across the app shell.

## Scope for the first delivery

The prototype should include a mock welcome/login gate, home dashboard, masked account balance reveal, account details, send-money flow, bill-pay flow, card management, discover/investments, transaction history, profile/settings, toast feedback, and a small install prompt. All data is local state only.
