/**
 * Single source of truth for service categories, detail lines, and downstream
 * labels (contact form, marquee, internal anchors on /services).
 */

export interface ServiceItem {
  name: string
  description: string
}

export interface ServiceGroupData {
  /** DOM id for #anchors from Home / Footer / deep links */
  id: string
  num: string
  title: string
  shortTitle: string
  /** Short teaser for home cards and meta copy */
  summary: string
  /** One line for /services overview tiles */
  overviewTagline: string
  /** 3–4 curated bullets on /services; full detail stays in `items` (accordion) */
  previewBullets: string[]
  items: ServiceItem[]
  ctaLabel: string
  ctaLink: string
}

export const serviceGroups: ServiceGroupData[] = [
  {
    id: 'wraps-graphics',
    num: '01',
    title: 'Wraps & Commercial Graphics',
    shortTitle: 'Wraps',
    summary:
      'Fleet and vehicle wraps, colour-change films, certified install & removal, plus window, wall, floor, and retail graphics for commercial spaces.',
    overviewTagline: 'Fleet, vehicles & built environments',
    previewBullets: [
      'Fleet wraps and full colour-change programs with certified install',
      'Safe removal, rebrands, and lease-return ready finishes',
      'Window perf, wall murals, floor graphics, and retail campaigns',
      'Commercial rollouts with one team from proof to installation',
    ],
    items: [
      {
        name: 'Fleet graphics & fleet wraps',
        description: 'Consistent branding from single vans to full fleets, design through production and install.',
      },
      {
        name: 'Full & partial vehicle wraps',
        description: 'Complete colour changes or targeted panels on cars, vans, trucks, trailers, and specialty vehicles.',
      },
      {
        name: 'Vehicle colour change & accent wraps',
        description: 'Satin, gloss, matte, and textured films for accents, roofs, hoods, and full colour flips.',
      },
      {
        name: 'Vinyl wrap installation',
        description: 'Clean edges, complex curves, and post-heat work handled by experienced installers.',
      },
      {
        name: 'Safe vinyl removal',
        description: 'Adhesive-safe removal and surface prep when it is time to rebrand, return a lease, or update graphics.',
      },
      {
        name: 'Window wraps, graphics & perforation',
        description: 'See-through window perf, privacy frost, promos, and full window branding for retail and offices.',
      },
      {
        name: 'Wall wraps, murals & wall decals',
        description: 'Large wall murals, textured surfaces, and removable wall graphics for offices, retail, and events.',
      },
      {
        name: 'Floor decals & floor graphics',
        description: 'Slip-rated floor vinyl for wayfinding, promos, and short-term activations.',
      },
      {
        name: 'Retail signs & in-store graphics',
        description: 'Point-of-purchase, aisle, and fixture graphics that match your brand system.',
      },
      {
        name: 'Event & trade show graphics (installed)',
        description: 'On-site graphics for booths, stages, and venues, coordinated with your print package.',
      },
      {
        name: 'Commercial services',
        description: 'Multi-location rollouts, spec books, and timelines built for property, marketing, and ops teams.',
      },
    ],
    ctaLabel: 'Quote wraps & graphics',
    ctaLink: '/contact',
  },
  {
    id: 'signs-decals',
    num: '02',
    title: 'Signs, Decals & Vinyl Lettering',
    shortTitle: 'Signs',
    summary:
      'Storefronts, windows, and custom lettering, from cut vinyl and personalized decals to everyday sign programs.',
    overviewTagline: 'Storefronts, windows & precision vinyl',
    previewBullets: [
      'Exterior and interior signs, wayfinding, and building markers',
      'Storefront and fascia packages coordinated with your brand',
      'Window campaigns, decals, and cut vinyl lettering',
      'Personalized decals and spot graphics for teams and promos',
    ],
    items: [
      {
        name: 'Custom signs',
        description: 'Interior and exterior signs, wayfinding, safety, and branded building markers.',
      },
      {
        name: 'Storefronts & fascia graphics',
        description: 'Channel letters, cabinet signs, vinyl on glass, and coordinated storefront packages.',
      },
      {
        name: 'Window decals & lettering',
        description: 'Promotional window vinyl, hours & services, QR campaigns, and retail window campaigns.',
      },
      {
        name: 'Personalized decals',
        description: 'Names, logos, and one-off shapes, great for teams, fleets, and promo drops.',
      },
      {
        name: 'Vinyl lettering & spot graphics',
        description: 'Precision-cut lettering, stripes, and small-format graphics for vehicles, walls, and equipment.',
      },
    ],
    ctaLabel: 'Quote signs & decals',
    ctaLink: '/contact',
  },
  {
    id: 'banners-trade-show',
    num: '03',
    title: 'Banners, Trade Show & Large Format',
    shortTitle: 'Banners',
    summary:
      'Large-format printing, banners, rigid signage, hoarding, and portable trade-show hardware, built to ship or install.',
    overviewTagline: 'Large format, hoarding & portable displays',
    previewBullets: [
      'Banners, rigid boards, posters, and site hoarding at scale',
      'Retractables, pop-ups, tabletop displays, and A-frames',
      'Feather and teardrop flags plus step-and-repeat media walls',
      'Campaign kits and seasonal swap programs from one vendor',
    ],
    items: [
      {
        name: 'Large format printing',
        description: 'Oversize inkjet output on vinyl, fabric, and rigid boards for campaigns and environments.',
      },
      {
        name: 'Vinyl & mesh banners',
        description: 'Indoor/outdoor banners with hems, grommets, pole pockets, and wind-rated mesh options.',
      },
      {
        name: 'Posters & foam board posters',
        description: 'Presentation boards, mounted posters, and retail-ready poster runs.',
      },
      {
        name: 'Rigid signs, PVC signs & foam boards',
        description: 'PVC, foam, ACM-style panels, ideal for menus, directional, and semi-permanent installs.',
      },
      {
        name: 'Construction hoarding & site graphics',
        description: 'Long-run hoarding wraps and site branding that stand up to weather and public traffic.',
      },
      {
        name: 'Stand-up (retractable) banners',
        description: 'Portable roll-up displays for lobbies, events, and retail.',
      },
      {
        name: 'Pop-up banners & display systems',
        description: 'Lightweight frames and fabric skins for fast setup and repeat use.',
      },
      {
        name: 'Tabletop banners',
        description: 'Compact tabletop displays for conferences, counters, and showrooms.',
      },
      {
        name: 'A-frame signs',
        description: 'Sidewalk sandwich boards with replaceable inserts for daily specials and wayfinding.',
      },
      {
        name: 'Teardrop & feather flags',
        description: 'Outdoor flag hardware with vibrant fabric skins for roadside and event visibility.',
      },
      {
        name: 'Step & repeat backdrops',
        description: 'Media walls and repeating logos for photos, press, and sponsor lines.',
      },
      {
        name: 'Banners & signs (general programs)',
        description: 'Campaign kits, seasonal swaps, and volume runs coordinated with your brand files.',
      },
    ],
    ctaLabel: 'Quote banners & large format',
    ctaLink: '/contact',
  },
  {
    id: 'marketing-print',
    num: '04',
    title: 'Marketing Products & Stationery',
    shortTitle: 'Marketing',
    summary:
      'Business cards through direct mail, flyers, brochures, labels, envelopes, and small-format promo printed on demand.',
    overviewTagline: 'Stationery, mail & promo collateral',
    previewBullets: [
      'Business cards, letterhead, and envelopes that match your system',
      'Flyers, brochures, postcards, and rack cards with fast reruns',
      'Roll labels, stickers, magnets, and sell sheets for sales teams',
      'Promo sourcing coordinated with your print schedule',
    ],
    items: [
      {
        name: 'Business cards',
        description: 'Standard and premium stocks, specialty finishes, and fast reruns.',
      },
      {
        name: 'Flyers & brochures',
        description: 'Single sheets to folded brochures and saddle-stitched booklets.',
      },
      {
        name: 'Postcards & direct mail',
        description: 'Standard sizes, variable data options, and Canada Post–friendly formats.',
      },
      {
        name: 'Roll labels',
        description: 'Product labels, packaging seals, and durable roll stock for hand or machine apply.',
      },
      {
        name: 'Stickers & sticker sheets',
        description: 'Die-cut, kiss-cut, waterproof vinyl, and sheeted promo stickers.',
      },
      {
        name: 'Sell sheets & presentation shells',
        description: 'Marketing sell sheets, folded shells, and leave-behinds for sales teams. (Often called “shell sheets”.)',
      },
      {
        name: 'Envelopes & letterhead',
        description: 'Matching stationery packages for professional correspondence.',
      },
      {
        name: 'Announcement cards',
        description: 'Invites, openings, milestones, and formal announcements.',
      },
      {
        name: 'Rack cards',
        description: 'Tourism, services menus, and take-one counter cards.',
      },
      {
        name: 'Rigid signs (small format)',
        description: 'Counter cards, strut cards, and tabletop rigid promos.',
      },
      {
        name: 'Magnets',
        description: 'Vehicle magnets, fridge magnets, mailer magnets, and shaped promo magnets.',
      },
      {
        name: 'Promotional products',
        description: 'Branded merch sourcing and coordination alongside your print order.',
      },
      {
        name: 'Canvas prints',
        description: 'Gallery-style canvas wraps for offices, showrooms, and gifts.',
      },
    ],
    ctaLabel: 'Order marketing print',
    ctaLink: '/contact',
  },
]

/** Contact form “service interested in”, aligned with groups + catch-all */
export const contactInquiryOptions: string[] = [
  ...serviceGroups.map((g) => g.title),
  'Not sure / general inquiry',
]

/** Home marquee, scannable mix of offerings */
export const serviceMarqueeTags: string[] = [
  'Fleet Wraps',
  'Vehicle Colour Change',
  'Vinyl Removal',
  'Window Perforation',
  'Wall Wraps',
  'Floor Graphics',
  'Storefront Signs',
  'Custom Decals',
  'Large Format Printing',
  'Retractable Banners',
  'Step & Repeats',
  'Trade Show Displays',
  'Business Cards',
  'Brochures & Flyers',
  'Roll Labels',
  'Stickers',
  'Magnets',
  'Letterhead',
  'Construction Hoarding',
]
