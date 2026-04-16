export interface ServiceItem {
  name: string
  description: string
}

export interface ServiceGroupData {
  id: string
  num: string
  title: string
  shortTitle: string
  items: ServiceItem[]
  ctaLabel: string
  ctaLink: string
}

export const serviceGroups: ServiceGroupData[] = [
  {
    id: 'vehicle-wraps',
    num: '01',
    title: 'Vehicle Wraps & Fleet Graphics',
    shortTitle: 'Vehicle Wraps',
    items: [
      { name: 'Full Vehicle Wraps', description: 'Complete vehicle transformation — cars, vans, trucks, and SUVs.' },
      { name: 'Fleet & Commercial Wraps', description: 'Consistent branding across your entire fleet, any size.' },
      { name: 'Custom Design Wraps', description: "Don't have artwork? Our team builds it from your brand assets." },
      { name: 'Large Format Vehicle Graphics', description: 'Partial wraps, door panels, hoods, and roof graphics.' },
    ],
    ctaLabel: 'Get a Wrap Quote',
    ctaLink: '/contact',
  },
  {
    id: 'large-format',
    num: '02',
    title: 'Printing & Large Format Graphics',
    shortTitle: 'Printing',
    items: [
      { name: 'Vinyl Banners', description: 'Indoor and outdoor banners built to last through weather and events.' },
      { name: 'Construction Hoarding Printing', description: 'Full-coverage graphics for construction fencing and hoarding walls.' },
      { name: 'Event & Trade Show Graphics', description: 'Backdrops, step-and-repeats, booth graphics, and banner stands.' },
      { name: 'Window, Wall & Floor Graphics', description: 'Perforated window film, wall murals, and custom floor decals.' },
      { name: 'Canvas Prints', description: 'Gallery-quality prints for offices, showrooms, and retail spaces.' },
    ],
    ctaLabel: 'Get a Print Quote',
    ctaLink: '/contact',
  },
  {
    id: 'marketing-promo',
    num: '03',
    title: 'Marketing & Promotional Materials',
    shortTitle: 'Marketing',
    items: [
      { name: 'Business Cards', description: 'Premium stock, sharp print, fast turnaround.' },
      { name: 'Flyers & Brochures', description: 'Full-colour, single or double-sided, any fold style.' },
      { name: 'Stickers & Decals', description: 'Die-cut, kiss-cut, waterproof — indoor or outdoor use.' },
      { name: 'Magnets', description: 'Vehicle magnets and promo magnets, durable and reusable.' },
      { name: 'Flags & Feather Banners', description: 'Attention-grabbing outdoor flags for events, retail, and roadside.' },
    ],
    ctaLabel: 'Order Print Materials',
    ctaLink: '/contact',
  },
]
