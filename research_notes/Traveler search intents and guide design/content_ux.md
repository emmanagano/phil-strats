# Content UX for a Concise, Interactive One-Stop Destination Guide

Note on sourcing: these notes come from 15 search and fetch calls. Items marked "(standard, not fetched this session)" are well-established specs or guidelines cited from their canonical URLs, which I did not re-fetch. Several snippets came from search summaries rather than full-page reads, and those are flagged.

## 1. How users read web content, and what it means for travel guide structure and length

### Takeaway
Most users scan rather than read. Without strong formatting they fall into an F-pattern; with clear, front-loaded headings they use the far more efficient "layer-cake" pattern. A destination guide should therefore lead with the essentials (a TL;DR or quick-facts block in the first screen or two), use descriptive H2s that make sense when read alone, and offer jump links. Attention is concentrated in the first two or three screenfuls, so put the highest-value content there.

### Cited Findings
- The F-pattern was first identified in 2006, and NN/g's 2017 re-test (47 participants) found it still holds on desktop and mobile. Users read across the top, then a shorter line, then scan down the left edge. The first lines and the first few words of each line get the most fixations. — [NN/g, "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant" (Pernice, 2017, reviewed 2026)](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- Three conditions cause the F-pattern: unformatted walls of text, a user who wants to be efficient, and a user not committed enough to read every word. — [NN/g F-pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- NN/g identifies other scanning patterns. In **layer-cake**, readers fixate on headings and subheadings. In **spotted**, they hunt for a specific link, number, or word. In **marking**, the eyes stay fixed while scrolling, which is more common on mobile. In **bypassing**, readers skip repeated first words in lists. **Commitment**, reading everything, is uncommon. — [NN/g F-pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- NN/g's mitigation guidance: put the most important points in the first two paragraphs; make headings visually distinct and start them with the most informative words; group small related content with borders or background color; bold key phrases; use descriptive link text; use bulleted and numbered lists; cut unnecessary content. — [NN/g F-pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- Layer-cake scanning (first documented in 2004) is "the most effective way to scan" and much more efficient than the F-pattern, but it only works when headings are clear and meaningful. Recommendations: style subheadings consistently but don't make them look like ads; tie each subheading visibly to its section; order content by priority; write subheadings that cover all, and only, their section's topics; on mixed card or image layouts, use proximity so each label sits closer to its own content, separate chunks with borders, background, or whitespace, and label each chunk. — [NN/g, "The Layer-Cake Pattern of Scanning Content on the Web" (2019)](https://www.nngroup.com/articles/layer-cake-pattern-scanning/)
- NN/g's 2018 scrolling study found that about 57% of page-viewing time fell above the fold (down from 80% in 2010), 74% in the first two screenfuls, and about 81% in the first three. The steep drop in attention further down the page did not change between 2010 and 2018. NN/g attributed the shift mainly to long pages. — [NN/g, "Scrolling and Attention"](https://www.nngroup.com/articles/scrolling-and-attention/) (figures from search summary of the article; secondary write-ups report slightly different splits from the same study)
- In-page links (a table of contents or jump links) are most valuable on long-form content and unnecessary on short pages. A static table of contents at the top is noticed first but quickly scrolls out of view, so NN/g suggests making it sticky or putting it in a side rail on large screens. — [NN/g, "In-Page Links for Content Navigation"](https://www.nngroup.com/articles/in-page-links-content-navigation/) (via search summary)
- Accordions give an overview and direct access to sections and cut excessive scrolling, but they lower visibility and add interaction cost. They suit content-heavy pages where users don't need to combine information across sections. For extremely long pages, splitting the content across pages may work better. — [NN/g, "Accordions on Desktop"](https://www.nngroup.com/articles/accordions-on-desktop/); [NN/g, "Accordions for Complex Content"](https://www.nngroup.com/articles/accordions-complex-content/) (via search summary)
- A counterpoint from a university web guide: when readers need most of the content, accordions hurt, because hidden text is harder to scan and can't be found with Ctrl+F. — [McGill Web Services, "When an accordion sounds the right note"](https://www.mcgill.ca/web-services/node/5545) (via search summary)
- Travelers research heavily before booking. Expedia-commissioned comScore data (2016) counted 140 travel-site visits by Americans in the 45 days before booking. A later Expedia study reported 141 pages of travel content viewed in the 45 days before booking (277 for U.S. travelers) and a 71-day average path from first thought to booking. — [PhocusWire on Expedia study](https://www.phocuswire.com/article/expedia-study-insights-into-the-booking-paths-of-american-british-and-canadian-travelers/); [Expedia Group newsroom, path-to-purchase research](https://www.expedia.com/newsroom/eg-path-to-purchase-research) (via search summary; older data)
- Google's travel "micro-moments" framework (2015–2016) splits the journey into dreaming ("I-want-to-get-away"), planning ("time-to-make-a-plan"), booking ("let's-book-it"), and experiencing ("can't-wait-to-explore"). It reported that 70% of travelers had researched travel on a smartphone, and one summary notes that research sessions were getting shorter, not longer. — [Think with Google, travel micro-moments](https://thinkwithgoogle.com/marketing-resources/micro-moments/travel-research-micro-moments); [Think with Google, mobile travel research statistics](https://thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-travel-research-statistics) (dated data; via search summary)
- Critique of a major publisher: in 2019 Nomadic Matt argued that Lonely Planet's redesigned destination pages had "a lot of space, not a lot of curated information," pushed essential information below the fold, and made it "really hard to find what you are looking for." — [Nomadic Matt, "What's the Matter With Lonely Planet?"](https://www.nomadicmatt.com/travel-blogs/lonely-planet/) (via search summary; opinion)

### Inferences
- Recommended page skeleton for a "one-stop" Philippine destination guide, built from the evidence above:
  1. Hero with destination name and a single-sentence verdict ("Best for: beaches + island hopping; go Dec–May").
  2. A **Quick facts / At a glance** box within the first screen: best months, getting there, trip length, daily budget range, island group/region, a "good for" set of tags. This serves spotted scanning (people hunting for one number) and the first-two-screenfuls attention budget.
  3. A **TL;DR** of 3–5 bullets, put first because NN/g says the first two paragraphs get read most.
  4. **Jump links** (sticky on scroll; a horizontal chip bar on mobile, a side rail on desktop) to H2 sections whose headings start with the keyword: "When to go," "Getting there," "Where to stay," "Things to do," "Budget," "Sample itinerary," "Tips & FAQs."
  5. Body sections that open with a 1–2 sentence answer followed by bullets, cards, or tables.
  6. FAQ accordion at the end. That is a good accordion use case, since questions are independent and readers rarely combine them.
- The existing `toc` built from `##` headings in `src/data/articles.ts` already supports jump links. The main gains are making it sticky or rail-based and adding a structured quick-facts block, which could come from new frontmatter fields validated at build time.
- Length: no source here gives an ideal word count. The evidence says to keep the answer-critical content in the first 2–3 screens and make the rest skimmable and skippable, rather than to aim for a target length.
- Don't hide core content (for example "When to go") in accordions or tabs, because readers compare information across sections. Reserve accordions for FAQs and secondary detail.

### Gaps
- I found no rigorous, recent (2020+) study specifically on how travelers read destination guides, such as eye-tracking on travel pages. The guidance above extrapolates general NN/g findings.
- I found no reliable data on ideal word count for destination guides. Industry SEO claims exist but weren't verified.
- The travel-journey stats (Expedia, Google) date from 2013–2016. I found no newer equivalent in this session.

## 2. Interactive elements travel sites use, and evidence on engagement or usefulness

### Takeaway
Plenty of interactive patterns are common, but independent evidence on their engagement value is thin. Most "interactive content boosts dwell time" statistics come from vendors. The strongest rationale is task support: tools should answer questions travelers actually have (when to go, how many days, how much it costs, what goes where on a map), not add novelty.

### Cited Findings
- Riddle's "State of Interactive Content 2026" dataset (over 3.8 billion views of quizzes, polls, personality tests, forms, and games) reports an average active time of 112 seconds per start. Mini-games ran about 396 seconds and forms about 19 seconds, and quizzes made up most of the volume. Riddle also found that 78% of interactive-content shares escape web analytics. — [PPC Land on Riddle report](https://ppc.land/riddle-finds-78-of-interactive-content-shares-escape-web-analytics/) (via search summary; Riddle sells quiz software)
- Outgrow (a vendor of interactive tools) claims 4.5 minutes of average dwell time on quizzes versus 1.3 minutes on static pages, and 38% longer dwell on interactive pages. — [Outgrow, "User Engagement Benchmarks for Interactive Experiences 2026"](https://outgrow.co/blog/user-engagement-benchmarks/) (vendor claim; treat with caution)
- Gitnux claims interactive maps add about 2 minutes to time on page but cites no primary study. — [Gitnux](https://gitnux.org/interactive-content-statistics/) (unreliable; noted only to flag it)
- Measurement caveat: "time on page" counts how long the tab stays open, while "active time" counts scrolling, clicking, or typing, so studies using different definitions aren't comparable. — [Common Ninja, measuring website engagement](https://www.commoninja.com/blog/measure-website-engagement) (via search summary)
- Wanderlog, a well-regarded trip planner, centers its product on an **itinerary and map in one view**. Every saved place is pinned on a map immediately, routes can be optimized, users can import places from web guides and Google Travel lists, plans are stored offline, and trips can be shared by link with tripmates. — [Wanderlog homepage](https://wanderlog.com); [Wanderlog App Store listing](https://apps.apple.com/us/app/wanderlog/id1476732439)
- NN/g found scrolljacked progressive disclosure was best tolerated when it revealed relevant information step by step. A BBC disaster piece helped participants picture the scale of the event. — [NN/g, "Scrolljacking 101"](https://www.nngroup.com/articles/scrolljacking-101/) (via search summary)
- The Pudding advises against "steppers" and swipe/tap interfaces for sequential content. Steppers force clicks to reveal content, and swipe interfaces override native scrolling. — [The Pudding, "Responsive scrollytelling best practices" (Samora, 2017)](https://pudding.cool/process/responsive-scrollytelling/)

### Inferences
Ranked by likely usefulness for a static Next.js guide (my judgment, based on the evidence above plus the questions travel guides exist to answer):
- **High value, low cost:**
  - **Month-by-month "when to go" strip:** a 12-cell grid colored by dry, shoulder, or wet/typhoon season, with optional rain or temperature values. It's a static data array rendered as an accessible table, with a CSS chart rather than a heavy chart library. It answers the most common planning question at a glance.
  - **Trip-length / itinerary picker:** tabs for "3 days / 5 days / 7 days" (an ARIA tabs pattern), each showing a day-by-day list. The content is pre-written, so no server is needed.
  - **Budget estimator:** sliders or selects for travel style (budget/mid/luxury) × days × travelers → a peso and USD range computed client-side from per-day constants in frontmatter. Show the formula and assumptions so the number stays honest. It works without JS as a static table.
  - **Packing / prep checklist:** checkboxes with state saved in `localStorage` (wrapped in try/catch). Useful and sticky, and it degrades to a plain list.
- **Medium:**
  - **Interactive map:** high usefulness for spatial questions such as where to stay and how places relate, but it carries real performance cost. Load it lazily behind a static preview image or a "Show map" button (facade pattern), and always also list the places in text.
  - **"Save to trip"** (a `localStorage` list of saved spots or articles, plus a "My trip" page): mirrors the Wanderlog mental model with no backend, though it's per-device only.
  - **Before/after or image comparison sliders:** limited informational value for travel. Use them sparingly, for example to compare seasons.
- **Lower and riskier:**
  - **Quizzes** ("Which island fits you?"): vendor data suggests high active time, but they serve dreaming-stage users and can bury utility. Better as a separate page linking into guides.
  - **Heavy scrollytelling:** see section 3.
- Instrument everything you build (simple event counts) instead of relying on vendor benchmarks.

### Gaps
- I found no independent or academic study measuring engagement or usefulness of specific travel widgets (weather charts, budget calculators, itinerary pickers, packing lists) on publisher sites.
- I found no case studies from Lonely Planet, Culture Trip, or Atlas Obscura on interactive features in this session.

## 3. Scroll-based engagement techniques: benefits and pitfalls

### Takeaway
Use native scroll, light progressive reveal (CSS scroll-driven or IntersectionObserver, animating only transform and opacity), and sticky in-page navigation. Avoid scrolljacking and heavy parallax: NN/g finds they disorient task-focused users, and parallax doesn't impress them. Always honor `prefers-reduced-motion`, and make sure content is visible by default.

### Cited Findings
- **Scrolljacking:** in NN/g testing, a Crypto.com page left all participants who visited it disoriented. Task-oriented users had much less tolerance than browsers. The worst cases changed scroll rate or duration while also requiring reading. Disorientation was lower when fewer scroll actions were needed to reveal a change. — [NN/g, "Scrolljacking 101"](https://www.nngroup.com/articles/scrolljacking-101/) (via search summary)
- **Parallax:** NN/g says parallax is "just not that impressive to users," and its subtler modern versions share the older UX problems. A secondhand summary of an outside study found no usability difference between parallax and non-parallax sites, and two participants experienced motion sickness. — [NN/g, "Parallax Scrolling: Attention Getter or Headache?"](https://www.nngroup.com/articles/parallax-usability/); [Fast Company, "Why parallax scrolling needs to die"](https://www.fastcompany.com/90309395/why-parallax-scrolling-needs-to-die); [UXPin](https://www.uxpin.com/studio/blog/3-crucial-ux-considerations-going-parallax/) (via search summary)
- **Scrollytelling on mobile (The Pudding):** keep the scroll format only when transitions carry meaning, such as change over time or spatial movement. Otherwise stack the content. Use pixel step heights computed from `window.innerHeight` rather than `vh`, because mobile toolbars resize the viewport and break triggers. Sync JS with CSS breakpoints via `matchMedia`. Remove hover interactions, which trigger accidentally while scrolling. Keep it "short and sweet," since desktop-length pieces tire mobile readers. — [The Pudding, "Responsive scrollytelling best practices" (2017)](https://pudding.cool/process/responsive-scrollytelling/)
- **Implementation (Chrome guidance):** drive scroll animations with CSS `animation-timeline` / `view-timeline` and `animation-range`, declared after the `animation` shorthand so it doesn't reset them. Gate with `@supports` testing both `animation-timeline` and `animation-range`. Don't use the scroll-timeline polyfill, which is incomplete. Treat decorative animations as progressive enhancement with no fallback, and otherwise fall back to IntersectionObserver. Hide content only after a script adds a class, so content stays visible if JS fails. Animate only `transform` and `opacity`. Use `prefers-reduced-motion` to disable or reduce animation while keeping content visible. — [Chrome for Developers, Scrollytelling guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/scrollytelling)
- With reduced motion on, elements should settle at their end state, or content can stay invisible. — [specification.website, scroll-driven animations](https://specification.website/spec/performance/scroll-driven-animations/) (secondary)
- **Sticky headers and navigation:** NN/g says sticky headers let users reach navigation without scrolling back up, but they should be short in height and readable. — [NN/g, "Sticky Headers"](https://www.nngroup.com/articles/sticky-headers/) (via search summary). Other sources warn that sticky headers can take 30% or more of the viewport when users zoom and can overlap content during zoom or keyboard navigation. — [Smashing Magazine, "Designing Sticky Menus: UX Guidelines" (2023)](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/); [Cloud Four, "Fixed and inflexible"](https://cloudfour.com/thinks/fixed-and-inflexible/) (via search summary)
- NN/g found that hiding global navigation, for example behind a hamburger menu, hurts usability, though less on mobile than on desktop. — [NN/g, "Hamburger menus hurt UX"](https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/)

### Inferences
- Concrete patterns for this codebase:
  - The existing `.reveal` CSS scroll-driven fade-in fits the Chrome guidance as long as it animates only opacity and transform, sits inside `@supports`, and leaves content fully visible by default and under reduced motion. Verify it doesn't start elements at `opacity: 0` without the `@supports` gate.
  - **Sticky jump-link bar:** a horizontally scrollable chip row under the header on mobile, a sticky side rail on desktop. Highlight the active section with IntersectionObserver (scroll-spy), set `aria-current="true"` on the active link, and use `scroll-margin-top` on headings so anchors don't land under the sticky header.
  - **Reading progress bar:** a thin bar driven by `animation-timeline: scroll()`, with no JS and no layout cost. It's decorative, so no fallback is needed. I found no evidence it raises engagement, so keep it subtle or skip it.
  - **Hide-on-scroll-down, show-on-scroll-up header** to save vertical space on mobile, given the zoom and viewport warnings.
  - Avoid scroll-snapping full-page sections, scroll-speed changes, and parallax hero images.
  - If you do any scrollytelling (for example an "island-hopping route" map that pans as you scroll), stack it on mobile, keep it short, and also give the route as a text list.

### Gaps
- I found no controlled study showing that reading-progress bars or progressive-reveal animations increase completion or time on page.
- I couldn't confirm claims that the NYT pulled back from interactives or scrollytelling. That topic wasn't covered by the sources found.

## 4. Examples of well-regarded destination pages and what they do

### Takeaway
I gathered only limited first-hand evidence on specific publisher pages this session. Documented examples: Wanderlog (itinerary and map in one view, saving, sharing), Lonely Planet (a redesign built on user testing; critiqued for burying essentials below the fold), and NYT/Pudding-style scrollytelling as a reference for narrative interactivity.

### Cited Findings
- Wanderlog: an itinerary plus a map in one view, places auto-pinned on a Google Maps base, route optimization, importing from web guides and Google Travel lists, offline storage, collaborative sharing by link, and a freemium Pro tier. — [Wanderlog](https://wanderlog.com); [App Store](https://apps.apple.com/us/app/wanderlog/id1476732439)
- Lonely Planet's rebuild was tested with users. A designer's write-up says testing showed certain categories were "consistently the most looked for," though the snippet doesn't name them. — [Tom Hewitson, "Reinventing the guidebook" (Medium)](https://medium.com/@tomhewitson/how-we-rebuilt-lonely-planet-online-63e17a95617) (via search summary)
- Lonely Planet's media kit lists standard destination modules such as "Things To Do In" and "How To Get Around." — [Lonely Planet Media Kit 2023 (PDF)](https://assets.lonelyplanet.com/marketing/partners/LPMediaKit2023.pdf) (via search summary)
- Critique: Lonely Planet destination pages had too much whitespace and too little curated information, with essentials below the fold. — [Nomadic Matt (2019)](https://www.nomadicmatt.com/travel-blogs/lonely-planet/)
- NYT's "Snow Fall" (December 2012) is widely cited as the reference point for scrollytelling. — [Nightingale (DVS), "The past, present and future of scrollytelling"](https://nightingaledvs.com/the-past-present-and-future-of-scrollytelling/) (via search summary)

### Inferences
- The patterns most worth borrowing for a mock Philippines guide: Wanderlog's "list + map, save to trip" model, implemented client-side with `localStorage`; Lonely Planet-style modular sections ("Things to do," "Getting around," "When to go"), but with the essentials kept above the fold, which answers the Nomadic Matt critique.

### Gaps
- I didn't retrieve first-hand analysis of Google Travel / Things to Do, Airbnb Guides, Atlas Obscura, Culture Trip, or top independent blogs (for example Nomadic Matt or Migrationology destination-guide layouts). A writer should present these only as general observations, or a follow-up should audit those pages directly.

## 5. Accessibility and performance for interactive content on static sites

### Takeaway
Build every widget as progressive enhancement over semantic HTML that is rendered at build time: tables for weather and budget data, lists for itineraries and checklists, links for jump nav. Then hydrate the interactivity. Follow the WAI-ARIA patterns for tabs and accordions, honor reduced motion, keep focus visible and unobscured by sticky bars, and lazy-load heavy embeds such as maps to protect Core Web Vitals.

### Cited Findings
- Scroll-linked effects should use compositor-only properties (`transform`, `opacity`), gate on `@supports`, keep content visible without JS, and honor `prefers-reduced-motion`. — [Chrome for Developers, Scrollytelling guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/scrollytelling)
- Chrome's motion guidance: use `prefers-reduced-motion` to disable or reduce animations. — [Chrome for Developers, Motion guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion) (via search summary)
- JavaScript scroll listeners can jank the main thread and hurt INP. CSS scroll-driven animations avoid that. — [corewebvitals.io, "Improve INP by ditching JavaScript scrolling"](https://corewebvitals.io/pagespeed/improve-inp-ditch-javascript-scrolling) (secondary, via search summary)
- Core Web Vitals "good" thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, measured at the 75th percentile. — [web.dev, Web Vitals](https://web.dev/articles/vitals) (standard, not fetched this session)
- WCAG 2.2 SC 2.4.11 "Focus Not Obscured (Minimum)" requires that a focused element not be fully hidden by author-created content, such as sticky headers or footers. — [W3C Understanding SC 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) (standard, not fetched this session)
- WCAG SC 2.3.3 "Animation from Interactions" (AAA) says users should be able to disable motion animation triggered by interaction, such as scrolling. — [W3C Understanding SC 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) (standard, not fetched this session)
- The WAI-ARIA Authoring Practices give the keyboard and role patterns for accordions (a button inside a heading, with `aria-expanded` and `aria-controls`) and tabs (`tablist` / `tab` / `tabpanel`, arrow-key navigation). — [APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/); [APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) (standard, not fetched this session)
- The Pudding: replace hover-only interactions with fixed annotations on touch devices. — [The Pudding (2017)](https://pudding.cool/process/responsive-scrollytelling/)
- Sticky elements can cover a large share of the viewport when users zoom. — [Smashing Magazine (2023)](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/) (via search summary)

### Inferences
Implementation checklist for a Next.js static export:
- Render all guide data (weather months, budget per-day constants, itineraries, checklist items, map places) at build time from markdown frontmatter or JSON. Interactivity is a small client component layered on top, and the page is complete without JS.
- **FAQ and secondary detail:** native `<details>`/`<summary>` give accessible accordions with zero JS, and in Chromium the content is findable with Ctrl+F when `hidden="until-found"` is used. (Browser support for find-in-page in closed details is my recollection, not verified.)
- **Weather strip:** a `<table>` with a caption, plus visual color cells. Never rely on color alone: include a text label such as "Dry" or "Wet."
- **Budget calculator:** native `<select>`/`<input type="range">` with `<label>`s and an `<output aria-live="polite">` for the result.
- **Checklist and save-to-trip:** native checkboxes and buttons with `aria-pressed`. Wrap `localStorage` in try/catch.
- **Map:** a facade (static image plus a "Load interactive map" button) to protect LCP and INP. Reserve space with a fixed aspect-ratio to avoid CLS, and include a text list of the same places.
- **Sticky TOC and header:** keep them short, and add `scroll-margin-top` and `scroll-padding-top` so focused or anchored targets aren't hidden (WCAG 2.4.11). Consider hiding the header on scroll-down on mobile.
- **Motion:** all reveal and progress effects inside `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`, with content visible by default.
- Images (already `unoptimized`): set width and height or aspect-ratio, use `loading="lazy"` below the fold, and use `fetchpriority="high"` on the hero for LCP.

### Gaps
- I didn't fetch web.dev's current INP or lazy-loading pages this session. The thresholds above are cited from the well-known standard.
- I found no data on how much specific travel widgets (map embeds, chart libraries) affect Core Web Vitals on travel sites.
