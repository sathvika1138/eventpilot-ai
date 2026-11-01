/**
 * EventPilot AI 2.0 — Pre-configured Master Event Blueprints
 * High-fidelity, CMP-certified plans for Weddings, Birthdays, Community Festivals, and Corporate Galas.
 */

const PRESET_EVENTS = [
  {
    id: 'wedding-napa',
    typology: 'Wedding',
    badgeClass: 'wedding',
    title: 'The Royal Garden Vineyard Romance',
    date: '2027-06-19',
    location: 'Meadowood Estate & Vineyards, St. Helena, Napa Valley, CA',
    guestCount: 160,
    budget: 48000,
    currency: '$',
    heroImage: 'assets/wedding.jpg',
    theme: 'Warm Tuscan Elegance, Twinkling Canopies & Garden Florals',
    aestheticPalette: [
      { name: 'Champagne Ivory', hex: '#FAF5EE' },
      { name: 'Sage Eucalyptus', hex: '#849A80' },
      { name: 'Dusty Rose', hex: '#C48D93' },
      { name: 'Antique Gold', hex: '#D4AF37' },
      { name: 'Twilight Navy', hex: '#1C2541' }
    ],
    setting: 'Hybrid (Historic Stone Courtyard + Open-Air Lawn)',
    dietary: 'Farm-to-table California cuisine, Sonoma wine pairings, dedicated plant-based and gluten-free course options',
    heroMoment: 'Twilight First Dance illuminated by a cascading fairy-light canopy and low-lying acoustic dry-ice fog',
    summary: 'A bespoke 160-guest vineyard celebration combining organic botanical splendor with Michelin-inspired wine pairing service, candlelit banquet tables, and an acoustic jazz orchestra.',
    
    budgetBreakdown: [
      { category: 'Venue & Grounds Rental', allocated: 11500, priority: 'Critical', notes: 'Includes stone courtyard, barrel cellar prep suites & lawn curfew till 11:30 PM' },
      { category: 'Catering & Sommelier Bar', allocated: 17200, priority: 'Critical', notes: '4-course plated seasonal service, artisan canapés & Sonoma vintage reserve open bar' },
      { category: 'Florals, Canopy & Atmospheric Lighting', allocated: 6800, priority: 'High', notes: 'Grand rose arch, eucalyptus garland runners, 400ft fairy canopy & taper candles' },
      { category: 'Photography & 4K Cinema Drone', allocated: 4800, priority: 'High', notes: '2 Lead shooters, 10hr coverage, drone aerials, teaser reel in 48hrs' },
      { category: 'Entertainment (String Quartet + 7pc Band)', allocated: 3800, priority: 'Medium', notes: 'Acoustic string quartet for ceremony, full funk/soul ensemble for reception' },
      { category: 'Stationery, Signage & Welcome Bags', allocated: 1100, priority: 'Flexible', notes: 'Letterpress cotton invites, acrylic calligraphy seating chart, local olive oil favors' },
      { category: 'Mandatory Contingency Reserve', allocated: 2800, priority: 'Critical', notes: 'Buffer for overtime labor, weather tenting deposit, and unexpected transport needs' }
    ],

    valueEngineering: [
      { id: 've-1', title: 'Seasonal Local Rose & Foliage Substitution', desc: 'Replace out-of-season peonies with local garden roses and Italian ruscus.', savings: 1250, active: true },
      { id: 've-2', title: 'Motion Video Digital Invites & Paperless RSVP', desc: 'Opt for bespoke interactive video invitations with printed menu keepsakes only.', savings: 600, active: false },
      { id: 've-3', title: 'Signature Wine Cocktail Hour vs Full Spirits Bar', desc: 'Feature 2 curated wine cocktails and Napa reserves during cocktail hour before opening spirits.', savings: 1600, active: true }
    ],

    vendorLedger: [
      { category: 'Venue', name: 'Meadowood Vineyard Estate', contact: 'events@meadowood.com', cost: 11500, status: 'Contract Signed', dueDate: '2026-12-15', priority: 'Critical', deliverables: 'Full estate access, bridal suites, 200 cedar cross-back chairs' },
      { category: 'Catering', name: 'Artisan Valley Culinary Group', contact: 'chef.marcus@artisanvalley.com', cost: 17200, status: 'Deposit Paid', dueDate: '2027-02-01', priority: 'Critical', deliverables: 'Tasting lock for 4 courses, sommelier wine pairing, 14 service staff' },
      { category: 'Decor', name: 'Botanica Floral & Light', contact: 'elena@botanicadesign.com', cost: 6800, status: 'Quoted', dueDate: '2027-03-10', priority: 'High', deliverables: 'Arch installation, 16 tablescapes, 400ft festoon string network' },
      { category: 'Photography', name: 'Lumière Fine Art Cinema', contact: 'studio@lumierecinema.com', cost: 4800, status: 'Contract Signed', dueDate: '2027-01-20', priority: 'High', deliverables: '10hr dual shooter, FAA drone permit, 600 edited hi-res proofs' },
      { category: 'Entertainment', name: 'Pacific Coast Groove 7-Piece', contact: 'booking@pcgmusic.com', cost: 3800, status: 'Contacted', dueDate: '2027-03-01', priority: 'Medium', deliverables: 'Ceremony acoustic PA, cocktail jazz trio, 4hr high-energy reception set' },
      { category: 'Transportation', name: 'Napa Valley Luxury Shuttles', contact: 'dispatch@napashuttle.com', cost: 1400, status: 'Sourced', dueDate: '2027-04-15', priority: 'Medium', deliverables: 'Two 32-passenger luxury executive coaches between hotel block and estate' }
    ],

    timelineRoadmap: [
      {
        phaseName: '9 to 12 Months Before',
        timeframe: 'August – November 2026',
        tasks: [
          { id: 't1', title: 'Lock venue date and execute master contract', lead: 'Couple / Planner', priority: 'Critical', completed: true },
          { id: 't2', title: 'Establish locked budget and target guest list count', lead: 'Planner', priority: 'Critical', completed: true },
          { id: 't3', title: 'Book lead photographer and videographer team', lead: 'Planner', priority: 'High', completed: true }
        ]
      },
      {
        phaseName: '6 Months Before',
        timeframe: 'December 2026',
        tasks: [
          { id: 't4', title: 'Execute catering tasting and finalize wine pairings', lead: 'Catering Lead', priority: 'Critical', completed: true },
          { id: 't5', title: 'Design floral mockup and test lighting canopy load limits', lead: 'Florist / Venue', priority: 'High', completed: false },
          { id: 't6', title: 'Issue Save-the-Date notices and launch custom wedding site', lead: 'Couple', priority: 'Medium', completed: true }
        ]
      },
      {
        phaseName: '3 Months Before',
        timeframe: 'March 2027',
        tasks: [
          { id: 't7', title: 'Send formal invitations with dietary RSVP cards', lead: 'Stationer', priority: 'Critical', completed: false },
          { id: 't8', title: 'Finalize music setlists, song cues and sound curfews', lead: 'Music Director', priority: 'High', completed: false },
          { id: 't9', title: 'Book guest shuttle buses and secure hotel block guarantees', lead: 'Transport Lead', priority: 'Medium', completed: false }
        ]
      },
      {
        phaseName: '1 Month Before',
        timeframe: 'May 2027',
        tasks: [
          { id: 't10', title: 'Lock final RSVP count and complete floor plan seating chart', lead: 'Planner', priority: 'Critical', completed: false },
          { id: 't11', title: 'Distribute minute-by-minute Run of Show to all vendors', lead: 'Lead Coordinator', priority: 'High', completed: false },
          { id: 't12', title: 'Review weather projections and confirm rain tent backup option', lead: 'Venue Lead', priority: 'High', completed: false }
        ]
      },
      {
        phaseName: 'Event Week & Day-Of',
        timeframe: 'June 17 – 19, 2027',
        tasks: [
          { id: 't13', title: 'Rehearsal walkthrough with wedding party & processional music', lead: 'Coordinator', priority: 'Critical', completed: false },
          { id: 't14', title: 'Vendor load-in & acoustic soundcheck (10:00 AM)', lead: 'Stage Manager', priority: 'Critical', completed: false },
          { id: 't15', title: 'Ceremony start & cue orchestra (4:30 PM)', lead: 'Director', priority: 'Critical', completed: false }
        ]
      }
    ],

    runOfShow: [
      { time: '10:00 AM', cue: 'Vendor Load-In & Tenting Setup', lead: 'Coordinator / Venue', avLighting: 'Work lights only, power drops to stage', notes: 'Catering kitchen setup begins in barrel room' },
      { time: '01:30 PM', cue: 'Florals & Canopy Lighting Complete', lead: 'Botanica Lead', avLighting: 'Test 2700K fairy canopy dimming', notes: 'Check all table runners and taper candle glass cylinders' },
      { time: '03:15 PM', cue: 'String Quartet Sound Check', lead: 'Sound Engineer', avLighting: 'Wireless lapel test for officiant', notes: 'Acoustic levels checked in courtyard' },
      { time: '04:00 PM', cue: 'Guest Arrival & Welcome Spritzers', lead: 'Hospitality Team', avLighting: 'Ambient courtyard audio, warm ambient glow', notes: 'Chilled sparkling rosé and herb-infused mocktails' },
      { time: '04:30 PM', cue: 'Ceremony Processional Begins', lead: 'Lead Coordinator', avLighting: 'Canon in D live strings, lapel mic active', notes: 'Bridal entrance at 04:36 PM sharp' },
      { time: '05:15 PM', cue: 'Cocktail Hour & Golden Hour Portraits', lead: 'Photo Lead / Bar', avLighting: 'Upbeat jazz trio, 3000K patio lighting', notes: 'Passed canapés: truffle arancini & ahi tuna crisps' },
      { time: '06:45 PM', cue: 'Grand Entrance & Twilight First Dance', lead: 'Emcee & 7pc Band', avLighting: 'Full fairy canopy illuminate + dry-ice fog effect', notes: 'Hero Moment — photo/video positioned at perimeter' },
      { time: '07:15 PM', cue: 'Plated Dinner Service & Speeches', lead: 'Catering Lead / MC', avLighting: 'Warm candlelight, spotlight on speaker podium', notes: 'Best Man and Maid of Honor speeches during dessert' },
      { time: '08:45 PM', cue: 'Dance Floor Opens (High Energy)', lead: 'Pacific Coast Band', avLighting: 'Dynamic moving beam lights, warm perimeter wash', notes: 'Band 90-minute dance set' },
      { time: '11:15 PM', cue: 'Grand Sparkler Send-Off & Departure', lead: 'Coordinator', avLighting: 'Sparkler aisle exterior lit, coach engines running', notes: 'Safety buckets on standby; guest shuttles depart at 11:30 PM' }
    ],

    sensoryIdeas: [
      {
        title: 'Signature Napa Cocktail: "Vineyard Whisper"',
        icon: 'cocktail',
        category: 'Mixology',
        desc: 'Napa sparkling blanc de blancs, elderflower liqueur, crushed fresh blackberries, and fresh rosemary sprig flamed for aroma.',
        tags: ['Signature Drink', 'Floral', 'Zero-Proof Version Available']
      },
      {
        title: 'Sensory Olive Oil & Wine Tasting Station',
        icon: 'wine',
        category: 'Interactive Experience',
        desc: 'Interactive table hosted by an estate sommelier with warm artisanal sourdough, single-estate cold pressed oils, and aged balsamic flights.',
        tags: ['Gourmet', 'Interactive', 'Artisan']
      },
      {
        title: 'Bespoke Vintage Audio Guestbook',
        icon: 'phone',
        category: 'Guest Memory',
        desc: 'A restored 1950s rotary telephone in ivory where guests pick up the receiver to leave heartfelt voicemail messages recorded onto vinyl.',
        tags: ['Keepsake', 'Nostalgic', 'Crowd Favorite']
      },
      {
        title: 'Midnight Churros & Lavender Gelato Cart',
        icon: 'dessert',
        category: 'Late Night Fuel',
        desc: 'Live artisan churro station dusting cinnamon sugar served with dipping dark chocolate and lavender-honey gelato scoops.',
        tags: ['Late Night', 'Comfort Food', 'Surprise Reveal']
      }
    ],

    guestMatrix: {
      confirmed: 142,
      pending: 12,
      declined: 6,
      dietaryStats: {
        'Standard': 108,
        'Plant-Based (Vegan)': 18,
        'Gluten-Free': 11,
        'Nut Allergy': 5
      },
      tables: [
        { name: 'Table 1 — Head Table', seats: 12, vip: true, dietary: '1 Vegan, 1 GF' },
        { name: 'Table 2 — Parents & Family', seats: 10, vip: true, dietary: 'All Standard' },
        { name: 'Table 3 — College Friends', seats: 10, vip: false, dietary: '2 Vegan' },
        { name: 'Table 4 — West Coast Crew', seats: 10, vip: false, dietary: '1 Nut Allergy' },
        { name: 'Table 5 — Vineyard Terrace', seats: 10, vip: false, dietary: '2 GF' }
      ]
    },

    riskMatrix: [
      {
        domain: 'Weather & Heat',
        severity: 'High',
        levelClass: 'high-risk',
        trigger: 'Forecast exceeds 92°F (33°C) or >30% precipitation chance',
        action: 'Activate 48-hour rental tenting clause with Meadowood; deploy 4 commercial misting fans and hydration water stations for ceremony lawn.'
      },
      {
        domain: 'Vendor Load-In Delays',
        severity: 'Medium',
        levelClass: 'med-risk',
        trigger: 'Florals or lighting team delayed beyond 1:00 PM',
        action: 'Coordinator re-routes photo team to olive grove for pre-ceremony portraits while venue staff assists florist with table greenery.'
      },
      {
        domain: 'Sound Curfew Compliance',
        severity: 'High',
        levelClass: 'high-risk',
        trigger: 'Clock hits 10:45 PM (Napa County strict 11:00 PM sound ordinance)',
        action: 'Transition outdoor amplification to acoustic sets; move remaining high-energy dancing into sound-insulated historic stone cellar.'
      },
      {
        domain: 'Transport Congestion',
        severity: 'Low',
        levelClass: 'low-risk',
        trigger: 'Highway 29 harvest traffic delays shuttles',
        action: 'Shuttles dispatched 30 mins ahead of schedule with highway patrol detour route pre-loaded onto driver GPS.'
      }
    ]
  },

  {
    id: 'birthday-neon',
    typology: 'Milestone Birthday',
    badgeClass: 'birthday',
    title: "Eliza's 30th Neon Horizon Celebration",
    date: '2027-04-18',
    location: 'The Skyline Penthouse & Rooftop Lounge, Downtown Austin, TX',
    guestCount: 85,
    budget: 14500,
    currency: '$',
    heroImage: 'assets/birthday.jpg',
    theme: 'Modern Cyberpunk Lounge with Velvet, Neon & Artisan Mixology',
    aestheticPalette: [
      { name: 'Neon Fuchsia', hex: '#EC4899' },
      { name: 'Cyan Electric', hex: '#06B6D4' },
      { name: 'Obsidian Velvet', hex: '#0F172A' },
      { name: 'Chrome Silver', hex: '#E2E8F0' },
      { name: 'Amethyst Purple', hex: '#8B5CF6' }
    ],
    setting: 'Hybrid (Indoor Penthouse Lounge + Open-Air Terrace)',
    dietary: 'Gourmet cocktail stations, Asian fusion small plates, bespoke zero-proof craft bar, vegan/GF tagged',
    heroMoment: 'Custom glowing neon photo arch backdrop reveal with celebratory champagne tower pouring at 09:30 PM',
    summary: 'A high-energy, visually magnetic 30th birthday takeover on a private Austin skyscraper rooftop featuring bespoke cocktail mixologists, custom neon art, a live house DJ with electric violin, and midnight sliders.',

    budgetBreakdown: [
      { category: 'Penthouse Venue & Skyline Terrace', allocated: 4200, priority: 'Critical', notes: 'Private penthouse rental 6:00 PM – 2:00 AM including staff and security' },
      { category: 'Craft Bar & Fusion Tapas Catering', allocated: 4800, priority: 'Critical', notes: '2 Flair mixologists, top-shelf spirits, bao buns, wagyu skewers, vegan dim sum' },
      { category: 'Custom Neon Signage & Lounge Decor', allocated: 1900, priority: 'High', notes: 'Custom "Happy 30th Eliza" neon installation, velvet lounge vignettes, floral towers' },
      { category: 'DJ & Electric Violin Duo', allocated: 1600, priority: 'High', notes: '4hr live set with ambient deep house transitioning to dance club set' },
      { category: 'Cinematic Flash & Retro Photo Booth', allocated: 950, priority: 'Medium', notes: 'Unlimited instant prints with digital gallery and neon prop package' },
      { category: 'Late-Night Gourmet Sliders & Cake', allocated: 550, priority: 'Medium', notes: 'Custom 2-tier metallic geometric cake + 100 warm brioche sliders' },
      { category: 'Contingency & Tip Reserve', allocated: 500, priority: 'Critical', notes: 'Overtime buffer and service gratuities' }
    ],

    valueEngineering: [
      { id: 've-b1', title: 'Curated 3-Drink Signature Menu vs Full Premium Bar', desc: 'Focus alcohol budget on 3 high-end signature cocktails + draft beer & prosecco.', savings: 950, active: true },
      { id: 've-b2', title: 'Rental Neon Sign with Custom Decal vs Full Custom Fabrication', desc: 'Use premium acrylic frame with custom vinyl script rather than $1k neon forge.', savings: 450, active: true },
      { id: 've-b3', title: 'Digital Motion Video Invites via Partiful', desc: 'Sleek animated mobile invitations with built-in Spotify playlist integration.', savings: 250, active: true }
    ],

    vendorLedger: [
      { category: 'Venue', name: 'Skyline Austin Penthouse', contact: 'booking@skylineaustin.com', cost: 4200, status: 'Contract Signed', dueDate: '2027-02-10', priority: 'Critical', deliverables: 'Exclusive 8hr rooftop access, furniture setup, sound limit waiver' },
      { category: 'Catering', name: 'Nomad Cocktail Collective', contact: 'drinks@nomadaustin.com', cost: 4800, status: 'Deposit Paid', dueDate: '2027-03-01', priority: 'Critical', deliverables: '2 mixologists, custom bar menu, 3 passed savory rounds' },
      { category: 'Decor', name: 'Electric Aura Studio', contact: 'hello@electricauradesign.com', cost: 1900, status: 'Contract Signed', dueDate: '2027-03-15', priority: 'High', deliverables: 'Neon installation, violet backlighting, 2 emerald velvet seating vignettes' },
      { category: 'Entertainment', name: 'DJ Kinetik & Violinist Ray', contact: 'mgmt@kinetiksound.com', cost: 1600, status: 'Deposit Paid', dueDate: '2027-03-20', priority: 'High', deliverables: 'Sound system, moving head lights, 4hr live synchronized duo performance' },
      { category: 'Photography', name: 'Flash & Gloss Visuals', contact: 'shoot@flashandgloss.com', cost: 950, status: 'Quoted', dueDate: '2027-04-01', priority: 'Medium', deliverables: '3hr roaming photographer + modern glam photo booth with instant SMS sharing' }
    ],

    timelineRoadmap: [
      {
        phaseName: '8 Weeks Before',
        timeframe: 'February 2027',
        tasks: [
          { id: 'tb1', title: 'Sign rooftop penthouse contract and pay deposit', lead: 'Host', priority: 'Critical', completed: true },
          { id: 'tb2', title: 'Design and approve custom "Happy 30th Eliza" neon design', lead: 'Decorator', priority: 'High', completed: true },
          { id: 'tb3', title: 'Create digital RSVP landing page & send initial invite blast', lead: 'Host', priority: 'High', completed: true }
        ]
      },
      {
        phaseName: '4 Weeks Before',
        timeframe: 'March 2027',
        tasks: [
          { id: 'tb4', title: 'Finalize signature cocktail tasting menu and zero-proof option', lead: 'Caterer', priority: 'Critical', completed: false },
          { id: 'tb5', title: 'Share curated Spotify music inspiration playlist with DJ', lead: 'Host', priority: 'Medium', completed: false },
          { id: 'tb6', title: 'Order custom geometric cake and late-night slider delivery', lead: 'Host', priority: 'Medium', completed: false }
        ]
      },
      {
        phaseName: '1 Week Before & Party Night',
        timeframe: 'April 12 – 18, 2027',
        tasks: [
          { id: 'tb7', title: 'Confirm final headcount (85) with bar and caterer', lead: 'Host', priority: 'Critical', completed: false },
          { id: 'tb8', title: 'Setup neon photo wall and test sound levels on terrace (5:00 PM)', lead: 'DJ / Decor', priority: 'Critical', completed: false },
          { id: 'tb9', title: 'Doors open & welcome champagne pour (7:30 PM)', lead: 'Host', priority: 'High', completed: false }
        ]
      }
    ],

    runOfShow: [
      { time: '05:00 PM', cue: 'Vendor Access & Rooftop Audio Setup', lead: 'Venue Manager', avLighting: 'Ambient terrace wash, test subwoofers', notes: 'Bar supplies loaded via service elevator' },
      { time: '06:30 PM', cue: 'Neon Arch & Lighting Cue Check', lead: 'Electric Aura', avLighting: 'Neon pink & cyan backlights on', notes: 'Ensure photo booth prints Eliza logo branding' },
      { time: '07:30 PM', cue: 'Doors Open — Ambient Deep House', lead: 'DJ Kinetik', avLighting: 'Mood lighting: Dim 30% ambient cyan wash', notes: 'Welcome cocktail passed: "Electric Neon 30"' },
      { time: '08:30 PM', cue: 'Electric Violin Live Accompaniment Begins', lead: 'Violinist Ray', avLighting: 'Spotlight on DJ booth, pulse beam lighting', notes: 'Crowd builds; savory bao buns and sliders served' },
      { time: '09:30 PM', cue: 'Hero Moment: Champagne Tower & Toast', lead: 'Host & Emcee', avLighting: 'Spotlight on bar, gold burst uplighting', notes: '3-tier coupe glass tower poured; birthday toast' },
      { time: '09:45 PM', cue: 'Cake Cutting & Dance Floor Ignition', lead: 'DJ & Lead', avLighting: 'High-energy club lights, haze machine activated', notes: 'Surprise dessert reveal with cold sparklers' },
      { time: '11:45 PM', cue: 'Midnight Truffle Sliders Served', lead: 'Catering Lead', avLighting: 'Warm amber glow, upbeat disco house', notes: 'Midnight comfort food keeps energy high' },
      { time: '01:30 AM', cue: 'Last Call for Drinks', lead: 'Bar Manager', avLighting: 'Gentle house lights fade up', notes: 'Wrap up photo booth; ride-share area directed' }
    ],

    sensoryIdeas: [
      {
        title: 'Hero Cocktail: "Neon Horizons 30"',
        icon: 'cocktail',
        category: 'Signature Mixology',
        desc: 'Empress 1908 indigo gin, yuzu liqueur, sparkling elderflower tonic, served over a hand-carved clear ice block with an edible electric flower.',
        tags: ['Color-Changing', 'Instagrammable', 'Craft Spirits']
      },
      {
        title: 'Retro Flash Glam Photo Lounge',
        icon: 'camera',
        category: 'Interactive Media',
        desc: 'High-contrast black-and-white celebrity skin-smoothing filter with neon acrylic props and instant AirDrop / SMS sharing station.',
        tags: ['Viral Content', 'High Contrast', 'Instant Gratification']
      },
      {
        title: 'Glow-in-the-Dark Custom Mocktail Lab',
        icon: 'sparkles',
        category: 'Zero-Proof Experience',
        desc: 'Tonic & butterfly pea flower spritzers that naturally glow vivid ultraviolet under blacklight, topped with dry ice smoke vapor.',
        tags: ['Zero-Proof', 'Sensory Shock', 'Inclusive']
      },
      {
        title: 'Midnight Mini Donut & Truffle Fry Pass',
        icon: 'dessert',
        category: 'Late Night Indulgence',
        desc: 'Piping hot cinnamon sugar mini donuts paired with paper cones of parmesan-truffle fries and garlic aioli at 11:30 PM.',
        tags: ['Savory & Sweet', 'Energy Boost', 'Party Classic']
      }
    ],

    guestMatrix: {
      confirmed: 78,
      pending: 5,
      declined: 2,
      dietaryStats: {
        'Standard': 56,
        'Vegetarian / Vegan': 14,
        'Gluten-Free': 6,
        'Dairy-Free': 2
      },
      tables: [
        { name: 'VIP Skyline Lounge V1', seats: 10, vip: true, dietary: 'Bottle Service & Vegan Tapas' },
        { name: 'Neon Terrace Booth A', seats: 8, vip: false, dietary: 'Mixed Cocktail Plates' },
        { name: 'Neon Terrace Booth B', seats: 8, vip: false, dietary: 'Mixed Cocktail Plates' },
        { name: 'Main Bar Social High-Tops', seats: 24, vip: false, dietary: 'Free-flow standing social' }
      ]
    },

    riskMatrix: [
      {
        domain: 'Terrace High Winds / Rain',
        severity: 'High',
        levelClass: 'high-risk',
        trigger: 'Wind gusts exceed 25mph or rain starts on open-air rooftop',
        action: 'Transition bar and lounge furniture inside the enclosed 2,400 sq.ft. panoramic glass penthouse; close motorized terrace storm glass.'
      },
      {
        domain: 'Elevator Bottleneck',
        severity: 'Medium',
        levelClass: 'med-risk',
        trigger: 'Lines form in lobby at 08:00 PM peak arrival',
        action: 'Station concierge in lobby with guest list wristbands and keycard express elevator access directly to 28th floor.'
      },
      {
        domain: 'Noise Complaints from Neighbors',
        severity: 'Low',
        levelClass: 'low-risk',
        trigger: 'Decibel meter exceeds 82dB on terrace after 10:30 PM',
        action: 'Direct sound monitors to angle inward toward interior wall; shift heavy bass frequencies to interior subwoofer arrays.'
      }
    ]
  },

  {
    id: 'community-festival',
    typology: 'Community Festival',
    badgeClass: 'community',
    title: 'Solstice Harvest & Artisan Fair',
    date: '2027-09-25',
    location: 'Highland Park Botanical Grounds & Meadow, Denver, CO',
    guestCount: 450,
    budget: 22000,
    currency: '$',
    heroImage: 'assets/community.jpg',
    theme: 'Eco-Friendly Autumn Harvest, Craft Food Trucks & Live Acoustic Roots',
    aestheticPalette: [
      { name: 'Harvest Ochre', hex: '#D97706' },
      { name: 'Forest Moss', hex: '#15803D' },
      { name: 'Terra Cotta', hex: '#C2410C' },
      { name: 'Natural Burlap', hex: '#D6C7A1' },
      { name: 'Slate Sky', hex: '#475569' }
    ],
    setting: 'Open-Air Garden Meadow & Wooden Pavilion',
    dietary: 'Zero-waste local food trucks, cider press station, allergy-safe kids snack corral, compostable packaging',
    heroMoment: 'Sunset Community Lantern Lighting Ceremony and live bluegrass stomp around the central bonfire ring',
    summary: 'A family-inclusive 450-person community celebration uniting 8 local gourmet food trucks, artisan craft market stalls, face painting, interactive apple pressing, and an outdoor acoustic stage.',

    budgetBreakdown: [
      { category: 'Park Permits, Sanitation & Security', allocated: 4500, priority: 'Critical', notes: 'City park permits, EMT medical standby, port-a-potty sanitation bank, waste recycling' },
      { category: 'Acoustic Stage, PA & Generator Power', allocated: 5200, priority: 'Critical', notes: 'Covered mobile stage, line array sound, silent eco-diesel generators, lighting towers' },
      { category: 'Artisan Stalls & Pavilion Infrastructure', allocated: 3800, priority: 'High', notes: '25 Wooden booth frames, festoon fest lighting, 40 picnic tables and burlap umbrellas' },
      { category: 'Musical Acts (3 Local Bands + Emcee)', allocated: 3200, priority: 'High', notes: 'Bluegrass quintet, folk trio, indie singer-songwriter, community youth choir' },
      { category: 'Family Activations & Craft Workshops', allocated: 2100, priority: 'Medium', notes: 'Pumpkin decorating, cider press supplies, face painters, lawn games' },
      { category: 'Signage, Wayfinding & Safety Badges', allocated: 1200, priority: 'Medium', notes: 'Recycled wood directional signage, wristbands, festival maps' },
      { category: 'Emergency Reserve', allocated: 2000, priority: 'Critical', notes: 'Weather covering, unexpected park utility fees, extra volunteer hydration' }
    ],

    valueEngineering: [
      { id: 've-c1', title: 'Food Truck Revenue Share Partnership', desc: 'Allow trucks to trade small vendor fee for festival marketing rather than paid catering guarantee.', savings: 1800, active: true },
      { id: 've-c2', title: 'Community Volunteer Stage Hand Program', desc: 'Recruit local university audio students with internship credit for stage management.', savings: 800, active: true },
      { id: 've-c3', title: 'Solar Powered Festoon Light Strings', desc: 'Utilize high-efficiency solar battery lanterns rather than renting two extra gas generators.', savings: 650, active: true }
    ],

    vendorLedger: [
      { category: 'Venue', name: 'Denver Parks & Recreation Dept', contact: 'permits@denvergov.org', cost: 4500, status: 'Contract Signed', dueDate: '2027-01-15', priority: 'Critical', deliverables: 'Park master permit, amplified sound permit, trash & recycling agreement' },
      { category: 'Production', name: 'Mile High Sound & Staging', contact: 'production@milehighaudio.com', cost: 5200, status: 'Contract Signed', dueDate: '2027-04-01', priority: 'Critical', deliverables: '24x16 covered trailer stage, 4 wireless mics, digital mixer, sound engineer' },
      { category: 'Decor', name: 'Timber & String Event Rentals', contact: 'info@timberandstring.com', cost: 3800, status: 'Deposit Paid', dueDate: '2027-05-10', priority: 'High', deliverables: '25 wooden market kiosks, 40 picnic benches, 800ft festival festoon cable' },
      { category: 'Entertainment', name: 'Rocky Mountain Folk Collective', contact: 'booking@rmfolk.org', cost: 3200, status: 'Contacted', dueDate: '2027-06-01', priority: 'High', deliverables: 'Full day continuous music schedule from 1:00 PM to 8:30 PM' }
    ],

    timelineRoadmap: [
      {
        phaseName: '6 Months Before',
        timeframe: 'March 2027',
        tasks: [
          { id: 'tc1', title: 'Submit park permit application and pay city bond deposit', lead: 'Festival Director', priority: 'Critical', completed: true },
          { id: 'tc2', title: 'Open vendor application portal for 25 local artisan stalls', lead: 'Vendor Coordinator', priority: 'High', completed: true }
        ]
      },
      {
        phaseName: '3 Months Before',
        timeframe: 'June 2027',
        tasks: [
          { id: 'tc3', title: 'Lock food truck lineup (8 trucks) with health inspections', lead: 'Food Lead', priority: 'Critical', completed: false },
          { id: 'tc4', title: 'Contract stage, sound and eco-generator provider', lead: 'Production Lead', priority: 'Critical', completed: false }
        ]
      },
      {
        phaseName: 'Festival Week',
        timeframe: 'September 20 – 25, 2027',
        tasks: [
          { id: 'tc5', title: 'Mark booth boundaries on meadow grass with chalk lines', lead: 'Site Ops', priority: 'High', completed: false },
          { id: 'tc6', title: 'Health department food truck inspection walkthrough (10:00 AM)', lead: 'Safety Officer', priority: 'Critical', completed: false },
          { id: 'tc7', title: 'Open festival gates to community (12:00 PM)', lead: 'Director', priority: 'Critical', completed: false }
        ]
      }
    ],

    runOfShow: [
      { time: '08:00 AM', cue: 'Production & Stage Ingress', lead: 'Stage Manager', avLighting: 'Silent generator power on, audio test', notes: 'Heavy trucks restricted to paved park access roads' },
      { time: '09:30 AM', cue: 'Artisan & Food Truck Setup', lead: 'Vendor Captain', avLighting: 'Ground power distribution active', notes: 'Check all fire extinguishers on food trucks' },
      { time: '12:00 PM', cue: 'Gates Open & Opening Acoustic Set', lead: 'Emcee', avLighting: 'Natural sunlight, crisp vocal reinforcement', notes: 'Cider press and pumpkin workshops commence' },
      { time: '02:30 PM', cue: 'Youth Folk Choir Performance', lead: 'Choir Director', avLighting: 'Choir condenser mics active', notes: 'Parents gathering at stage meadow' },
      { time: '04:30 PM', cue: 'Rocky Mountain Folk Quintet Headline', lead: 'Music Lead', avLighting: 'Warm stage wash, golden hour glow', notes: 'Peak festival attendance' },
      { time: '06:45 PM', cue: 'Hero Moment: Sunset Lantern Procession', lead: 'Community Lead', avLighting: 'Festoon strings illuminate, stage dimmed 50%', notes: 'Handcrafted paper lanterns lit; crowd sings along' },
      { time: '07:30 PM', cue: 'Bonfire Acoustic Jam & Cider Bar', lead: 'Campfire Host', avLighting: 'Bonfire embers & festoon glow', notes: 'Acoustic guitar in the round' },
      { time: '08:45 PM', cue: 'Festival Close & Egress', lead: 'Security / Ops', avLighting: 'High-visibility flood lights along exit pathways', notes: 'Eco-cleanup crew begins zero-waste sorting' }
    ],

    sensoryIdeas: [
      {
        title: 'Community Apple Press & Cider Station',
        icon: 'cider',
        category: 'Interactive DIY',
        desc: 'Traditional hand-crank wooden cider press where families press local Palisade apples into fresh, sweet autumn cider.',
        tags: ['Family Friendly', 'Agricultural', 'Zero Sugar Added']
      },
      {
        title: 'Solar Paper Lantern Crafting Lab',
        icon: 'lantern',
        category: 'Art Activation',
        desc: 'Recycled kraft paper and willow branch lanterns fitted with solar tea lights, decorated with autumn leaves and pressed florals.',
        tags: ['Eco-Friendly', 'Keepsake', 'Community Art']
      },
      {
        title: 'Campfire Acoustic Storytelling Ring',
        icon: 'fire',
        category: 'Acoustic Soundscape',
        desc: 'Hay bale amphitheater surrounding a contained stone fire pit with local storytellers sharing Colorado folklore.',
        tags: ['Cozy', 'All Ages', 'Ambient']
      }
    ],

    guestMatrix: {
      confirmed: 410,
      pending: 40,
      declined: 0,
      dietaryStats: {
        'Omnivore Trucks': 280,
        'Plant-Based Vegan Trucks': 90,
        'Gluten-Free Designated': 40
      },
      tables: [
        { name: 'Picnic Cluster Meadow A', seats: 80, vip: false, dietary: 'Shaded Pine Groves' },
        { name: 'Picnic Cluster Meadow B', seats: 80, vip: false, dietary: 'Stage Lawn Open Air' },
        { name: 'Pavilion Covered Benches', seats: 120, vip: false, dietary: 'Rain-Covered Seating' },
        { name: 'Family Activity Meadow', seats: 60, vip: false, dietary: 'Adjacent to Kids Craft Area' }
      ]
    },

    riskMatrix: [
      {
        domain: 'Rocky Mountain Thunderstorms',
        severity: 'High',
        levelClass: 'high-risk',
        trigger: 'Lightning detector records strike within 10 miles or wind > 35mph',
        action: 'Immediately pause stage performance; guide attendees into permanent brick park pavilion; drop mobile stage roof to safety height.'
      },
      {
        domain: 'Food Truck Power Tripping',
        severity: 'Medium',
        levelClass: 'med-risk',
        trigger: 'Breaker trip on commercial fryer circuits',
        action: 'Backup secondary 40kVA generator on standby with dedicated breakout distribution spider boxes.'
      },
      {
        domain: 'Parking & Meadow Traffic Overfill',
        severity: 'Medium',
        levelClass: 'med-risk',
        trigger: 'Park main lot reaches 90% capacity by 01:00 PM',
        action: 'Deploy volunteer marshals with orange wands to redirect vehicles to high school satellite lot with free 5-minute shuttle van.'
      }
    ]
  }
];
