Vehicle Wraps & Printing — Website Blueprint

Document Type: Product & Design Blueprint
Version: 1.0
Scope: 3-page production-ready website
Philosophy: Minimal. Visual. High-conversion.

1. Site Overview
   Purpose
   A clean, fast digital storefront that showcases the business's work, clearly communicates its services, and drives qualified leads to request a quote. The site is not informational — it is a conversion machine.
   Target Audience
   SegmentNeedBusiness ownersFleet graphics, branded vehicles, signageMarketing managersEvent graphics, trade show displays, branded materialsContractors / developersConstruction hoarding, large format printingIndividuals / entrepreneursCustom wraps, stickers, business cards
   Key User Actions (Priority Order)

Request a Quote — primary CTA across all pages
View Past Work — validate quality via gallery
Understand Services — confirm the business does what they need
Get in Touch — call, email, or form submission

2. Design Direction
   Visual Style
   Premium Automotive Minimal — Think car configurator meets print studio. Bold. Dark. Precise.
   The site should feel like a high-end body shop's digital presence: confident, no-nonsense, with imagery doing the heavy lifting.
   Color Palette
   RoleColorHexBackgroundNear-black#0D0D0DSurface / CardDark charcoal#161616Border / DividerSubtle gray#2A2A2APrimary AccentElectric yellow#F5C400Secondary AccentCool white#F0F0F0Body TextSoft white#CCCCCCMuted TextMid gray#888888

Rationale: Dark backgrounds make wrap photography pop. Yellow accent is energetic, automotive, and high-visibility — mirrors vinyl/paint culture.

Typography
RoleFontWeightDisplay / HeroBebas Neue400HeadingsBarlow Condensed600–700Body / UIDM Sans400–500Labels / CapsBarlow Condensed500, uppercase, tracked

Source: Google Fonts (free, fast CDN). No custom font hosting needed.

UX Principles

Visual First — Images lead. Text supports. Never the reverse.
One CTA per Section — Never compete with yourself.
Fast Scanning — Users skim. Use short headlines and bold labels.
No Clutter — If a section doesn't drive action or build trust, cut it.
Whitespace is a feature — Dark negative space creates premium feel.
Mobile is primary — 60%+ of visitors will be on phones.

3. Page-by-Page Breakdown

🏠 Page 1: Home
Goal: Make an immediate visual impression, establish trust, preview services, and push the user to contact.

Section 1.1 — Navigation (Global)
PropertyDetailPurposeWayfinding + immediate access to quote CTAPositionFixed top, full-widthStyleTransparent on load → solid dark on scroll
Content:

Logo (left) — text-based or SVG wordmark
Nav links (center or right): Home · Services · Contact
CTA Button (right): Get a Quote → links to /contact

UI Component: <NavBar /> — sticky, minimal, no mega-menu, no dropdowns

Section 1.2 — Hero
PropertyDetailPurposeImmediate impact — what this business does, who it's forStyleFull-viewport height, dark overlay on background image or video loop
Content:

Headline: Large, bold display type — e.g.:

YOUR BRAND.
WRAPPED IN MOTION.

Sub-headline: 1 short line — e.g.:

Vehicle wraps, fleet graphics & large format printing.

Primary CTA: Get a Free Quote → /contact
Secondary CTA (optional): View Our Work → anchor to gallery section
Background: Full-bleed wrap photography (wrapped truck or car, dramatic angle, studio/street lit)

UI Component: <HeroSection /> — full-viewport, background image with dark gradient overlay, centered or left-aligned text block, two CTA buttons

Section 1.3 — Services Preview
PropertyDetailPurposeShow the 3 service categories — scannable, no detail needed hereStyle3-column card row on desktop, stacked on mobile
Content (3 Cards):
CardIcon / VisualHeadlineShort Description1Car/truck icon or photo thumbnailVehicle Wraps & Fleet GraphicsFull wraps, fleet branding, custom vinyl2Print/banner icon or photo thumbnailPrinting & Large FormatBanners, hoarding, event graphics, signage3Business card / sticker icon or photoMarketing & Promo MaterialsCards, flyers, stickers, magnets, flags
Each card links to the relevant section on /services
UI Component: <ServiceCard /> — icon or image top, category label, 1-line description, arrow or "Learn More" link

Section 1.4 — Gallery Preview
PropertyDetailPurposeSocial proof through visual work samplesStyleMasonry or uniform grid — 6–9 images
Content:

Grid of high-quality photos: wrapped vehicles, installed graphics, trade show displays
Section label: OUR WORK (all caps, muted, small)
Optional: single CTA below grid — See More Work (if a gallery page exists in future, or links to Instagram)

UI Component: <GalleryGrid /> — CSS grid (3×2 or 3×3), images crop to square or 4:3, hover reveals subtle overlay or zoom effect. No lightbox required for MVP.

Section 1.5 — CTA Banner
PropertyDetailPurposeFinal push before footer — capture users who scrolled past everythingStyleFull-width dark or accent-colored band
Content:

Headline: Ready to wrap your brand?
Sub-text: Get in touch for a free quote. Fast turnaround. Professional results.
Button: Contact Us Today → /contact

UI Component: <CTASection /> — full-width, high contrast, centered content, single button

Section 1.6 — Footer (Global)
PropertyDetailPurposeContact info, nav links, legalStyleDark, minimal, 2-column
Content:

Left: Logo + tagline (1 line)
Right: Quick links (Home, Services, Contact) + phone number + email
Bottom bar: © 2025 [Business Name]. All rights reserved.

🧰 Page 2: Services
Goal: Clearly present all services in 3 clean grouped categories. Help visitors confirm the business does what they need, then push to contact.

Section 2.1 — Page Hero (Minimal)
PropertyDetailPurposeOrient the user — they're on the services pageStyleCompact hero — not full viewport, 40–50vh max
Content:

Label: WHAT WE DO
Headline: Services Built for Impact
Sub-text: From full vehicle wraps to print materials — we handle it all in-house.
No CTA here (save it for the bottom)

UI Component: <PageHero /> — half-height hero, background image or solid dark with texture, left-aligned or centered text

Section 2.2 — Service Group 1: Vehicle Wraps & Fleet Graphics
PropertyDetailPurposeShowcase wrap services clearlyStyle2-column layout: visual left, service list right (or stacked on mobile)
Content:

Section Label: 01 — VEHICLE WRAPS & FLEET GRAPHICS
Photo: 1 large feature image (wrapped truck, fleet van lineup, etc.)
Service Items (listed cleanly, not as a bullet dump):

Full Vehicle Wraps
Fleet & Commercial Wraps
Custom Design Wraps
Large Format Vehicle Graphics

Short description per item: 1 sentence max (optional)
CTA: Get a Wrap Quote → /contact

UI Component: <ServiceGroup /> — reusable layout block: image + service list side by side

Section 2.3 — Service Group 2: Printing & Large Format Graphics
Same structure as 2.2.
Content:

Section Label: 02 — PRINTING & LARGE FORMAT GRAPHICS
Photo: Banner installation, trade show booth, or hoarding wall
Service Items:

Vinyl Banners
Construction Hoarding Printing
Event & Trade Show Graphics
Window, Wall & Floor Graphics
Canvas Prints

CTA: Get a Print Quote → /contact

Section 2.4 — Service Group 3: Marketing & Promotional Materials
Same structure as 2.2.
Content:

Section Label: 03 — MARKETING & PROMOTIONAL MATERIALS
Photo: Business cards fanned out, sticker sheet, branded collateral flat lay
Service Items:

Business Cards
Flyers & Brochures
Stickers & Decals
Magnets
Flags & Feather Banners

CTA: Order Print Materials → /contact

Section 2.5 — CTA Banner
Reuse <CTASection /> from home page.
Content:

Headline: Not sure what you need?
Sub-text: Tell us about your project and we'll recommend the best solution.
Button: Talk to Us → /contact

📞 Page 3: Contact
Goal: Make it effortless to reach out. One form. Clear contact details. Zero friction.

Section 3.1 — Page Hero (Minimal)
Content:

Label: GET IN TOUCH
Headline: Let's Build Something.
Sub-text: Fill out the form below or give us a call. We respond within 1 business day.

UI Component: <PageHero /> — same compact component as services page

Section 3.2 — Contact Layout
PropertyDetailPurposePrimary conversion point of the siteStyle2-column: form left, contact info right (stacked on mobile)
Left — Contact Form:
FieldTypeRequiredFull NameText inputYesEmail AddressEmail inputYesPhone NumberTel inputNoService Interested InDropdown (see below)NoProject DetailsTextarea (4–6 rows)YesSubmitButton—
Dropdown Options:

Vehicle / Fleet Wrap
Printing & Large Format
Marketing & Promo Materials
Not Sure / General Inquiry

Submit Button Label: Send My Request
Right — Contact Details:

Phone number (click to call on mobile)
Email address (mailto link)
Business hours (e.g., Mon–Fri, 8am–6pm)
Optional: city/region (no full address needed unless walk-ins accepted)
Optional: small map embed or just text location

UI Component: <ContactForm /> + <ContactInfo /> — side-by-side wrapper, form has clean field styling with accent-colored focus states

Section 3.3 — Footer
Reuse global <Footer /> component.

4. Component System

All components are reusable, stateless where possible, and styled with CSS variables from the design token set.

<NavBar />

Used on: All pages
Props: Current page (for active link state)
Behavior: Transparent → opaque on scroll (IntersectionObserver or scroll event)
Contains: Logo, nav links, CTA button

<HeroSection />

Used on: Home page only
Props: Headline, sub-headline, primary CTA, secondary CTA, background image
Behavior: Full-viewport, dark gradient overlay on image, fade-in animation on load
Contains: Two-line headline, short descriptor, two CTAs

<PageHero />

Used on: Services, Contact
Props: Label, headline, sub-text, background image (optional)
Behavior: Half-height, static — no animation needed
Contains: Small label tag, h1, optional descriptor

<ServiceCard />

Used on: Home page (Services Preview section)
Props: Icon or thumbnail image, category name, short description, link
Behavior: Hover state: slight lift (transform: translateY), accent border or glow
Contains: Visual, category label, 1-line description, arrow link

<ServiceGroup />

Used on: Services page (×3)
Props: Section number, title, image, service items array, CTA label + link
Behavior: Alternating image left/right per group (optional on desktop)
Contains: Section label, feature image, service list, CTA button

<GalleryGrid />

Used on: Home page (Gallery Preview section)
Props: Images array (min 6, max 9), optional CTA
Behavior: CSS grid layout, images hover-zoom (scale: 1.04), lazy loading
Contains: Image grid, optional footer CTA link

<CTASection />

Used on: Home page (bottom), Services page (bottom)
Props: Headline, sub-text, button label, button link
Behavior: Full-width, high contrast — accent background or dark with yellow text/button
Contains: H2, short paragraph, single CTA button

<ContactForm />

Used on: Contact page
Props: None (static form)
Behavior: Client-side validation, success state on submit (replace form with confirmation message), connects to Formspree / Netlify Forms / EmailJS (no backend needed)
Contains: All form fields as described in Section 3.2

<ContactInfo />

Used on: Contact page (alongside form)
Props: Phone, email, hours, location (optional)
Contains: Icon + text pairs, click-to-call phone link

<Footer />

Used on: All pages
Props: None (static)
Contains: Logo, tagline, nav links, phone, email, copyright

5. Image Strategy
   Why Images Are Critical
   This business sells visual transformation. A bad image destroys trust. A great image sells the service before a word is read.
   Required Image Types
   TypeUsageNotesHero wrap photoHome hero backgroundDramatic angle, studio or street-lit, full-bleedFleet lineupHero alt / ServiceGroup2–3 branded vehicles in frame, wide shotTruck / van close-upGallery, ServiceGroupDetail shot of vinyl seams, logo qualityTrade show boothServiceGroup 2, galleryShows scale and professionalismHoarding wallServiceGroup 2Outdoor install, real-world contextFlat lay collateralServiceGroup 3Business cards, stickers, clean white backgroundBanners / flagsServiceGroup 2, galleryInstalled at events or outdoor
   Image Best Practices

Resolution: Minimum 1400px wide for hero/section images; 800px for gallery tiles
Format: WebP with JPEG fallback for all photos; SVG for icons only
Aspect Ratios:

Hero: 16:9 or full-viewport (CSS object-fit: cover)
Gallery tiles: 1:1 or 4:3 (uniform grid)
ServiceGroup feature: 3:2 landscape

Optimization: Compress all images to under 200KB (use Squoosh or similar). Use loading="lazy" on all below-fold images.
Alt Text: Descriptive and keyword-relevant (e.g., "Custom full wrap on white Ford Transit van")
Avoid: Stock photography. Real work only. Authenticity builds trust.

6. Conversion Strategy
   CTA Placement Map
   PageSectionCTAHomeNavBarGet a Quote (persistent)HomeHeroGet a Free Quote (primary)HomeHeroView Our Work (secondary, anchor)HomeServices PreviewArrow link on each card → /servicesHomeCTA BannerContact Us TodayServicesEach ServiceGroupGet a [Wrap/Print] QuoteServicesCTA BannerTalk to UsContactFormSend My Request
   Conversion Principles

NavBar CTA is always visible. User can click Get a Quote from any scroll position on any page.
Each service group has its own CTA. Don't make users scroll back up after reading about a service they want.
The contact form is simple. 5 fields max visible before scrolling. No unnecessary fields.
Phone number is always accessible. In the footer and on the contact page. Some users will call instead of form-filling — especially contractors and fleet managers.
Form confirmation is immediate. After submit, replace the form with a thank-you message. Do not redirect to a new page (causes confusion on mobile).
Gallery drives trust, not time. Visitors who view the gallery are more likely to convert. Place it before the bottom CTA on home.

7. Technical Notes
   Stack Recommendation
   LayerChoiceReasonFrameworkNext.js (App Router) or plain HTML/CSSFast, Vercel-native, no CMS neededStylingCSS Modules or Tailwind CSSScoped styles, no runtime overheadFormsFormspree, Netlify Forms, or EmailJSNo backend, no server requiredImagesNext.js <Image /> or native <img loading="lazy">Auto-optimization, lazy loadingFontsGoogle Fonts (self-hosted via next/font)Free, fast, GDPR-safeDeploymentVercelOne-click deploy, free tier, fast CDN
   Mobile-First Rules

Design and build for 375px width first, expand upward
Tap targets minimum 44×44px
CTAs always full-width on mobile
Nav collapses to hamburger menu on mobile
Gallery grid: 2 columns on mobile, 3 on desktop
ServiceGroup stacks vertically on mobile (image above, list below)

Performance Targets
MetricTargetLighthouse Performance≥ 90First Contentful Paint< 1.5sTotal Page Weight< 1MB per pageImagesWebP, compressed, lazy-loadedFontsMax 2 font families, 2–3 weights each
No CMS — Content Update Process
All content is hardcoded in component files or a single content.js / data.js config file per page. To update:

Images: Replace files in /public/images/ folder
Services: Edit the services array in data/services.js
Contact info: Edit the single <ContactInfo /> component
Gallery: Add/remove image paths in data/gallery.js

No dashboard, no login, no database.
Accessibility Baseline

Semantic HTML (<nav>, <main>, <section>, <footer>)
All images have descriptive alt attributes
Form labels are associated with inputs via for/id
Color contrast meets WCAG AA on all text elements
Keyboard-navigable (focus styles visible)
