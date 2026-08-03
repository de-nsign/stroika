export const SITE = {
  name: 'Al Badar Mobile Crane',
  tagline: 'Lifting Solutions, Building Trust',
  phone: '+971 55 128 5271',
  whatsapp: '+971 55 128 5271',
  whatsappLink: 'https://wa.me/971551285271',
  email: 'info@albadarmobilecrane.com',
  address: 'Al Quoz Industrial Second, Al Quoz, Dubai, United Arab Emirates',
  hours: '24/7 — booking available around the clock',
  logo: {
    mode: 'mark',
    flat: false,
    src: '/images/brand/logo.png',
    srcDark: '/images/brand/logo-white.png',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Cranes', href: '/fleet' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Services', href: '/services' },
  { label: 'Contacts', href: '/contacts' },
];

export const HERO = {
  heading: 'Mobile Crane Rental Across Dubai',
  subheading:
    'A modern fleet from 25 to 700 tonnes with certified operators and 24/7 dispatch. Lifting solutions for construction, industrial and infrastructure projects — booked by the day, the week or the year.',
  cta_primary: 'View Our Cranes',
  cta_secondary: 'Request a Quote',
  /* Animated counters under the hero copy. `suffix` is rendered verbatim. */
  stats: [
    { target: 700, suffix: 't', label: 'max lifting capacity' },
    { target: 8, suffix: '', label: 'crane classes' },
  ],
};

/* Inner-page hero copy. Kept here rather than inline in each page so a client
   rollout is a single data edit — see scripts/client/apply.mjs. */
export const PAGE_HEROES = {
  fleet: {
    title: 'Our Cranes',
    subtitle:
      'Eight standard crane classes from 25 to 250 tonnes, with capacity to 700 tonnes on request — all maintained and ready to mobilise across Dubai.',
    breadcrumb: 'Cranes',
    image: '/images/fleet/crane-250t.webp',
  },
  solutions: {
    title: 'Lifting Solutions',
    subtitle:
      'Crane packages built around the job — construction, heavy lifting, industrial installation, infrastructure and emergency response.',
    breadcrumb: 'Solutions',
    image: '/images/solutions/hero.webp',
  },
  services: {
    title: 'Our Services',
    subtitle:
      'Beyond the crane itself — certified operators, lift planning, on-site rigging, maintenance and 24/7 emergency support.',
    breadcrumb: 'Services',
    image: '/images/services/hero.webp',
  },
  contacts: {
    title: 'Get in Touch',
    subtitle:
      'Our dispatch team takes bookings 24 hours a day. Tell us the load, the site and the date, and we will confirm the crane class.',
    breadcrumb: 'Contacts',
    image: '/images/contacts/hero.webp',
  },
};

export const KEY_ASSETS = {
  heading_words_row1: ['25', 'to', '700'],
  heading_words_row2: ['tonnes', 'of', 'capacity'],
  subheading:
    'Eight standard crane classes, all-terrain and truck-mounted, maintained to manufacturer schedule and dispatched anywhere in the Emirates.',
  cards: [
    {
      title: 'Light Lifts',
      subtitle: '25–75 Tonne Cranes',
      description:
        'Fast setup for tight urban plots, villa developments, HVAC placement and short-duration lifts.',
      image: '/images/main/light.webp',
      href: '/fleet?class=light',
    },
    {
      title: 'Mid-Range Lifts',
      subtitle: '100–150 Tonne Cranes',
      description:
        'Steel erection, precast panel setting and plant installation for mid-rise and industrial builds.',
      image: '/images/main/medium.webp',
      href: '/fleet?class=medium',
    },
    {
      title: 'Heavy Lifts',
      subtitle: '200–700 Tonne Cranes',
      description:
        'Bridge segments, tower cranes, vessels and generators — engineered lifts with full lift-plan support.',
      image: '/images/main/heavy.webp',
      href: '/fleet?class=heavy',
    },
  ],
};

export const FEATURES_SLIDES = [
  { title: '24 Hour Booking Available',      image: '/images/feature-delivery.jpg' },
  { title: 'Certified & Experienced Operators', image: '/images/feature-operators.jpg' },
  { title: '24/7 Emergency Crane Rental',    image: '/images/feature-support.jpg' },
  { title: 'Modern, Maintained Crane Fleet', image: '/images/feature-fleet.jpg' },
  { title: 'Weekly & Monthly Contracts',     image: '/images/feature-gps.jpg' },
];

export const STATS_TABS = [
  {
    label: 'Fleet',
    stats: [
      { value: '25–700t', label: 'Lifting Capacity' },
      { value: '8', label: 'Standard Crane Classes' },
      { value: '3', label: 'Weight Categories' },
    ],
  },
  {
    label: 'Operations',
    stats: [
      { value: '24/7', label: 'Booking & Dispatch' },
      { value: '100%', label: 'Certified Operators' },
      { value: 'Dubai', label: 'Full Emirate Coverage' },
    ],
  },
  {
    label: 'Track Record',
    stats: [
      { value: '1520+', label: 'Premium Clients' },
      { value: '25', label: 'Years of Experience' },
      { value: '5.0', label: 'Average Client Rating' },
    ],
  },
];

export const MISSION = {
  heading: 'Lifting Solutions, Building Trust',
  text: 'Al Badar Mobile Crane is a trusted provider of mobile crane rental in Dubai. We offer 25 to 700 tonne mobile cranes, heavy lifting, crane hire and equipment transportation for construction, industrial, commercial and infrastructure projects. Experienced operators, a modern fleet and 24/7 support mean every lift is completed safely, efficiently and on time — whether you need a crane for a single day or a long-term project.',
  values: ['Quality', 'Safety', 'Customer Care', 'Reliability'],
};

export const PILLARS = {
  heading: 'Three Reasons People Choose Us',
  subheading:
    'The standards we hold on every lift, from a one-day villa job to a multi-month industrial contract.',
  cards: [
    {
      icon: 'ShieldCheck',
      title: 'Safety',
      description:
        'Safety is at the forefront of all our decisions. We aim to create a safe work environment and provide proper training for every operator on every site.',
    },
    {
      icon: 'Wrench',
      title: 'Quality',
      description:
        'We are committed to providing high-quality service and continuously strive to find a better way to exceed our customers’ expectations.',
    },
    {
      icon: 'Truck',
      title: 'Customer Care',
      description:
        'We keep our customers at the centre and serve them with respect and commitment, to create value and build long-term relationships.',
    },
  ],
};

export const PRODUCTS_DUAL = [
  {
    title: 'Crane Rental',
    subtitle: '25 to 700 tonne mobile cranes, with or without operator.',
    image: '/images/product-rental.jpg',
    href: '/fleet',
  },
  {
    title: 'Lifting Solutions',
    subtitle:
      'Steel erection, precast setting, plant installation — planned and executed end to end.',
    image: '/images/product-solutions.jpg',
    href: '/solutions',
  },
];

/* Headings that are split into animated word rows. Words listed in `accent`
   are highlighted; they must match a word in row1/row2 exactly. */
export const STATS_HEADING = {
  row1: ['Lifting', 'across', 'every'],
  row2: ['project', 'in', 'Dubai'],
  accent: ['across', 'Dubai'],
};

export const PROJECTS_INTRO = {
  headingAccent: 'Projects Across',
  heading: 'Dubai',
  text: 'From single-day villa lifts to multi-month industrial contracts — delivered safely and on schedule.',
};

export const PROJECTS = [
  {
    title: 'Industrial Plant Installation — Al Quoz',
    description:
      'Heavy machinery placement and equipment installation inside an operating industrial facility, executed without shutting down adjacent lines.',
    image: '/images/project-dubai-south.jpg',
    href: '#',
  },
  {
    title: 'Steel Structure Erection — Dubai',
    description:
      'Structural steel and bridge component lifting for a commercial development, with full lift planning and certified rigging.',
    image: '/images/project-mbr.jpg',
    href: '#',
  },
  {
    title: 'Precast Concrete Setting — Infrastructure',
    description:
      'Precast panel and beam placement across a phased infrastructure programme, on a 24-hour rotating crane schedule.',
    image: '/images/project-jvc.jpg',
    href: '#',
  },
];

export const TESTIMONIALS = [
  {
    text: 'Outstanding service from Al Badar Mobile Crane. Their team arrived on time, handled the lifting operation professionally, and completed the job safely without any delays. Highly reliable and recommended for heavy lifting projects.',
    author: 'Reyyan',
    role: 'Site Engineer',
    date: 'March 2026',
  },
  {
    text: 'We hired Al Badar Mobile Crane for our construction project, and the experience was excellent. The crane operator was skilled, safety standards were maintained throughout the project, and everything was completed exactly as planned.',
    author: 'Asad',
    role: 'Construction Project Manager',
    date: 'February 2026',
  },
  {
    text: 'Al Badar Mobile Crane exceeded our expectations with their professional service and well-maintained equipment. Their team managed our heavy machinery installation efficiently, making the entire process smooth and stress-free.',
    author: 'Usman',
    role: 'Industrial Client',
    date: 'January 2026',
  },
];

export const CONTACTS = [
  {
    title: 'Head Office',
    address: 'Al Quoz Industrial Second, Al Quoz, Dubai, UAE',
    phone: '+971 55 128 5271',
    email: 'info@albadarmobilecrane.com',
  },
  {
    title: 'Dispatch',
    whatsapp: '+971 55 128 5271',
    hours: '24 hours a day, 7 days a week',
  },
  {
    title: 'Quick Connect',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61590625482636' },
      { platform: 'Instagram', url: 'https://www.instagram.com/albadarmobilecrane/' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/al-badar-mobile-crane-422154417/' },
      { platform: 'YouTube', url: 'https://www.youtube.com/@albadarmobilecraene' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* FLEET DATA                                                          */
/* ------------------------------------------------------------------ */

export type WeightClass = 'light' | 'medium' | 'heavy';
export type EquipmentType =
  | 'excavator'
  | 'loader'
  | 'lift'
  | 'compactor'
  | 'crane'
  | 'truck'
  | 'other';
export type EquipmentTag = 'NEW' | 'TOP' | 'SALE' | '-10%' | '-20%';

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  weight: string;
  weightClass: WeightClass;
  type: EquipmentType;
  tags: EquipmentTag[];
  image: string;
  specs?: string;
}

export const FLEET: Equipment[] = [
  // LIGHT LIFTS (25–75t)
  { id: 'c25', name: '25 Ton Mobile Crane', brand: 'Al Badar', weight: '25t', weightClass: 'light', type: 'crane', tags: ['TOP'], image: '/images/fleet/crane-25t.webp', specs: 'Truck-mounted, fast setup for tight urban sites' },
  { id: 'c50', name: '50 Ton Mobile Crane', brand: 'Al Badar', weight: '50t', weightClass: 'light', type: 'crane', tags: ['TOP'], image: '/images/fleet/crane-50t.webp', specs: 'Ideal for steel structures, precast and small-to-medium projects' },
  { id: 'c75', name: '75 Ton Mobile Crane', brand: 'Al Badar', weight: '75t', weightClass: 'light', type: 'crane', tags: [], image: '/images/fleet/crane-75t.webp', specs: 'All-terrain, for machinery placement and mid-rise construction' },

  // MID-RANGE LIFTS (100–150t)
  { id: 'c100', name: '100 Ton Mobile Crane', brand: 'Al Badar', weight: '100t', weightClass: 'medium', type: 'crane', tags: ['TOP'], image: '/images/fleet/crane-100t.webp', specs: 'Long-boom all-terrain for plant installation and tower assembly' },
  { id: 'c130', name: '130 Ton Mobile Crane', brand: 'Al Badar', weight: '130t', weightClass: 'medium', type: 'crane', tags: [], image: '/images/fleet/crane-130t.webp', specs: 'Multi-axle, for heavy industrial and infrastructure lifts' },
  { id: 'c150', name: '150 Ton Mobile Crane', brand: 'Al Badar', weight: '150t', weightClass: 'medium', type: 'crane', tags: ['NEW'], image: '/images/fleet/crane-150t.webp', specs: 'Extended reach for bridge components and oversized loads' },

  // HEAVY LIFTS (200t+)
  { id: 'c200', name: '200 Ton Mobile Crane', brand: 'Al Badar', weight: '200t', weightClass: 'heavy', type: 'crane', tags: [], image: '/images/fleet/crane-200t.webp', specs: 'Engineered heavy lifting with full lift-plan support' },
  { id: 'c250', name: '250 Ton Mobile Crane', brand: 'Al Badar', weight: '250t', weightClass: 'heavy', type: 'crane', tags: ['TOP'], image: '/images/fleet/crane-250t.webp', specs: 'Largest standard class — vessels, generators, tower cranes' },
  { id: 'c700', name: 'Up to 700 Ton — On Request', brand: 'Al Badar', weight: '700t', weightClass: 'heavy', type: 'crane', tags: ['NEW'], image: '/images/fleet/crane-250t.webp', specs: 'Long-term contract capacity for contractors and industrial sites' },
];

/* Original template fleet, kept out of the build. Retained so the demo dataset
   is one edit away if this client ever adds earthmoving equipment. */
const _TEMPLATE_FLEET: Equipment[] = [
  // LIGHT CLASS (0-5t)
  { id: 'l1', name: 'Mini Excavator CAT 304', brand: 'Caterpillar', weight: '5t', weightClass: 'light', type: 'excavator', tags: ['NEW'], image: '/images/equipment/cat-304.webp', specs: 'Dig depth 3.6m, bucket 0.14m³' },
  { id: 'l2', name: 'Skid Steer Loader CAT 250', brand: 'Caterpillar', weight: '3.5t', weightClass: 'light', type: 'loader', tags: ['NEW'], image: '/images/equipment/cat-250.webp', specs: 'Rated capacity 1,134kg' },
  { id: 'l3', name: 'Spider Crane Maeda MC285C', brand: 'Maeda', weight: '2.8t', weightClass: 'light', type: 'crane', tags: [], image: '/images/equipment/maeda-mc285c.webp', specs: 'Max lift 2.82t, boom 8.7m' },
  { id: 'l4', name: 'Boom Lift Genie Z-30/20', brand: 'Genie', weight: '6.2t', weightClass: 'light', type: 'lift', tags: ['-10%'], image: '/images/equipment/genie-z30.webp', specs: 'Platform height 9.1m, horizontal reach 6.1m' },
  { id: 'l5', name: 'Scissor Lift AICHI SV2632E', brand: 'AICHI', weight: '5.23t', weightClass: 'light', type: 'lift', tags: ['TOP'], image: '/images/equipment/aichi-sv2632e.webp', specs: 'Working height 9.9m, electric' },
  { id: 'l6', name: 'Mini Excavator Bobcat E50', brand: 'Bobcat', weight: '4.9t', weightClass: 'light', type: 'excavator', tags: [], image: '/images/equipment/bobcat-e50.webp', specs: 'Dig depth 3.5m, zero tail swing' },
  { id: 'l7', name: 'Plate Compactor DPU6555', brand: 'Wacker Neuson', weight: '0.4t', weightClass: 'light', type: 'compactor', tags: [], image: '/images/equipment/wacker-dpu6555.webp', specs: 'Centrifugal force 65kN, reversible' },
  { id: 'l8', name: 'Dumper DW50', brand: 'Wacker Neuson', weight: '3.4t', weightClass: 'light', type: 'truck', tags: [], image: '/images/equipment/wacker-dw50.webp', specs: 'Payload 5,000kg, 4WD' },
  { id: 'l9', name: 'Drum Roller BW 120', brand: 'Bomag', weight: '2.7t', weightClass: 'light', type: 'compactor', tags: [], image: '/images/equipment/bomag-bw120.webp', specs: 'Drum width 1,200mm, double drum' },

  // MEDIUM CLASS (5-20t)
  { id: 'm1', name: 'Backhoe Loader JCB 3CX', brand: 'JCB', weight: '8t', weightClass: 'medium', type: 'loader', tags: ['-20%'], image: '/images/equipment/jcb-3cx.webp', specs: 'Dig depth 5.5m, loader bucket 1.0m³' },
  { id: 'm2', name: 'Excavator JCB 140', brand: 'JCB', weight: '14t', weightClass: 'medium', type: 'excavator', tags: ['TOP'], image: '/images/equipment/jcb-140.webp', specs: 'Dig depth 5.4m, bucket 0.6m³' },
  { id: 'm3', name: 'Wheel Loader CAT 924', brand: 'Caterpillar', weight: '11.7t', weightClass: 'medium', type: 'loader', tags: ['SALE'], image: '/images/equipment/cat-924.webp', specs: 'Bucket capacity 2.3m³, payload 4.2t' },
  { id: 'm4', name: 'Wheeled Excavator CAT M315', brand: 'Caterpillar', weight: '15t', weightClass: 'medium', type: 'excavator', tags: ['TOP'], image: '/images/equipment/cat-m315.webp', specs: 'Dig depth 5.6m, road speed 35km/h' },
  { id: 'm5', name: 'Telehandler JCB 540 (17m)', brand: 'JCB', weight: '12t', weightClass: 'medium', type: 'lift', tags: ['NEW'], image: '/images/equipment/jcb-540.webp', specs: 'Max lift height 17m, capacity 4,000kg' },
  { id: 'm6', name: 'Motor Grader CAT 120M', brand: 'Caterpillar', weight: '18.4t', weightClass: 'medium', type: 'other', tags: [], image: '/images/equipment/cat-120m.webp', specs: 'Blade width 3.7m, articulated frame' },
  { id: 'm7', name: 'Drum Roller Bomag BW 211', brand: 'Bomag', weight: '13t', weightClass: 'medium', type: 'compactor', tags: [], image: '/images/equipment/bomag-bw211.webp', specs: 'Drum width 2,130mm, centrifugal force 262kN' },
  { id: 'm8', name: 'Boom Lift JLG 600AJ', brand: 'JLG', weight: '10t', weightClass: 'medium', type: 'lift', tags: [], image: '/images/equipment/jlg-600aj.webp', specs: 'Platform height 18.3m, articulating' },
  { id: 'm9', name: 'Scania Dumper Truck', brand: 'Scania', weight: '9.6t', weightClass: 'medium', type: 'truck', tags: [], image: '/images/equipment/scania-dumper.webp', specs: 'Payload 16t, Euro 5 compliant' },

  // HEAVY CLASS (20t+)
  { id: 'h1', name: 'Large Excavator CAT 340', brand: 'Caterpillar', weight: '37.7t', weightClass: 'heavy', type: 'excavator', tags: [], image: '/images/equipment/cat-340.webp', specs: 'Dig depth 7.5m, bucket 1.9m³' },
  { id: 'h2', name: 'Dozer CAT D6', brand: 'Caterpillar', weight: '23t', weightClass: 'heavy', type: 'other', tags: ['NEW'], image: '/images/equipment/cat-d6.webp', specs: 'Blade width 3.9m, fully automatic transmission' },
  { id: 'h3', name: 'Mobile Crane Liebherr', brand: 'Liebherr', weight: '110t', weightClass: 'heavy', type: 'crane', tags: ['NEW'], image: '/images/equipment/liebherr-crane.webp', specs: 'Max capacity 110t, boom 50m' },
  { id: 'h4', name: 'Wheel Loader CAT 982', brand: 'Caterpillar', weight: '35t', weightClass: 'heavy', type: 'loader', tags: ['TOP'], image: '/images/equipment/cat-982.webp', specs: 'Bucket capacity 6.5m³, payload 11.5t' },
  { id: 'h5', name: 'Volvo A40G Articulated Hauler', brand: 'Volvo', weight: '39t', weightClass: 'heavy', type: 'truck', tags: ['SALE'], image: '/images/equipment/volvo-a40g.webp', specs: 'Payload 39t, 6×6 drive' },
  { id: 'h6', name: 'Piling Rig LRB 355.1', brand: 'Liebherr', weight: '95t', weightClass: 'heavy', type: 'other', tags: ['NEW'], image: '/images/equipment/liebherr-lrb355.webp', specs: 'Max drilling depth 60m, torque 355kNm' },
  { id: 'h7', name: 'Grader CAT 18', brand: 'Caterpillar', weight: '37t', weightClass: 'heavy', type: 'other', tags: ['SALE'], image: '/images/equipment/cat-18.webp', specs: 'Blade width 4.9m, 6-wheel drive' },
  { id: 'h8', name: 'Crawler Crane LR 1300', brand: 'Liebherr', weight: '300t', weightClass: 'heavy', type: 'crane', tags: ['TOP'], image: '/images/equipment/liebherr-lr1300.webp', specs: 'Max capacity 300t, boom 100m' },
];
void _TEMPLATE_FLEET;

export const WEIGHT_CLASS_LABELS: Record<WeightClass, string> = {
  light: 'Light Lifts (25–75t)',
  medium: 'Mid-Range (100–150t)',
  heavy: 'Heavy Lifts (200t+)',
};

export const EQUIPMENT_TYPE_LABELS: Record<EquipmentType, string> = {
  excavator: 'Excavators',
  loader: 'Loaders',
  lift: 'Lifts',
  compactor: 'Compactors',
  crane: 'Cranes',
  truck: 'Trucks',
  other: 'Other',
};

/* ------------------------------------------------------------------ */
/* SOLUTIONS DATA                                                      */
/* ------------------------------------------------------------------ */

export interface Solution {
  id: string;
  title: string;
  description: string;
  color: 'primary' | 'accent';
  icon: string;
  subServices: string[];
  equipment: string[];
  href: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string;
  benefits: string[];
  image: string;
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'construction-lifting',
    title: 'Construction Lifting',
    description: 'Cranes and operators for every stage of a build, from foundation to topping out.',
    color: 'primary',
    icon: 'Building2',
    href: '/solutions/construction-lifting',
    image: '/images/solutions/hf_20260329_154433_bd8b8e69-9718-4293-ae86-07589ffbd120.webp',
    seoTitle: 'Construction Crane Rental Dubai — Al Badar Mobile Crane',
    seoDescription: 'Mobile crane rental for construction sites across Dubai. 25 to 700 tonne cranes with certified operators for steel erection, formwork, precast and material handling.',
    longDescription: 'Al Badar Mobile Crane supports construction projects across Dubai from the first foundation lift to the final roof unit. We supply 25 to 700 tonne mobile cranes with certified operators for structural steel erection, formwork handling, rebar and material placement, and rooftop plant installation. Cranes can be booked for a single day, by the week, or held on site for the duration of a project, and our dispatch runs 24 hours so night works and tight programme windows are never a problem.',
    benefits: [
      'Cranes sized to each phase, from 25t to 700t',
      'Certified operators supplied with every unit',
      '24-hour booking for night and weekend works',
      'Daily, weekly and monthly contract options',
      'Rapid mobilisation across the Emirate',
      'Lift planning support before mobilisation',
    ],
    subServices: [
      'Structural steel erection',
      'Formwork and shuttering handling',
      'Rebar and material placement',
      'Rooftop plant and HVAC lifting',
      'Facade and cladding installation',
      'Site material handling',
    ],
    equipment: [
      '25 Ton Crane', '50 Ton Crane', '75 Ton Crane',
      '100 Ton Crane', '130 Ton Crane', '150 Ton Crane',
      '200 Ton Crane', '250 Ton Crane',
    ],
  },
  {
    id: 'heavy-lifting',
    title: 'Heavy & Engineered Lifting',
    description: 'High-capacity lifts of oversized loads, planned and executed to method statement.',
    color: 'accent',
    icon: 'Weight',
    href: '/solutions/heavy-lifting',
    image: '/images/solutions/hf_20260329_154417_d7f7c782-d322-423f-a587-bc0d1a8d774f.webp',
    seoTitle: 'Heavy Lifting Services Dubai — 200 to 700 Ton Cranes',
    seoDescription: 'Engineered heavy lifting in Dubai with 200, 250 and up to 700 tonne mobile cranes. Vessels, generators, bridge segments and tower crane assembly with full lift planning.',
    longDescription: 'When a load exceeds the range of standard equipment, it needs a crane class and a lift plan built for it. Our heavy fleet handles pressure vessels, transformers, generators, bridge segments and tower crane assembly, working from a documented lift plan with defined ground bearing pressures, rigging configuration and exclusion zones. Capacity above 250 tonnes, up to 700 tonnes, is available on request for contractors and industrial sites on longer-term arrangements.',
    benefits: [
      'Capacity to 700 tonnes on request',
      'Documented lift plans and method statements',
      'Ground bearing pressure assessment',
      'Certified rigging gear and riggers',
      'Multi-crane tandem lifts where required',
      'Long-term contracts for industrial programmes',
    ],
    subServices: [
      'Vessel and tank placement',
      'Generator and transformer lifting',
      'Bridge segment installation',
      'Tower crane erection and dismantling',
      'Tandem and multi-crane lifts',
      'Lift planning and engineering support',
    ],
    equipment: [
      '200 Ton Crane', '250 Ton Crane', 'Up to 700 Ton (on request)',
      'Certified rigging gear', 'Spreader beams', 'Outrigger mats',
    ],
  },
  {
    id: 'industrial-installation',
    title: 'Industrial Plant Installation',
    description: 'Machinery placement inside live plants, without shutting the facility down.',
    color: 'primary',
    icon: 'Factory',
    href: '/solutions/industrial-installation',
    image: '/images/solutions/hf_20260329_154428_86b4cd3f-95a8-4c91-82fe-63b867785330.webp',
    seoTitle: 'Industrial Machinery Installation Dubai — Al Badar Mobile Crane',
    seoDescription: 'Crane services for industrial machinery installation and relocation across Dubai. Precision placement of production equipment, chillers and heavy plant in live facilities.',
    longDescription: 'Industrial installation demands precision in confined space, often while the facility around it keeps running. We place production machinery, chillers, compressors and process equipment to fine tolerance, working within restricted access, low headroom and live-operation constraints. Our operators handle heavy machinery installation efficiently and with the safety standards a working plant requires, which is what clients most often name when they come back to us.',
    benefits: [
      'Precision placement to fine tolerance',
      'Works alongside live plant operations',
      'Restricted-access and low-headroom experience',
      'Machinery relocation within facilities',
      'Coordinated with your shutdown windows',
      'Certified operators experienced in industrial sites',
    ],
    subServices: [
      'Production machinery placement',
      'Chiller and HVAC unit installation',
      'Compressor and pump setting',
      'In-plant machinery relocation',
      'Equipment loading and offloading',
      'Shutdown and turnaround support',
    ],
    equipment: [
      '25 Ton Crane', '50 Ton Crane', '75 Ton Crane',
      '100 Ton Crane', '130 Ton Crane', 'Certified rigging gear',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Projects',
    description: 'Crane support for roads, bridges, utilities and public works programmes.',
    color: 'accent',
    icon: 'Route',
    href: '/solutions/infrastructure',
    image: '/images/solutions/hf_20260329_154438_18528dc8-5bf8-4a97-a7a4-8ab6ba219004.webp',
    seoTitle: 'Infrastructure Crane Rental Dubai — Bridges, Roads & Utilities',
    seoDescription: 'Mobile crane hire for infrastructure works in Dubai. Bridge components, precast beams, culverts and utility installation with 25 to 700 tonne cranes and certified operators.',
    longDescription: 'Infrastructure work runs to fixed windows and long programmes, and the crane has to fit both. We supply cranes for bridge component and precast beam placement, culvert and drainage installation, utility and substation work, and highway furniture erection. Units can be held on site for the length of a phase, with rotating operators to cover round-the-clock schedules and night closures.',
    benefits: [
      'Long-duration site-based crane contracts',
      'Rotating operators for 24-hour schedules',
      'Precast beam and segment placement',
      'Night and road-closure window works',
      'Multiple units for parallel work fronts',
      'Coverage across the Emirate',
    ],
    subServices: [
      'Bridge component installation',
      'Precast beam and segment placement',
      'Culvert and drainage works',
      'Utility and substation installation',
      'Highway furniture erection',
      'Pipe and duct handling',
    ],
    equipment: [
      '100 Ton Crane', '130 Ton Crane', '150 Ton Crane',
      '200 Ton Crane', '250 Ton Crane', 'Spreader beams',
    ],
  },
  {
    id: 'emergency-lifting',
    title: '24/7 Emergency Lifting',
    description: 'Fast-response crane hire for breakdowns, recovery and unplanned lifts.',
    color: 'primary',
    icon: 'Siren',
    href: '/solutions/emergency-lifting',
    image: '/images/solutions/hf_20260329_154603_855f5dd7-06b1-42a2-9402-be440d8eedc5.webp',
    seoTitle: '24/7 Emergency Crane Rental Dubai — Al Badar Mobile Crane',
    seoDescription: 'Emergency mobile crane rental in Dubai, available 24 hours. Fast response for equipment breakdown, vehicle recovery, and urgent unplanned lifting operations.',
    longDescription: 'Unplanned lifts do not wait for office hours. Our dispatch takes bookings 24 hours a day and mobilises cranes for equipment breakdown recovery, overturned plant, urgent structural support and any lift that has to happen now. Call the dispatch line and we confirm crane class, operator and arrival window on the same call.',
    benefits: [
      'Booking line answered 24 hours a day',
      'Fast response across Dubai',
      'Crane class confirmed on the first call',
      'Operators on standby rotation',
      'Recovery and breakdown experience',
      'Short-notice single-day hire',
    ],
    subServices: [
      'Equipment breakdown recovery',
      'Overturned plant righting',
      'Urgent structural support lifts',
      'Vehicle and machinery recovery',
      'Out-of-hours and holiday call-outs',
      'Short-notice replacement cranes',
    ],
    equipment: [
      '25 Ton Crane', '50 Ton Crane', '75 Ton Crane',
      '100 Ton Crane', 'Recovery rigging', 'Certified riggers',
    ],
  },
  {
    id: 'long-term-hire',
    title: 'Long-Term Crane Hire',
    description: 'Cranes held on site by the week, month or project, at contract rates.',
    color: 'accent',
    icon: 'CalendarClock',
    href: '/solutions/long-term-hire',
    image: '/images/solutions/hf_20260329_135026_cc3f78e7-7000-4bc1-ac23-a06291f601cb.webp',
    seoTitle: 'Monthly & Long-Term Crane Rental Dubai — Al Badar Mobile Crane',
    seoDescription: 'Weekly and monthly mobile crane rental in Dubai. 25 to 700 tonne cranes on long-term contract for contractors and industrial sites, with dedicated operators.',
    longDescription: 'Contractors running a site for months do not want to rebook a crane every morning. We place units on site under weekly, monthly or full-project contracts, with dedicated operators, scheduled maintenance handled by us, and rates that reflect the duration. Capacity from 25 tonnes up to 700 tonnes is available for long-term arrangements with contractors and industrial sites.',
    benefits: [
      'Weekly, monthly and project-length contracts',
      'Rates scaled to hire duration',
      'Dedicated operators assigned to your site',
      'Scheduled maintenance handled by us',
      'Capacity up to 700 tonnes on long-term hire',
      'Priority replacement if a unit goes down',
    ],
    subServices: [
      'Weekly crane hire',
      'Monthly crane hire',
      'Full-project crane contracts',
      'Dedicated operator assignment',
      'On-site maintenance scheduling',
      'Multi-unit site packages',
    ],
    equipment: [
      '25 Ton Crane', '50 Ton Crane', '100 Ton Crane',
      '150 Ton Crane', '250 Ton Crane', 'Up to 700 Ton (on request)',
    ],
  },
];


export const EXCAVATION_PROCESS = [
  'Site Survey',
  'Planning & Permits',
  'Site Clearing',
  'The Dig',
  'Load & Disposal',
  'Final Grading',
];

/* ------------------------------------------------------------------ */
/* SERVICES DATA                                                       */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  title: string;
  description: string;
  details?: string[];
  icon: string;
  href: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string;
  benefits: string[];
  image: string;
}

export const SERVICES_PRIMARY: Service[] = [
  {
    id: 'crane-rental',
    title: 'Mobile Crane Rental',
    description: 'Mobile cranes from 25 to 700 tonnes, booked by the day, week or month, with or without operator.',
    icon: 'Crane',
    href: '/services/crane-rental',
    image: '/images/services/crane-rental.webp',
    seoTitle: 'Mobile Crane Rental Dubai — 25 to 700 Ton | Al Badar Mobile Crane',
    seoDescription: 'Hire mobile cranes in Dubai from 25 to 700 tonnes. Truck-mounted and all-terrain cranes, certified operators, 24 hour booking, daily weekly and monthly rates.',
    longDescription: 'Our core service is straightforward: the right crane, on your site, when you need it. Eight standard classes run from 25 to 250 tonnes, with capacity up to 700 tonnes available on request for longer contracts. Every unit is maintained to manufacturer schedule and inspected before dispatch. Booking is open 24 hours, and hire runs by the day, the week or the month depending on how long the work takes.',
    benefits: [
      'Eight standard classes from 25t to 250t',
      'Up to 700 tonnes available on request',
      '24 hour booking line',
      'Daily, weekly and monthly rates',
      'Maintained to manufacturer schedule',
      'Pre-dispatch inspection on every unit',
    ],
    details: [
      '25, 50 and 75 tonne cranes for light and urban lifts',
      '100, 130 and 150 tonne cranes for mid-range work',
      '200 and 250 tonne cranes for heavy lifting',
      'Capacity to 700 tonnes on long-term contract',
    ],
  },
  {
    id: 'operators',
    title: 'Certified Crane Operators',
    description: 'Professional operators with years of heavy lifting experience, supplied with every crane.',
    icon: 'UserCheck',
    href: '/services/operators',
    image: '/images/services/operators.webp',
    seoTitle: 'Certified Crane Operator Hire Dubai — Al Badar Mobile Crane',
    seoDescription: 'Certified, experienced mobile crane operators in Dubai. Supplied with every crane rental, trained on safety standards and matched to your lift scope.',
    longDescription: 'A crane is only as good as the person operating it. Our operators are certified, carry years of heavy lifting experience, and are trained on the safety standards a Dubai site demands. They are matched to the crane class and the scope, brief with your site team before the lift, and work to your method statement. For long-term contracts we assign dedicated operators so the same people learn your site.',
    benefits: [
      'Certified and experienced on every class we run',
      'Safety training maintained and current',
      'Site briefing before every lift',
      'Matched to crane class and lift scope',
      'Dedicated operators on long-term contracts',
      'Rotating cover for 24-hour schedules',
    ],
    details: [
      'Operators supplied with every crane rental',
      'Skilled operation under your method statement',
      'Experienced across construction and industrial sites',
      'Available for night and weekend schedules',
    ],
  },
  {
    id: 'lift-planning',
    title: 'Lift Planning & Consultation',
    description: 'Expert advice on lift planning and equipment selection to optimise your operation.',
    icon: 'ClipboardCheck',
    href: '/services/lift-planning',
    image: '/images/services/permits.webp',
    seoTitle: 'Crane Lift Planning & Consultation Dubai — Al Badar Mobile Crane',
    seoDescription: 'Lift planning and crane selection consultancy in Dubai. Load charts, ground bearing pressure, rigging configuration and method statements before mobilisation.',
    longDescription: 'Choosing the wrong crane class is expensive twice over: once for the wasted mobilisation and again for the delay. We review your load weights, radius, site access and ground conditions before anything moves, then recommend the crane class, boom configuration and rigging that actually fits. For engineered lifts we produce a documented plan covering ground bearing pressures, exclusion zones and rigging arrangement.',
    benefits: [
      'Crane class recommended against real load data',
      'Load chart and radius verification',
      'Ground bearing pressure assessment',
      'Rigging configuration specified',
      'Documented plans for engineered lifts',
      'Advice before you commit to mobilisation',
    ],
    details: [
      'Load weight and radius review',
      'Site access and set-up position assessment',
      'Crane and boom configuration selection',
      'Method statement support for engineered lifts',
    ],
  },
  {
    id: 'on-site-setup',
    title: 'On-Site Setup & Rigging',
    description: 'Efficient and safe assembly and positioning of the crane at your location.',
    icon: 'Settings',
    href: '/services/on-site-setup',
    image: '/images/services/spider-crane-rental.webp',
    seoTitle: 'Crane Setup & Rigging Services Dubai — Al Badar Mobile Crane',
    seoDescription: 'Professional crane setup, positioning and rigging in Dubai. Outrigger placement, counterweight assembly, certified rigging gear and load handling.',
    longDescription: 'Setup is where most lifting incidents are avoided. Our crews position the crane, set and mat the outriggers, assemble counterweight and boom configuration, and rig the load with certified gear. Expert handling covers construction materials, machinery, steel and oversized industrial equipment, with the rigging arrangement matched to the load rather than improvised on site.',
    benefits: [
      'Correct outrigger positioning and matting',
      'Counterweight and boom assembly',
      'Certified slings, shackles and spreader beams',
      'Rigging matched to the specific load',
      'Exclusion zones established before lifting',
      'Experienced riggers on heavy lifts',
    ],
    details: [
      'Crane positioning and stabilisation',
      'Outrigger mats and ground protection',
      'Load rigging with certified gear',
      'Handling of materials, machinery and steel',
    ],
  },
  {
    id: 'emergency-support',
    title: 'Emergency Support',
    description: 'Rapid response for urgent lifting needs or unforeseen issues, 24 hours a day.',
    icon: 'Siren',
    href: '/services/emergency-support',
    image: '/images/services/boom-lift-rental.webp',
    seoTitle: '24/7 Emergency Crane Support Dubai — Al Badar Mobile Crane',
    seoDescription: 'Emergency crane support in Dubai, 24 hours a day. Rapid response for urgent lifts, equipment breakdown, recovery and unforeseen site issues.',
    longDescription: 'Our booking line runs 24 hours because sites do not stop at six. Emergency support covers urgent unplanned lifts, equipment breakdown and recovery, and situations where a crane has to be on site within hours rather than days. Crane class, operator and arrival window are confirmed on the call, and we keep operators on standby rotation to make that possible.',
    benefits: [
      'Booking answered 24 hours a day',
      'Arrival window confirmed on the first call',
      'Operators on standby rotation',
      'Breakdown and recovery experience',
      'Out-of-hours and holiday call-outs',
      'Short-notice single-day hire',
    ],
    details: [
      'Urgent unplanned lifting operations',
      'Equipment breakdown and recovery',
      'Replacement crane at short notice',
      'Night, weekend and holiday response',
    ],
  },
  {
    id: 'maintenance',
    title: 'Routine Maintenance',
    description: 'Regular inspections and maintenance keep every crane in top working condition.',
    icon: 'Wrench',
    href: '/services/maintenance',
    image: '/images/services/fueling.webp',
    seoTitle: 'Crane Maintenance & Inspection — Al Badar Mobile Crane Dubai',
    seoDescription: 'Scheduled crane maintenance and inspection in Dubai. Manufacturer-schedule servicing, pre-dispatch checks and on-site maintenance for long-term hire.',
    longDescription: 'Downtime on a hired crane is downtime on your programme, so maintenance is ours to manage, not yours. Every unit runs on a manufacturer-schedule service programme with inspection before dispatch. On long-term contracts we schedule servicing around your working windows and hold priority replacement if a unit goes down mid-project.',
    benefits: [
      'Manufacturer-schedule servicing programme',
      'Inspection before every dispatch',
      'Maintenance scheduled around your works',
      'Priority replacement on long-term hire',
      'Records maintained for every unit',
      'Modern, well-maintained fleet throughout',
    ],
    details: [
      'Pre-dispatch inspection on all units',
      'Scheduled servicing during long-term hire',
      'On-site maintenance visits',
      'Replacement unit if a crane goes down',
    ],
  },
];


export const SERVICES_ADDITIONAL = [
  'Precision auger drilling',
  'Industrial machinery jacking and skidding',
  'AC chiller installation via crane',
  'High-rise furniture and equipment moving',
  'Post hole excavation for parking shades',
  'Landscaping and olive tree planting',
];
