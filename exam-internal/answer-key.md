# Roamly — private tutor reference

Follow AGENTS.md. Review the student's evidence first; give one progressive hint at a time. Do not reveal issue counts, undiscovered principles or this reference in the product. Severity assumes a mixed travel-booking audience. Each row is one finding; closely related symptoms are not extra findings. Additional supported observations are welcome.

## Functional and accessibility

| # | Page/component | Problem / course concept | Severity | Reproduce or detect | Expected improvement |
|---|---|---|---|---|---|
| 01 | Header destinations | Submenu is pointer-hover-only. Keyboard parity. | Medium | Tab to Find a stay and attempt to open destination choices. Main search remains an alternative route. | Use a keyboard-operable disclosure and expanded state. |
| 02 | Header heart link | Icon-only link has no accessible name. | Medium | Inspect saved-places link in accessibility tree. | Name it Saved places. |
| 03 | Favourite buttons | Hearts have neither meaningful names nor pressed state; saved status relies on colour/fill. Name/role/value. | High | Inspect and activate a SaveButton with a screen reader. | Add name, aria-pressed and perceivable status. |
| 04 | Favourite focus | Explicit focus-visible override removes the global focus ring. | Medium | Tab to a card heart against its photograph. | Retain a contrasting visible focus indicator. |
| 05 | Gallery entry/thumbnails | Clickable divs/images cannot be operated from the keyboard. Semantic controls. | High | Tab through gallery and attempt to open/select photos. | Use named native buttons. |
| 06 | Gallery/map overlays | No dialog semantics, focus containment, initial/return focus or Escape handling. Composite dialog finding. | High | Open either overlay, Tab beyond it, press Escape and inspect accessibility tree. | Use labelled modal dialogs with contained/restored focus and keyboard dismissal. |
| 07 | Image alternatives | Repeated generic Room alternatives in gallery; Amsterdam home image is named image. | Medium | Read images using accessibility tools or inspect DOM. | Describe meaningful differences; mark redundant decoration appropriately. |
| 08 | Guest stepper | Plus/minus lack task-specific accessible names and boundary disabled states. | Medium | Read property-panel controls and decrement at one guest. | Name actions and expose boundaries. |
| 09 | Policy heading | h4 follows h2 peer sections without an intervening h3. Heading hierarchy. | Low | Inspect property page heading outline. | Match section heading levels. |
| 10 | SPA navigation | Routes scroll to top without managing focus or announcing the new view. Orientation. | Medium | Navigate by keyboard/screen reader, inspect focus after route changes. | Focus/announce a suitable heading and update route titles. |
| 11 | Fine print | Faint small fees, terms and newsletter text are difficult to read. Contrast/legibility. | Medium | Measure actual foreground/background contrast; inspect at normal zoom. | Improve contrast and text size without flattening hierarchy. |

## Reliable and performance

| # | Page/component | Problem / course concept | Severity | Reproduce or detect | Expected improvement |
|---|---|---|---|---|---|
| 12 | Hero loading | Above-fold dominant image uses loading=lazy. Loading priority/LCP. | Medium | Inspect markup and a throttled cold-load waterfall. Do not assert a guaranteed timing loss without measurement. | Load eagerly with suitable priority. |
| 13 | Lower photos | Destination, listing and inspiration photos are all eager, including below-fold content. | Medium | Compare cold-load requests with visible content. | Defer below-fold images appropriately. |
| 14 | Photo sizing | 2400px originals serve cards, thumbnails, summaries and large galleries without srcset/sizes. | Medium | Compare rendered and downloaded dimensions/bytes. Same-URL images may share a response within a page. | Generate responsive sizes and thumbnail derivatives. |
| 15 | Sorting | Unrelated 1.8-million-iteration synchronous calculation precedes sorting. Main-thread responsiveness. | Medium | Profile sort changes with CPU throttling; inspect changeSort. | Remove unrelated computation. |
| 16 | Route delivery | All pages are eagerly bundled for the initial load. | Low | Inspect build output and initial JS requests. Measure actual impact. | Split routes if measured initial-load costs justify it. |
| 17 | Motion preferences | Smooth scrolling, photo zoom, promo entrance and spinner ignore reduced-motion preference. | Medium | Emulate reduced motion and repeat interactions. | Reduce nonessential movement; retain useful static feedback. |
| 18 | Promo layout shift | Promotional strip inserts after 2.2 seconds without reserved space. | Medium | Cold load while watching content move or record Layout Shifts. | Reserve space or render initial content consistently. |
| 19 | Results loading | Search/apply replaces cards with a blank fixed-height region during the mock delay. Status/perceived performance. | Medium | Search or apply filters. | Show meaningful loading feedback and preserve context. |
| 20 | Server caching | Static server sends no-store even for hashed JS and photographs. Repeat-resource efficiency. | Low | Inspect response headers and repeated loads with Disable cache off. | Use suitable cache policy for versioned runtime assets. |

## Usable: forms and control

| # | Page/component | Problem / course concept | Severity | Reproduce or detect | Expected improvement |
|---|---|---|---|---|---|
| 21 | Pricing journey | Mandatory 8.5% fee and €3.50/person/night tax are added only at payment; earlier disclosure does not permit final-price comparison. | High | Compare listing estimate and final payment total with identical trip choices. | Show mandatory-inclusive trip totals earlier, with breakdown. |
| 22 | Guest fields | Name/email/phone use placeholders without persistent associated labels/accessibility names. | High | Fill fields and inspect accessibility tree. | Provide visible labels and autocomplete purposes. |
| 23 | Guest phone | type=number poorly supports international + and formatting; seeded +32 phone may appear blank. | Medium | Enter international numbers; compare the profile's tel control. | Use tel and tolerant string validation. |
| 24 | Checkout errors | Validation is late and broad; no field associations, invalid state or error focus. | High | Submit with one invalid guest/payment field. Date errors are more specific. | Provide field-specific errors, preserve inputs and focus a helpful summary/field. |
| 25 | Password requirements | Registration rules appear only after failure. Error prevention. | Medium | Register with a simple password. | Explain requirements before input. |
| 26 | Registration retry | Any validation failure clears the entire password, even if email is wrong. Recovery effort. | Medium | Valid password, invalid email, submit. | Retain password in memory while correcting unrelated fields. |
| 27 | Login feedback | Something went wrong gives no useful correction guidance. | Medium | Submit malformed email or incorrect credentials. | Give actionable non-enumerating credentials feedback and recovery route. |
| 28 | Keep signed in | Checkbox is never read; persistent login occurs either way. Control/outcome consistency. | Medium | Uncheck, sign in and reopen in the same browser context; inspect localStorage. | Implement session choice or remove the promise. |
| 29 | Optional Trip Care | Paid €29 extra is preselected by default. Informed opt-in/control. | High | Inspect extras step and subtotal. | Default paid extras off and explain coverage clearly. |
| 30 | Checkout policy links | Terms/privacy navigation unmounts checkout; browser Back loses draft details. | High | Fill details, follow terms, then Back. Refresh alone is a separate simulation boundary. | Show terms without losing state, or retain a safe draft across routes; never persist card fields. |
| 31 | Step progress | Current/completed stages have visual classes but no programmatic current state or step announcement. | Medium | Inspect progress strip with accessibility tools while advancing. | Ordered steps, aria-current=step, suitable focus/announcement. |
| 32 | Cancellation | Cancel immediately mutates a reservation, including non-refundable rates, with no confirmation or undo. | High | Manage reservation, cancel and reload. Lab restart is not product undo. | Confirm reservation and consequences before cancellation; provide recovery where possible. |
| 33 | Filter counts | Type counts reflect all 24 properties rather than the current destination. | Low | Search Lisbon and compare counts against its four stays. | Scope counts appropriately or label them as global. |
| 34 | Contact validation | Undisclosed 20-character message minimum produces Please complete all fields. | Medium | Send a short meaningful message with valid name/email. | Explain justified constraints and identify the actual field error. |

## Pleasurable, feedback and consistency

| # | Page/component | Problem / course concept | Severity | Reproduce or detect | Expected improvement |
|---|---|---|---|---|---|
| 35 | Preference switches | role=switch divs are non-focusable and have no keyboard handlers. | High | Tab/Space through preferences, compare pointer operation. | Use native keyboard controls with switch state. |
| 36 | Display preferences | Currency/language persist as saved, but header, content and prices stay English/EUR. One consistency finding. | Medium | Save GBP or French, browse and refresh. | Apply supported preferences or remove unavailable choices. |
| 37 | Save feedback timing | Preferences saved appears before the 1.1-second delay and storage write. | Medium | Save and immediately close/reload; inspect write timing. Route unmount alone may still allow callback completion. | Show pending state, then success after completion. |
| 38 | Toast feedback | Profile/cancellation/copied-link feedback uses plain divs without live status announcements. | Medium | Trigger a toast with a screen reader and inspect semantics. | Suitable live-region status and persistent context for important changes. |
| 39 | Dynamic results | Filter/load-more changes have no result-count announcement or deliberate route to new results. Distinct from blank loading. | Medium | Apply filters/load more using keyboard or screen reader. | Announce concise counts while retaining usable focus. |
| 40 | Newsletter scope | Newsletter action also agrees to partner communications in faint fine print without a separate choice. Trust/consent clarity. | Medium | Compare signup promise and fine print. Do not make unsupported legal claims. | State scope prominently and offer independent optional partner consent. |
| 41 | Route metadata | Homepage title/description remain static on property, booking, account and support pages. Orientation/SEO. | Low | Compare document.title and metadata across routes. | Use descriptive route titles; only require public indexing architecture for a real public deployment. |

## Positive and contextual patterns

Accept supported positives: native labelled date inputs; date order, nights and capacity checks; useful empty states; keyboard-operable native FAQ accordions; labelled login/visibility controls and autocomplete; search as an alternative to hover menus; limited load-more DOM growth; per-account persistence; checkout Back preserving values inside the flow; consistent final price arithmetic; duplicate-reservation guard; no persistent raw password/card data; actual policy disclosure; guest checkout and local recovery.

Fixed sample dates, approximate maps, simulated support/payment/email and browser-only identity are stated boundaries, not automatic failures. Popular-choice wording alone does not prove dishonest scarcity. Local photos and fictional reviews do not identify a real property. Performance claims require measurement; do not infer conformance, fraud or psychological effects from markup alone. Neutral task: compare stays, save favourites, make a reservation and manage your travel plans.
