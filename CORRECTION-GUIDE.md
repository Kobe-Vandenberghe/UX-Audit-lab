# UX Audit Lab — correction guide

**Spoilers: this file contains the intended findings for all ten websites.** It is a study reference, separate from the website interface. Nothing in the sites loads or displays this guide.

Based on the project handoff and the implemented scenarios. No student observations have been assessed yet; these are the expected discussion points, not a record of answers you have already given.

## How to use this correction paper

For each observation, explain **what happens**, **how it affects the user**, and, where useful, **how to improve it**. Naming a particular law is optional. The principle names below are connections to explore, not required vocabulary or mutually exclusive answers.

- **Correct:** identifies the actual behavior and explains a reasonable usability consequence.
- **Partially correct:** identifies the behavior but gives an incomplete or overly broad explanation.
- **Incorrect:** describes behavior that does not occur, or gives a conclusion unsupported by the evidence.
- **Needs discussion:** offers a plausible interpretation that depends on audience, context, or evidence we do not have.

The six intended findings per scenario are a starting point, not a limit on valid observations. Additional well-supported findings count. Do not count several paraphrases of the same issue as separate discoveries. A mixed evaluation can be stronger than an absolute claim.

Evaluate the fictional product, while distinguishing its intended behavior from the shared lab controls. For example, **Restart site** resets demo data; it is not the fictional product's own Undo feature. Simulated payments, silent music playback, and sample file previews are implementation limits, not automatically UX defects.

## 01 — NovaShop

[Open website](scenarios/01-webshop.html) · Electronics store

**Task:** Browse products, add one to the cart, and attempt checkout. Try an invalid email before completing an order with fictional details.

1. **Bad — the checkout presents too much information at once.** Twenty fields appear on one page without meaningful personal, shipping, and payment sections. The user must work out the structure and relevance of the fields themselves, increasing effort and the chance of abandonment. Group related fields, remove unnecessary ones, and consider steps where appropriate. **Connections:** cognitive load, chunking, minimalist design. Twenty fields alone is not proof that a multi-step form is always better; their necessity and organization matter.

2. **Bad — submitting gives no visible processing feedback.** After **Place order**, there is a three-second delay without a spinner, changed button label, or visible disabled state. The user cannot tell whether the click registered. Show immediate progress and communicate that submission is underway. **Connections:** visibility of system status, perceived performance, Doherty threshold. The code internally ignores duplicate pending submissions; do not claim that repeated clicks actually create multiple orders.

3. **Bad — an invalid email clears the whole form.** Enter some details and an invalid email, then submit. All fields reset after the delay, even though most entries may be valid. This destroys work and makes recovery unnecessarily expensive. Preserve the entries and identify the email problem beside its field. **Connections:** error recovery, user control, error prevention. The technical message `E-104: customer validation failed` is also a valid criticism: it gives little guidance on what to fix.

4. **Good — recognizable product categories narrow the catalog.** **Headphones**, **Computers**, and **Accessories** filter the displayed products. Users can recognize a relevant category instead of scanning everything. Keep the labels understandable and the categories predictable. **Connections:** recognition rather than recall, information organization, reduced cognitive load.

5. **Bad — delivery costs appear after the order is placed.** The cart and checkout show a subtotal. Only the order confirmation adds **€14.95 delivery**. The user commits before seeing the complete cost, undermining informed choice and trust. Show delivery and the full total before placing the order. **Connections:** transparency, matching expectations, error prevention. This is later than merely revealing a fee on a final review screen.

6. **Good — the familiar cart symbol includes a live item count.** Adding and removing products changes the count in the header. This combines a recognizable shopping convention with feedback about the current state. **Connections:** consistency and standards, recognition, visibility of system status. A recognizable icon does not remove the need for an accessible name.

## 02 — Finora Banking

[Open website](scenarios/02-banking.html) · Everyday banking

**Task:** Find the current balance, locate the transfer action, and send a fictional amount. Inspect the navigation and recipient actions.

1. **Bad — the primary transfer action is a small target.** The **Send** button sits in the upper-right corner of the balance card and is much smaller than surrounding controls. It is easy to overlook and harder to tap precisely, especially on a phone. Give this frequent action a larger target and stronger placement. **Connections:** Fitts's law, visual hierarchy, touch usability. Reachability depends on device and grip; explain the likely context rather than calling one corner universally wrong.

2. **Bad — navigation requires interpreting branded labels.** **Orbit**, **Nest**, and **Spectrum** stand in for everyday banking, savings, and investment functions. Decorative symbols do little to explain the destinations. Users must learn the product's terminology before performing familiar tasks. Prefer explicit labels such as **Accounts**, **Savings**, and **Investments**, optionally retaining the brand names secondarily. **Connections:** match with the real world, Jakob's law, recognition rather than recall.

3. **Bad — confirmation and deletion look too similar.** In the transfer dialog, **Confirm transfer** and **Delete recipient** have the same purple styling and similar prominence. One completes the user's task; the other removes a saved recipient. Distinguish the destructive action, separate it spatially, and provide suitable confirmation or recovery. **Connections:** error prevention, consistency of action meaning. The destructive action deletes a recipient, not the bank account or the transfer itself.

4. **Good — the account balance has strong visual prominence.** The large, clearly labeled available balance is easy to find on the dashboard. It answers a common banking question with little searching. **Connections:** information hierarchy, visibility of system status, recognition.

5. **Bad — specialist investment information dominates daily banking.** Six investment panels expose derivatives, leverage, and risk metrics alongside the basic account view. For an everyday banking audience, this competes with common tasks and adds unfamiliar information. Put advanced tools in a clearly labeled secondary section or adapt the dashboard to the user's needs. **Connections:** progressive disclosure, cognitive load, minimalist design. An expert trading audience could justify different priorities.

6. **Good — a successful transfer gives concrete confirmation.** The result names the recipient and amount, and the balance and activity list update. Users can verify what happened rather than infer success from a disappearing dialog. **Connections:** visibility of system status, clear feedback, error recognition. This is confirmation of the result, not a separate pre-transfer review step.

## 03 — TaskForge

[Open website](scenarios/03-project-manager.html) · Project management

**Task:** Explore the task list, open a task, change its status, and delete an outdated task. Try Undo and the recent-task view.

1. **Bad — the task list offers little help with prioritization.** Forty tasks appear in one long table without grouping, filtering, or name search. IDs and status labels provide some structure, but the user still has to scan many unrelated rows. Add relevant filters, grouping, or search. **Connections:** cognitive load, chunking, scanning efficiency. A table is not inherently poor UX; the issue is the effort needed for the actual task.

2. **Bad — the direct lookup workflow requires a remembered ID.** **Open task by ID** accepts a value such as `TF-107`, rather than a task title or description. Users must remember or copy an identifier. Support title search, suggestions, or a picker. **Connections:** recognition rather than recall, working memory. Tasks can also be opened directly from list rows, so claiming that every task can only be opened through an ID would be incorrect.

3. **Good — deletion has a working Undo action.** Delete a task and use **Undo** within ten seconds: the actual task returns to the list. This supports recovery from accidental deletion without forcing a confirmation dialog for every action. **Connections:** user control and freedom, error recovery. The time limit is a legitimate tradeoff: users who notice later may still need a trash or history feature.

4. **Good — project completion is visible and updates.** The initial **85%** indicator changes when task completion changes. This makes progress toward the project goal easy to understand. **Connections:** visibility of system status, goal-gradient effect. It measures the proportion of tasks marked done; do not assume it accounts for task size or effort.

5. **Bad — status colors change meaning between views.** Open a **To do** or **In progress** task and compare the detail badge with its list badge. Blue and amber are swapped between those views. Users cannot rely on a stable visual mapping. Use consistent colors and retain text labels. **Connections:** consistency and standards, similarity. Done remains green; not every status changes color.

6. **Good — recently opened tasks reduce repeat navigation.** Open a few tasks, then choose **Recent tasks**. The list gives a short route back to those items. **Connections:** recognition rather than recall, flexibility and efficiency. It begins empty and populates through use; that initial empty state is not proof that the feature is broken.

## 04 — EchoWave

[Open website](scenarios/04-streaming.html) · Music streaming

**Task:** Find a song, use the playback controls, and add it to a playlist. Explore search, genre filtering, sorting, and the playlist view.

1. **Good — playback controls use familiar conventions.** Play/pause, previous, and next use recognizable symbols and respond to interaction. This reduces the learning needed for a common action. **Connections:** Jakob's law, recognition, consistency and standards.

2. **Mixed, usually bad — playback starts without a request.** Opening the site starts the simulated player and advances its timer. Autoplay takes control away from someone who may only want to browse. In a real audio product it could also be disruptive. Start paused or provide an explicit preference. **Connections:** user control and freedom, matching expectations. This demo is silent: do not report that audible music played. Autoplay may be appropriate in a clearly expected continuation context.

3. **Good — a large music collection can be searched and narrowed.** The library contains **120 tracks**. Search matches song titles and artists, genre filters narrow results, and sorting changes their order. These tools reduce scanning effort as the collection grows; the playlist view also supports them. **Connections:** flexibility and efficiency, recognition, reduced cognitive load.

4. **Bad — adding a track requires unnecessary menu steps.** Follow **More options → Track options → Organize → Add to a playlist → choose playlist**. A frequent action is buried behind several intermediate choices. Offer a direct **Add to playlist** action or a shorter contextual menu. **Connections:** task efficiency, interaction cost, aesthetic-usability effect. Attractive styling does not establish that the workflow is efficient.

5. **Good — the player persists across views.** Navigate between Discover, the library, and playlists. The current track, playback state, and controls remain in the same player. **Connections:** consistency, visibility of system status, user control. Navigation does not restart the track.

6. **Bad — promotional dialogs interrupt browsing.** After several action-button interactions, a promotion can interrupt the current activity. Repeated interruptions compete with finding and organizing music. Reduce their frequency, move offers out of the task path, or use a non-blocking placement. **Connections:** flow, selective attention, cognitive load. These are interaction-triggered promotions, not evidence of a particular time-based ad schedule.

## 05 — StayNest

[Open website](scenarios/05-travel.html) · Hotel booking

**Task:** Search for a stay, inspect a hotel, and attempt a reservation. Try reversed dates and look for price/location filters.

1. **Bad — invalid date combinations are accepted until submission.** Select a checkout date before check-in. The form permits the selection and only explains the problem when reserving. Prevent invalid combinations early and keep a clear recovery message as a fallback. **Connections:** error prevention, helpful validation. The error is eventually detected; claiming that an invalid reservation succeeds would be incorrect.

2. **Good — the booking total is calculated automatically.** The detail form updates nights × nightly rate, **6% tax**, and an **€18 service fee** as dates change. Users do not have to perform the arithmetic or assemble the total themselves. **Connections:** Tesler's law, reducing user effort, visibility of system status. A zero-night display during an invalid selection does not make the dates valid.

3. **Good — search has an observable loading state.** Submit **Find a stay** to see skeleton placeholders before results arrive. They acknowledge that the search is running and preserve an expectation of the upcoming layout. **Connections:** visibility of system status, perceived performance. Initial results are already available; trigger a search to observe the loading state. Skeletons are not proof that the underlying request is faster.

4. **Bad — useful filters are hidden under an unclear label.** **Adjust your view** opens maximum-price and location controls. The wording suggests display settings rather than narrowing hotel results. Label it **Filters**, expose important filters directly, and communicate active filters. **Connections:** discoverability, match with the real world, recognition. Destination selection is visible separately, so location is not wholly inaccessible.

5. **Good — hotel information is grouped into clear cards.** Each card brings its illustration, name, location, rating, price, and action together. Users can associate the information with the correct hotel and compare alternatives. **Connections:** common region, proximity, visual hierarchy.

6. **Bad if unsupported — the room-scarcity message creates pressure.** Hotel details show **Only 2 rooms left!** The simulation has no inventory system supporting that claim. Real products should show scarcity only when accurate, relevant, and current. **Connections:** misleading urgency, informed choice, trust. From the visible wording alone, a student can identify pressure or ask for evidence; they cannot prove that a real site's inventory claim is false. The lack of backing is known here from the scenario specification.

## 06 — FitPulse

[Open website](scenarios/06-fitness.html) · Fitness tracking

**Task:** Inspect weekly progress, choose an experience level, start a workout, and try pausing, resuming, ending, and completing it.

1. **Good — the weekly goal is concrete and visible.** The dashboard starts at **3 of 5 workouts** and shows the remaining sessions. Completing the full workout increases that count. **Connections:** goal visibility, goal-gradient effect, feedback. The bar makes the remaining distance understandable; it does not guarantee that everyone will find the goal motivating.

2. **Bad — motivational dialogs interrupt the workout.** Every few action-button interactions during an active workout can trigger a blocking encouragement message. Users must dismiss it before using the workout controls again, disrupting attention. Prefer optional encouragement between exercises or non-blocking feedback. **Connections:** flow, selective attention, user control. The messages are triggered by interactions; they are not continuous scheduled notifications.

3. **Bad — the experience choice does not adapt the session.** Beginners and experienced users receive the same burpees, jump squats, diamond push-ups, and mountain climbers, with the same targets. A choice that does not change the workout can mislead users about its suitability. Adapt difficulty or provide clearly explained alternatives. **Connections:** challenge-skill balance, flow, matching expectations. Exercise suitability depends on the person; the core observation is the lack of adaptation.

4. **Bad — the reservation countdown creates artificial urgency.** The pre-workout dialog claims a session reservation will expire. The timer has no actual booking limit behind it and cycles again rather than enforcing a meaningful deadline. Remove it unless a genuine limit exists, and explain any genuine consequences. **Connections:** misleading urgency, trust. Seeing a countdown alone is reason to question its purpose, not proof that every countdown is deceptive.

5. **Good — exercises include instructions.** Each workout screen explains how to perform the current movement, accompanied by an illustration. Users can consult guidance where they need it instead of remembering instructions from elsewhere. **Connections:** help and documentation, recognition, reduced memory demands. The illustration is static and generic; this is not a detailed technique video or a personalized coaching assessment.

6. **Good — the user can pause, resume, and end the workout.** The controls have explicit labels, and pausing stops the workout timer. Ending leaves the session; completing all exercises updates weekly progress. **Connections:** user control and freedom, visibility of system status. Finishing early is not counted as completing the full workout. Notification interruptions can still undermine access to otherwise clear controls.

## 07 — CloudBox

[Open website](scenarios/07-cloud-storage.html) · Storage plans and registration

**Task:** Compare the three plans, inspect pricing details, and complete registration using fictional details and a throwaway demo password.

1. **Mixed — the middle plan is strongly recommended.** The Plus card has a distinct border, background, and **Recommended for you** badge. This can guide attention and make comparison easier. However, no needs assessment explains why that plan fits this user. Justify the recommendation or describe the intended audience. **Connections:** Von Restorff effect, attention, informed choice. Highlighting a plan is neither automatically helpful nor automatically manipulative.

2. **Good — each pricing plan forms a clear visual group.** Price, storage, features, and the selection action sit inside a distinct card. Users can identify which details belong together. **Connections:** common region, proximity, chunking. Clear grouping can coexist with unclear pricing terms.

3. **Bad — important price and renewal conditions are hard to find.** Prominent prices are monthly equivalents, while annual billing, renewal increases, and upload limits are explained in the small **Details** route. For example, Plus is €108 in year one and renews at €168/year. Show the billing commitment, renewal amount, and material restrictions beside the price and before signup. **Connections:** transparency, matching expectations, informed choice. The information exists; it is not entirely absent.

4. **Bad — enabled and disabled signup states look too similar.** **Create account** is disabled until the required name, valid email, and password conditions are met. Its appearance changes very little when enabled, making readiness hard to judge visually. Use clearly distinguishable states and explain what remains incomplete. **Connections:** visibility of system status, affordance, error prevention. The button does work once valid; it is not permanently disabled.

5. **Bad — marketing agreement is bundled with continuing.** Registration text combines accepting terms with receiving news, partner offers, and promotional emails, without a separate optional choice. Users cannot independently express whether they want marketing. Separate optional marketing preferences from required account terms. **Connections:** user control, informed choice, manipulative design. This is a usability/consent observation, not by itself a jurisdiction-specific legal conclusion.

6. **Good — password requirements are visible and update while typing.** The form lists eight characters, an uppercase letter, and a number. Checkmarks update as each requirement is met, helping users succeed before submission. **Connections:** error prevention, visibility of system status, helpful guidance. Good requirement feedback does not establish that the password policy is ideal or that the system securely stores passwords; this demo does not save them.

## 08 — QuickBite

[Open website](scenarios/08-food-ordering.html) · Food ordering

**Task:** Choose a meal, change its options and quantity, review the bag, and place the simulated order.

1. **Bad — the menu is large and unorganized.** Thirty-six dishes appear in one collection without category navigation or search. Users have to scan many alternatives to find a relevant meal. Add meaningful categories, suitable filters, or search while preserving easy browsing. **Connections:** choice overload, Hick's law, cognitive load. A large selection is not inherently wrong; the difficulty is finding and comparing relevant choices.

2. **Good — customization makes choices and costs explicit.** Size, dietary preference, extras, quantity, and kitchen notes are available together. The total updates as chargeable options change, and selected options appear in the bag. **Connections:** user control, error prevention, visibility of system status. The demo records dietary choices; it does not verify actual ingredients or guarantee allergy safety.

3. **Bad — equivalent actions have inconsistent labels.** Different dishes use **Add**, **Confirm**, or **Continue**, including variations in the customization form, for adding an item to the order. Users must infer whether the action adds an item, advances a step, or finalizes something. Use consistent labels such as **Customize** and **Add to bag** at the appropriate stages. **Connections:** consistency and standards, matching expectations.

4. **Good — the bag shows the order before commitment.** It lists item names, quantities, options, line totals, delivery, and the complete total. Items can be removed before placing the order. This supports checking and correcting choices. **Connections:** visibility of system status, error prevention, user control. Delivery is €2.50 and is included in the final bag total.

5. **Bad — the result gives no meaningful order progress.** After **Place order**, the screen stays on **Processing** with an order reference. It does not say whether the restaurant received the order, what happens next, or how long it might take. Show reliable stages and expectations, such as received, preparing, and ready. **Connections:** visibility of system status, perceived performance, feedback. The persistent state is intentional; waiting longer does not reveal additional tracking stages.

6. **Good — primary ordering actions have generous targets.** Customization and ordering buttons are prominent and large enough to make touch interaction easier. **Connections:** Fitts's law, touch usability, clear hierarchy. Large targets do not resolve the separate problem of inconsistent action labels.

## 09 — FileFlow

[Open website](scenarios/09-file-manager.html) · File management

**Task:** Open a recent file, search for an existing document, select a file for simulated upload, and delete an outdated file.

1. **Bad — file types share the same icon.** PDFs, images, documents, and videos use the same generic file symbol. Users must read extensions rather than recognize types visually while scanning. Use distinct type indicators alongside descriptive names. **Connections:** recognition rather than recall, scanning efficiency. Extensions and names still distinguish the files; they are not literally indistinguishable.

2. **Good — recent files are easy to revisit.** A prominent recent-file area and a dedicated recent view shorten the route back to opened items. Opening files updates the recent list. **Connections:** recognition rather than recall, efficiency, reduced memory demands.

3. **Good — uploads communicate progress and completion.** Select a file to see its name, an increasing percentage, and a progress bar, followed by a completion message and a new file row. **Connections:** visibility of system status, perceived performance. This is a timed local simulation using the selected file's metadata, not a real network upload; the percentage is not measuring transmitted bytes.

4. **Bad — deletion has no product-level recovery.** **Delete** immediately removes a row without confirmation, trash, or Undo. Accidental deletion is therefore costly within the current session. Provide an appropriate confirmation and/or recoverable trash or Undo. **Connections:** error prevention, user control and freedom, error recovery. Restarting the lab restores sample data, but is not a real file-management recovery mechanism. No actual disk file is deleted.

5. **Good — search uses descriptive file names.** Searching for text such as **proposal** narrows the list without requiring internal identifiers. Folder navigation offers another route to relevant files. **Connections:** recognition, flexibility and efficiency, matching the user's mental model. Search filters the current view, so check the selected folder when interpreting results.

6. **Bad — storage information mixes units and unclear terminology.** The storage area combines **MB**, **GiB**, **blocks**, and **TB** without explaining their relationship. Users cannot easily reconcile capacity, usage, and transfer allocation. Use consistent, familiar units and clearly distinguish storage from bandwidth. **Connections:** match with the real world, consistency, cognitive load. Different units can be technically legitimate; unexplained mixing and apparently inconsistent figures create the usability problem.

## 10 — LearnSpace

[Open website](scenarios/10-learning-platform.html) · Online learning

**Task:** Continue Web Foundations, complete the remaining lessons and quiz, and inspect the final progress state. Try an incorrect quiz answer and find your way back to the course overview from a lesson.

1. **Good — the course gives a structured path and completion state.** Numbered lessons, completed checkmarks, a progress bar, and a separate knowledge check show where the learner is and what comes next. Completing lessons updates progress. **Connections:** chunking, goal visibility, recognition. The initial state has one of three lessons completed.

2. **Bad — competing messages crowd the quiz.** Achievement, upgrade, and next-course cards appear alongside the questions. They draw attention away from the task that requires concentration. Move recommendations and offers to a natural break or after the quiz. **Connections:** selective attention, cognitive load, flow. In this implementation these are simultaneous side cards, not timed pop-up notifications.

3. **Bad — an incorrect answer only receives “Wrong.”** Submit an incorrect quiz choice to see feedback without a reason, hint, or explanation. The learner can retry but has little help correcting their understanding. Explain the relevant concept and provide constructive retry guidance. **Connections:** helpful feedback, learning support, recovery. The quiz does distinguish correct from incorrect answers; the issue is the quality of the explanation.

4. **Good — lessons build from basic concepts toward application.** The sequence moves from headings and paragraphs to semantic structure and assembling a complete page. This gives a small scaffolded path rather than starting with the most complex task. **Connections:** challenge-skill balance, flow, progressive complexity. This is a short authored sequence, not adaptive difficulty tailored to the learner.

5. **Bad — returning to the overview is buried.** Within a lesson or quiz, the main course navigation is hidden. Preserving session progress while returning requires **More options → Course settings → Return to course overview**, with an additional resources route also available. Provide a visible breadcrumb or **Course overview** link. **Connections:** user control and freedom, discoverability, navigation efficiency. The brand link can reload the site, but that resets the session and is not equivalent to an in-course return.

6. **Good — completion provides a clear, positive ending.** Finishing the quiz leads to a completion screen with **100% complete**, a foundation-builder achievement, and an explicit return action. Users know they succeeded and receive a satisfying endpoint. **Connections:** visibility of system status, peak-end rule, goal completion. Presentation can support the experience; it does not prove knowledge retention or mastery beyond this small quiz.

## Reasonable cross-scenario comparisons

- **Recovery:** TaskForge provides working Undo; FileFlow removes files without equivalent recovery. Restarting either demo is a lab feature.
- **Feedback:** FileFlow shows upload progress; NovaShop has silent submission delay; QuickBite remains on an unexplained processing state.
- **Price transparency:** StayNest and QuickBite show a total before commitment; NovaShop introduces delivery afterward; CloudBox obscures the billing commitment and renewal conditions.
- **Recognition:** descriptive categories, names, recent items, and familiar controls reduce memory effort; branded bank labels and ID-only lookup increase it.
- **Attention:** persistent useful controls can support a task, while promotions, encouragement dialogs, and quiz-side offers can compete with it. Judge their timing, relevance, and intrusiveness.

## References and interpretation

The original handoff defines the intended scenario behaviors. This guide describes those behaviors as implemented, including their simulation limits. It is not an exhaustive audit or a claim that every design choice has one objectively correct interpretation.

Conceptual references: [Laws of UX](https://lawsofux.com/) and [Nielsen's 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/). These concepts overlap: a strong explanation may reasonably connect one observation to several principles.
