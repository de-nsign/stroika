export const SITE = {
  name: 'GrowthLift',
  tagline: 'Your Professional Gateway to Growth',
  phone: '+971 4 513 2499',
  whatsapp: '+971 56 242 4039',
  whatsappLink: 'https://wa.me/971562424039',
  email: 'info@thegrowthlift.com',
  address: 'Mai Tower, Al Qusais, Dubai, UAE',
  hours: '24/7 technical support · Mon–Sat office hours',
  logo: {
    mode: 'image',
    flat: false,
    src: '/images/brand/logo.png',
    srcDark: '/images/brand/logo-white.png',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Equipment', href: '/fleet' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Services', href: '/services' },
  { label: 'Contacts', href: '/contacts' },
];

/* Inner-page hero copy lives here so no client wording is hardcoded in a page. */
export const PAGE_HEROES = {
  fleet: {
    title: 'Our Equipment',
    subtitle:
      'Earth moving, access platforms, lifting, air and power systems from Caterpillar, Komatsu, Genie, JLG and other leading manufacturers.',
  },
  solutions: {
    title: 'Rental & Service Solutions',
    subtitle:
      'Short-term, long-term, with or without operator — plus AMC, repairs and spare parts across GCC, Asia and Africa.',
  },
  services: {
    title: 'Services',
    subtitle:
      'Operators, spare parts, training and multi-brand technical support to keep your machines working.',
  },
};

export const HERO = {
  heading: 'Heavy Equipment for the Middle East, Asia & Africa',
  subheading:
    'Rental, trading, training and AMC from Dubai. Earth moving, lifting, access platforms, air and power systems — supplied with or without operators, for a day or for years.',
  cta_primary: 'Explore Equipment',
  cta_secondary: 'Request a Quote',
  stats: [
    { value: 5, label: 'equipment families' },
    { value: 3, label: 'regions served' },
  ] as { value: number; suffix?: string; label: string }[],
};

export const KEY_ASSETS = {
  heading_words_row1: ['5', 'equipment', 'families'],
  heading_words_row2: ['3', 'regions', 'served'],
  subheading:
    'A comprehensive selection of heavy equipment for construction, industrial and infrastructure projects — headquartered in Dubai, with a second office in Jharkhand, India.',
  cards: [
    {
      title: 'Earth Moving',
      subtitle: 'Excavators to Graders',
      description:
        'Excavators, dozers, wheel loaders, mining trucks, motor graders, skid steers, compactors and backhoe loaders.',
      image: '/images/equipment/gl-excavator.webp',
      href: '/fleet?class=earthmoving',
    },
    {
      title: 'Access Platforms',
      subtitle: 'Working at Height',
      description:
        'Boom lifts, spider lifts, scissor lifts, truck-mounted platforms and vertical mast lifts for indoor and outdoor work.',
      image: '/images/equipment/gl-boom-lift.webp',
      href: '/fleet?class=access',
    },
    {
      title: 'Lifting, Air & Power',
      subtitle: 'Cranes, Compressors, Gensets',
      description:
        'Mobile, rough-terrain and crawler cranes, forklifts and duct lifters, plus air compressors and diesel generators.',
      image: '/images/equipment/gl-crawler-crane.webp',
      href: '/fleet?class=lifting',
    },
  ],
};

export const FEATURES_SLIDES = [
  { title: 'Immediate Availability',         image: '/images/feature-delivery.jpg' },
  { title: 'Certified Operators on Request', image: '/images/feature-operators.jpg' },
  { title: '24/7 Technical Support',         image: '/images/feature-support.jpg' },
  { title: 'Multi-Brand Service Expertise',  image: '/images/feature-fleet.jpg' },
  { title: 'AMC & Preventive Maintenance',   image: '/images/feature-gps.jpg' },
];

export const STATS_TABS = [
  {
    label: 'Equipment',
    stats: [
      { value: '5', label: 'Equipment Families' },
      { value: '21', label: 'Machine Categories' },
      { value: '4', label: 'Rental Types' },
    ],
  },
  {
    label: 'Reach',
    stats: [
      { value: '3', label: 'Regions Served' },
      { value: '2', label: 'Offices: Dubai & India' },
      { value: '24/7', label: 'Technical Support' },
    ],
  },
  {
    label: 'Service',
    stats: [
      { value: '9+', label: 'Brands Supported' },
      { value: '5.0', label: 'Google Rating' },
      { value: '48', label: 'Google Reviews' },
    ],
  },
];

export const MISSION = {
  heading: 'Your Professional Gateway to Growth',
  text: 'GrowthLift empowers businesses with high-quality equipment and expert support, ensuring the seamless execution of their projects while prioritizing safety, efficiency and cost-effectiveness — across the Middle East, Asia and Africa.',
  values: ['Reliability', 'Quality', 'Safety', 'Support'],
};

export const PILLARS = {
  heading: 'One Partner for Rental, Trading and Upkeep',
  subheading:
    'Structured maintenance programs, multi-brand technical expertise and cross-border service coordination — so equipment keeps earning wherever it is deployed.',
  cards: [
    {
      icon: 'ShieldCheck',
      title: 'AMC & Preventive Maintenance',
      description:
        'OEM-standard maintenance programs on quarterly, half-yearly and annual plans, with inspection reports and full service documentation.',
    },
    {
      icon: 'Wrench',
      title: 'Multi-Brand Expertise',
      description:
        'Service engineers supporting Genie, JLG, Niftylift, Skyjack, Teupen, Platform Basket, Komatsu, Caterpillar and other leading manufacturers.',
    },
    {
      icon: 'Truck',
      title: 'Mobile & Workshop Service',
      description:
        'On-site troubleshooting for electrical, hydraulic and mechanical faults, workshop repairs, and machine pickup and delivery where location allows.',
    },
  ],
};

export const PRODUCTS_DUAL = [
  {
    title: 'Equipment Rental',
    subtitle: 'Earth moving, access, lifting, air and power — short or long term.',
    image: '/images/product-rental.jpg',
    href: '/fleet',
  },
  {
    title: 'Service & AMC',
    subtitle: 'Annual maintenance contracts, breakdown repairs and spare parts supply.',
    image: '/images/product-solutions.jpg',
    href: '/solutions',
  },
];

/* GrowthLift publish no project case studies, so the section is left off the home
   page rather than filled with invented references. */
export const PROJECTS: {
  title: string;
  description: string;
  image: string;
  href: string;
}[] = [];

export const TESTIMONIALS = [
  {
    text: 'Great experience with M/s Growthlift. The equipment was in excellent condition, delivered on time, and ready to use. The team was professional, responsive, and supportive throughout the rental period. Pricing was fair and transparent.',
    author: 'Rahul Jaiswal',
    role: 'Google Review',
    date: 'January 2026',
  },
  {
    text: 'Had a great experience. The boom lift and scissor lifts were in excellent condition and delivered right on time. Will definitely be using them again for our next project.',
    author: 'Nikesh Meethale Purath',
    role: 'Google Review',
    date: 'January 2026',
  },
  {
    text: 'I have been dealing with this company for 9 months. Shubham, who handles sales and operations, always provides excellent support. We have never received any complaints from our sites regarding their service. Highly recommended!',
    author: 'Arshiya Jabeen',
    role: 'Google Review',
    date: 'January 2026',
  },
  {
    text: 'Always Recommend, Quick Response and Great Team. Always Love a Good Coordination from them and equipments they Provide are New. I would always Recommend them for Rental and Trade for Heavy Equipments.',
    author: 'Sami Raj',
    role: 'Google Review',
    date: 'February 2026',
  },
  {
    text: 'One of the best service provider in all over UAE for the heavy equipments. Must go with Growth Lift.',
    author: 'Mrigendra Dwivedi',
    role: 'Google Review',
    date: 'February 2026',
  },
  {
    text: 'Always giving the best price, their technical team are very supportive! Highly recommend.',
    author: 'Harpreet Kaur',
    role: 'Google Review',
    date: 'January 2026',
  },
];

export const CONTACTS = [
  {
    title: 'Middle East — Dubai',
    address: 'Growthlift Heavy Equipment Trading LLC, Mai Tower, Al Qusais, Dubai, UAE',
    phone: '+971 4 513 2499',
    email: 'info@thegrowthlift.com',
  },
  {
    title: 'Rentals & Support',
    phone: '+971 56 950 0915',
    whatsapp: '+971 56 242 4039',
    hours: '24/7 technical support',
  },
  {
    title: 'Asia — India',
    address:
      'Vertex Growthlift Private Limited, Main Road, Bistupur, East Singhbhum, Jharkhand, India',
    phone: '+91 84200 00414',
    email: 'vertex@thegrowthlift.com',
  },
];

/* ------------------------------------------------------------------ */
/* FLEET DATA                                                          */
/* ------------------------------------------------------------------ */

export type WeightClass = 'earthmoving' | 'access' | 'lifting';
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
  /* GrowthLift publish no tonnage or spec sheets, so both fields are optional
     rather than filled with numbers nobody can stand behind. */
  weight?: string;
  weightClass: WeightClass;
  type: EquipmentType;
  tags: EquipmentTag[];
  image: string;
  specs?: string;
}

export const FLEET: Equipment[] = [
  // EARTH MOVING
  { id: 'e1', name: 'Tracked Excavator', brand: 'Caterpillar', weightClass: 'earthmoving', type: 'excavator', tags: ['TOP'], image: '/images/equipment/gl-excavator.webp' },
  { id: 'e2', name: 'Crawler Dozer', brand: 'Caterpillar', weightClass: 'earthmoving', type: 'other', tags: [], image: '/images/equipment/gl-dozer.webp' },
  { id: 'e3', name: 'Wheel Loader', brand: 'Caterpillar', weightClass: 'earthmoving', type: 'loader', tags: [], image: '/images/equipment/gl-wheel-loader.webp' },
  { id: 'e4', name: 'Articulated Mining Truck', brand: 'Volvo', weightClass: 'earthmoving', type: 'truck', tags: [], image: '/images/equipment/gl-hauler.webp' },
  { id: 'e5', name: 'Motor Grader', brand: 'Caterpillar', weightClass: 'earthmoving', type: 'other', tags: [], image: '/images/equipment/gl-grader.webp' },
  { id: 'e6', name: 'Skid Steer Loader', brand: 'Caterpillar', weightClass: 'earthmoving', type: 'loader', tags: [], image: '/images/equipment/gl-skid-steer.webp' },
  { id: 'e7', name: 'Roller Compactor', brand: 'Caterpillar', weightClass: 'earthmoving', type: 'compactor', tags: [], image: '/images/equipment/gl-compactor.webp' },
  { id: 'e8', name: 'Backhoe Loader', brand: 'JCB', weightClass: 'earthmoving', type: 'loader', tags: ['TOP'], image: '/images/equipment/gl-backhoe.webp' },

  // ACCESS PLATFORMS (AWP)
  { id: 'a1', name: 'Articulating Boom Lift', brand: 'JLG', weightClass: 'access', type: 'lift', tags: ['TOP'], image: '/images/equipment/gl-boom-lift.webp' },
  { id: 'a2', name: 'Spider Lift', brand: 'Platform Basket', weightClass: 'access', type: 'lift', tags: ['NEW'], image: '/images/equipment/gl-spider-lift.webp' },
  { id: 'a3', name: 'Scissor Lift', brand: 'Multi-brand', weightClass: 'access', type: 'lift', tags: [], image: '/images/equipment/gl-scissor-lift.webp' },
  { id: 'a4', name: 'Vertical Mast Lift', brand: 'Multi-brand', weightClass: 'access', type: 'lift', tags: [], image: '/images/equipment/gl-vertical-lift.webp' },

  // LIFTING, AIR & POWER
  { id: 'l1', name: 'Truck-Mounted Crane', brand: 'Multi-brand', weightClass: 'lifting', type: 'crane', tags: [], image: '/images/equipment/gl-truck-crane.webp' },
  { id: 'l2', name: 'Rough Terrain Crane', brand: 'Multi-brand', weightClass: 'lifting', type: 'crane', tags: ['TOP'], image: '/images/equipment/gl-rt-crane.webp' },
  { id: 'l3', name: 'Crawler Crane', brand: 'Kobelco', weightClass: 'lifting', type: 'crane', tags: [], image: '/images/equipment/gl-crawler-crane.webp' },
  { id: 'l4', name: 'High Pressure Air Compressor', brand: 'Multi-brand', weightClass: 'lifting', type: 'other', tags: [], image: '/images/equipment/gl-compressor-hp.webp' },
  { id: 'l5', name: 'Oil-Free Air Compressor', brand: 'Doosan', weightClass: 'lifting', type: 'other', tags: [], image: '/images/equipment/gl-compressor-oilfree.webp', specs: 'Oil-free air delivery' },
  { id: 'l6', name: 'Standard Air Compressor', brand: 'Multi-brand', weightClass: 'lifting', type: 'other', tags: [], image: '/images/equipment/gl-compressor-std.webp' },
  { id: 'l7', name: 'Diesel Generator', brand: 'Caterpillar', weightClass: 'lifting', type: 'other', tags: [], image: '/images/equipment/gl-generator-cat.webp' },
];

export const WEIGHT_CLASS_LABELS: Record<WeightClass, string> = {
  earthmoving: 'Earth Moving',
  access: 'Access Platforms',
  lifting: 'Lifting, Air & Power',
};

export const EQUIPMENT_TYPE_LABELS: Record<EquipmentType, string> = {
  excavator: 'Excavators',
  loader: 'Loaders',
  lift: 'Lifts & Platforms',
  compactor: 'Compactors',
  crane: 'Cranes',
  truck: 'Trucks',
  other: 'Air, Power & Other',
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
    id: 'short-term-rentals',
    title: 'Short-Term Rentals',
    description: 'Ideal for one-time projects, emergencies or short-duration tasks.',
    color: 'primary',
    icon: 'Clock',
    href: '/solutions/short-term-rentals',
    image: '/images/services/boom-lift-rental.webp',
    seoTitle: 'Short-Term Equipment Rental Dubai — GrowthLift',
    seoDescription: 'Short-term heavy equipment rental in Dubai. Hours, days or weeks — immediate availability, well-maintained machinery and emergency response for urgent requirements.',
    longDescription: 'When you need equipment for a short-term project, our rental solutions provide quick access to well-maintained machinery without the burden of ownership. Whether it is for a few hours, days or weeks, we offer flexible rental plans that help you stay within budget while keeping your project on track.',
    benefits: [
      'Immediate availability — equipment on short notice',
      'Rent for the exact time frame required, from hours to weeks',
      'Cost-effective: no purchase cost for a temporary need',
      'Regularly serviced machinery for smooth operation',
      'Emergency support and fast replacement response',
    ],
    subServices: [
      'Construction projects with tight deadlines',
      'Emergency maintenance or repair work',
      'Temporary industrial or warehouse operations',
      'Seasonal business demands',
    ],
    equipment: [
      'Boom lifts', 'Scissor lifts', 'Excavators',
      'Backhoe loaders', 'Air compressors', 'Diesel generators',
    ],
  },
  {
    id: 'long-term-rentals',
    title: 'Long-Term Rentals',
    description: 'Perfect for large-scale or ongoing projects requiring consistent equipment use.',
    color: 'accent',
    icon: 'CalendarRange',
    href: '/solutions/long-term-rentals',
    image: '/images/services/excavators-rental.webp',
    seoTitle: 'Long-Term Equipment Rental Dubai — GrowthLift',
    seoDescription: 'Long-term heavy equipment rental in Dubai and across the region. Months or years, maintenance included, guaranteed availability and customizable agreements.',
    longDescription: 'For businesses that require equipment for extended periods, our long-term rental plans offer a cost-effective alternative to purchasing. Secure the machinery you need for months or even years with regular maintenance and support included. Our rental agreements are tailored to fit your project duration and workload.',
    benefits: [
      'Lower cost over time than repeated short-term hire',
      'Guaranteed availability — equipment reserved for your project',
      'Hassle-free maintenance included in the agreement',
      'Access to newer models without the ownership burden',
      'Customizable rental plans tailored to your requirements',
    ],
    subServices: [
      'Large-scale construction and infrastructure projects',
      'Mining and heavy-duty industrial operations',
      'Factory or warehouse expansions',
      'Recurring seasonal operations',
    ],
    equipment: [
      'Excavators', 'Wheel loaders', 'Mining trucks',
      'Motor graders', 'Cranes', 'Power systems',
    ],
  },
  {
    id: 'operator-rentals',
    title: 'Equipment with Operator',
    description: 'Includes skilled, certified operators for safe and efficient operation.',
    color: 'primary',
    icon: 'UserCheck',
    href: '/solutions/operator-rentals',
    image: '/images/services/operators.webp',
    seoTitle: 'Equipment Rental with Operator Dubai — GrowthLift',
    seoDescription: 'Hire heavy equipment with trained, certified and insured operators in Dubai. Reduced liability, higher productivity and full compliance with site safety regulations.',
    longDescription: 'Operating heavy machinery requires experience and training to ensure safety and efficiency. Our rental service includes skilled operators who are certified to handle all types of equipment, reducing risks and maximizing productivity. This option suits businesses that do not have in-house operators, or that want to be certain the project runs smoothly.',
    benefits: [
      'Trained and certified operators experienced on heavy machinery',
      'Compliance with safety regulations and reduced accident risk',
      'Higher output — experts run the machine efficiently',
      'No operator training time or cost on your side',
      'Reduced liability: operators are insured for safe equipment use',
    ],
    subServices: [
      'Construction sites requiring expert machine handling',
      'Heavy lifting and material transportation',
      'Roadwork, excavation and demolition projects',
      'Businesses without certified in-house operators',
    ],
    equipment: [
      'Cranes', 'Excavators', 'Boom lifts',
      'Wheel loaders', 'Backhoe loaders', 'Mining trucks',
    ],
  },
  {
    id: 'dry-rentals',
    title: 'Dry Rentals (Without Operator)',
    description: 'Best for clients with their own certified operators.',
    color: 'accent',
    icon: 'KeyRound',
    href: '/solutions/dry-rentals',
    image: '/images/services/telehandler-rental.webp',
    seoTitle: 'Dry Equipment Rental Without Operator Dubai — GrowthLift',
    seoDescription: 'Dry hire of heavy equipment in Dubai for contractors with their own certified operators. Lower rental cost, full operational control and 24/7 technical support.',
    longDescription: 'For contractors and businesses with experienced in-house operators, we provide high-quality equipment without an operator. This lets you keep full control over your project while benefiting from our well-maintained machinery and technical support.',
    benefits: [
      'Lower rental cost — pay only for the equipment',
      'Full operational control with your own certified crews',
      'Wide choice of machines across all equipment families',
      'Regularly serviced machines for reliable performance',
      '24/7 technical support during the rental period',
    ],
    subServices: [
      'Contractors and businesses with in-house operators',
      'Rental companies needing extra equipment at peak times',
      'Projects with specific operator skill requirements',
      'Industries needing specialised equipment short or long term',
    ],
    equipment: [
      'Access platforms', 'Earth moving equipment', 'Air compressors',
      'Generators', 'Forklifts', 'Compactors',
    ],
  },
  {
    id: 'amc',
    title: 'Annual Maintenance Contracts',
    description: 'OEM-standard preventive maintenance programs with priority breakdown response.',
    color: 'primary',
    icon: 'ShieldCheck',
    href: '/solutions/amc',
    image: '/images/services/attachments.webp',
    seoTitle: 'Annual Maintenance Contracts (AMC) for Heavy Equipment — GrowthLift',
    seoDescription: 'AMC and preventive maintenance for access equipment and construction machinery across GCC, Asia and Africa. OEM-standard programs, inspection reports, priority response.',
    longDescription: 'GrowthLift delivers professional preventive maintenance and Annual Maintenance Contract services for access equipment and construction machinery across GCC, Asia and Africa. With a skilled technical team, structured maintenance programs and 24/7 support, we help clients reduce downtime, improve equipment safety and maximize operational efficiency — wherever the machines are working.',
    benefits: [
      'OEM-standard preventive maintenance programs',
      'Quarterly, half-yearly and annual service plans',
      'Priority breakdown response for contract holders',
      'Inspection reports and full service documentation',
      'Regional and cross-border service coordination',
    ],
    subServices: [
      'Scheduled inspections and servicing',
      'Safety checks and performance testing',
      'Lubrication, adjustments and system diagnostics',
      'Fleet-wide maintenance planning',
    ],
    equipment: [
      'Genie', 'JLG', 'Niftylift', 'Skyjack',
      'Teupen', 'Platform Basket', 'Komatsu', 'Caterpillar',
    ],
  },
  {
    id: 'repair-breakdown',
    title: 'Repair & Breakdown Support',
    description: 'On-site troubleshooting and emergency repairs that minimise downtime.',
    color: 'accent',
    icon: 'Wrench',
    href: '/solutions/repair-breakdown',
    image: '/images/services/manlift-rental.webp',
    seoTitle: 'Heavy Equipment Repair & Breakdown Support — GrowthLift',
    seoDescription: 'On-site and workshop repair for construction and access equipment. Electrical, hydraulic and mechanical repairs, emergency breakdown assistance and mobile service.',
    longDescription: 'When a machine stops, the site stops. Our service engineers troubleshoot and repair on site — electrical, hydraulic and mechanical — and escalate to the workshop when a fault needs bench work. Mobile service is available across the regions we cover, with machine pickup and delivery subject to location.',
    benefits: [
      'On-site troubleshooting and repair',
      'Electrical, hydraulic and mechanical expertise',
      'Emergency breakdown assistance to minimise downtime',
      'Workshop repairs where a fault needs bench work',
      'Machine pickup and delivery support (subject to location)',
    ],
    subServices: [
      'Mobile service support across regions',
      'Workshop repairs as required',
      'Diagnostics and fault tracing',
      'Post-repair testing and handover',
    ],
    equipment: [
      'Access platforms', 'Construction machinery', 'Air systems',
      'Power systems', 'Lifting equipment',
    ],
  },
  {
    id: 'spare-parts',
    title: 'Spare Parts Trading & Supply',
    description: 'Spare parts trading with technical service support and quality assurance.',
    color: 'primary',
    icon: 'Puzzle',
    href: '/solutions/spare-parts',
    image: '/images/services/skid-steer-rental.webp',
    seoTitle: 'Heavy Equipment Spare Parts Trading & Supply — GrowthLift',
    seoDescription: 'Spare parts trading and supply for heavy equipment, backed by technical support. Extensive inventory, quality assurance and competitive pricing from GrowthLift.',
    longDescription: 'Through Vertex Growthlift we supply spare parts for heavy equipment across industries, backed by technical service support. Our network covers sourcing, quality assurance and competitive pricing — whether you need a single critical component for an emergency replacement or an ongoing parts supply agreement.',
    benefits: [
      'Extensive inventory across equipment types',
      'Trusted trading backed by quality assurance',
      'Competitive pricing through an established network',
      'Technical advice on the right part for the machine',
      'Maintenance support alongside parts supply',
    ],
    subServices: [
      'Spare parts trading — buy and sell',
      'Emergency replacement parts',
      'Ongoing parts supply agreements',
      'Maintenance support and expert advice',
    ],
    equipment: [
      'Filters and consumables', 'Hydraulic components', 'Electrical components',
      'Undercarriage parts', 'Engine parts',
    ],
  },
  {
    id: 'equipment-trading',
    title: 'Equipment Trading',
    description: 'Buy and sell heavy equipment through an established regional network.',
    color: 'accent',
    icon: 'Handshake',
    href: '/solutions/equipment-trading',
    image: '/images/services/wheel-loader-rental.webp',
    seoTitle: 'Heavy Equipment Trading Dubai — Buy & Sell — GrowthLift',
    seoDescription: 'Heavy equipment trading from Dubai across the Middle East, Asia and Africa. Earth moving, lifting, access, air and power equipment sourced and sold with technical support.',
    longDescription: 'Alongside rental, GrowthLift trades heavy equipment across the Middle East, Asia and Africa. We source machines to specification, advise on the right model for the application, and back the sale with the same technical team that maintains our rental fleet.',
    benefits: [
      'Sourcing to specification across equipment families',
      'Regional network spanning three continents',
      'Technical advice from the team that services the machines',
      'Maintenance and parts support after the sale',
      'A single partner for trading, rental and AMC',
    ],
    subServices: [
      'Machine sourcing and procurement',
      'Sale of earth moving and lifting equipment',
      'Access platform and power system supply',
      'Trade-in and disposal support',
    ],
    equipment: [
      'Excavators', 'Cranes', 'Access platforms',
      'Air compressors', 'Generators', 'Loaders',
    ],
  },
];

/* The steps a rental actually goes through — shown on the solution detail pages. */
export const EXCAVATION_PROCESS = [
  'Enquiry',
  'Spec & Site Review',
  'Quotation',
  'Mobilization',
  'On-Site Handover',
  'Support & Maintenance',
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
    id: 'operators',
    title: 'Certified Operator Supply',
    description: 'Trained, certified and insured operators supplied with the machine.',
    icon: 'UserCheck',
    href: '/services/operators',
    image: '/images/services/operators.webp',
    seoTitle: 'Certified Heavy Equipment Operators — GrowthLift',
    seoDescription: 'Trained and certified heavy equipment operators supplied with your rental. Insured, safety-compliant and experienced across access platforms and earth moving machinery.',
    longDescription: 'Operating heavy machinery safely takes experience. Our operators are certified for the equipment they run, insured for its safe use, and briefed on site safety requirements before deployment. They arrive with the machine, so you carry neither the training cost nor the liability.',
    benefits: [
      'Certified for the specific equipment they operate',
      'Insured and responsible for safe machine use',
      'Compliance with site safety regulations',
      'Higher productivity from experienced hands',
      'No operator training cost or lead time',
    ],
  },
  {
    id: 'amc-service',
    title: 'AMC & Preventive Maintenance',
    description: 'Structured maintenance programs on quarterly, half-yearly and annual plans.',
    details: [
      'OEM-standard preventive maintenance',
      'Priority breakdown response',
      'Inspection reports and documentation',
      'Safety checks and performance testing',
    ],
    icon: 'ShieldCheck',
    href: '/services/amc-service',
    image: '/images/services/attachments.webp',
    seoTitle: 'AMC & Preventive Maintenance Services — GrowthLift',
    seoDescription: 'Annual maintenance contracts and preventive maintenance for construction and access equipment across GCC, Asia and Africa. OEM-standard programs with full documentation.',
    longDescription: 'Structured maintenance keeps machines safe, compliant and available. Our AMC programs run to OEM standards on the interval that suits your fleet, with inspection reports and service documentation you can hand to an auditor.',
    benefits: [
      'Quarterly, half-yearly and annual plans',
      'OEM-standard preventive maintenance',
      'Priority response on breakdowns',
      'Inspection reports and service records',
      'Fewer unplanned stoppages',
    ],
  },
  {
    id: 'repairs',
    title: 'Repair & Breakdown Response',
    description: 'On-site electrical, hydraulic and mechanical repair, with workshop backup.',
    icon: 'Wrench',
    href: '/services/repairs',
    image: '/images/services/manlift-rental.webp',
    seoTitle: 'Equipment Repair & Breakdown Response — GrowthLift',
    seoDescription: 'Emergency breakdown support and repair for heavy equipment. On-site diagnostics, electrical, hydraulic and mechanical repair, mobile service and workshop backup.',
    longDescription: 'Our engineers work on site first — diagnostics, electrical, hydraulic and mechanical repair — and move the machine to the workshop only when the fault requires it. Mobile service covers the regions we operate in, with pickup and delivery where location allows.',
    benefits: [
      'Emergency breakdown assistance',
      'On-site troubleshooting and repair',
      'Electrical, hydraulic and mechanical coverage',
      'Workshop repair when bench work is needed',
      'Machine pickup and delivery (subject to location)',
    ],
  },
  {
    id: 'spare-parts-service',
    title: 'Spare Parts Supply',
    description: 'Parts trading and supply backed by technical service support.',
    details: [
      'Filters and consumables',
      'Hydraulic components',
      'Electrical components',
      'Engine parts',
    ],
    icon: 'Puzzle',
    href: '/services/spare-parts-service',
    image: '/images/services/skid-steer-rental.webp',
    seoTitle: 'Heavy Equipment Spare Parts Supply — GrowthLift',
    seoDescription: 'Spare parts supply and trading for heavy equipment, with technical support. Extensive inventory, quality assurance and competitive pricing across the region.',
    longDescription: 'We supply parts for the equipment we rent, sell and service, sourcing through an established network with quality assurance and competitive pricing. Emergency replacements and ongoing supply agreements are both covered.',
    benefits: [
      'Extensive inventory across equipment types',
      'Emergency replacement sourcing',
      'Quality assurance on every component',
      'Technical advice on part selection',
      'Ongoing supply agreements available',
    ],
  },
  {
    id: 'training',
    title: 'Training Solutions',
    description: 'Operator and technical training built around the equipment you run.',
    icon: 'GraduationCap',
    href: '/services/training',
    image: '/images/services/spider-crane-rental.webp',
    seoTitle: 'Heavy Equipment Operator Training — GrowthLift',
    seoDescription: 'Operator and technical training for heavy equipment and access platforms, delivered by GrowthLift across the Middle East, Asia and Africa.',
    longDescription: 'Alongside rental and trading, GrowthLift provides training solutions so crews can operate and maintain equipment safely and productively. Training is arranged around the machines in your fleet and the regions you work in — contact us for the current programme and scheduling.',
    benefits: [
      'Training built around your own equipment',
      'Operator and technical maintenance content',
      'Delivered across the Middle East, Asia and Africa',
      'Safer crews and fewer machine-damage incidents',
      'Part of a single rental, service and training partnership',
    ],
  },
  {
    id: 'mobile-service',
    title: 'Mobile & Workshop Service',
    description: 'Service that travels to the machine, with workshop capacity behind it.',
    icon: 'Truck',
    href: '/services/mobile-service',
    image: '/images/services/dump-truck.webp',
    seoTitle: 'Mobile & Workshop Equipment Service — GrowthLift',
    seoDescription: 'Mobile service support and workshop repairs for heavy equipment across GCC, Asia and Africa, including machine pickup and delivery where location allows.',
    longDescription: 'Mobile service teams cover the regions we operate in, so routine servicing and most repairs happen where the machine is working. Where a job needs the workshop, we arrange pickup and delivery subject to location.',
    benefits: [
      'Mobile service across regions',
      'Workshop repairs as required',
      'Machine pickup and delivery support',
      'Cross-border service coordination',
      'One team for AMC, repair and maintenance',
    ],
  },
];

export const SERVICES_ADDITIONAL = [
  'Equipment sourcing to specification',
  'Fleet maintenance planning',
  'Cross-border service coordination',
  'Emergency replacement equipment',
];
