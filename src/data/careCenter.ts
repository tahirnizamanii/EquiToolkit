export interface SeasonalGuide {
  id: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  title: string;
  emoji: string;
  summary: string;
  checklist: string[];
  tips: { title: string; description: string }[];
  relatedCalculators: { name: string; path: string }[];
}

export interface TimelineMilestone {
  time: string;
  title: string;
  description: string;
  isImportant?: boolean;
}

export interface Timeline {
  id: string;
  name: string;
  emoji: string;
  description: string;
  milestones: TimelineMilestone[];
}

export const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    id: 'spring',
    season: 'Spring',
    title: 'Spring Horse Care Guide',
    emoji: '🌱',
    summary: 'Spring brings warmer weather and lush green grass, but also rapid changes in nutrition and health risks. It is the peak season for parasite management, vaccinations, and limiting starch/sugar overload to prevent laminitis.',
    checklist: [
      'Schedule annual spring veterinary wellness exams and core vaccinations.',
      'Perform a fecal egg count (FEC) before deworming to target specific parasites.',
      'Begin pasture turnout gradually, starting with only 15–20 minutes per day.',
      'Thoroughly groom and inspect skin for rain rot, mud fever, or sweet itch as coats shed.'
    ],
    tips: [
      {
        title: 'Manage Pasture Access',
        description: 'Spring grass is loaded with non-structural carbohydrates (NSC), which can trigger laminitis or founder. Use grazing muzzles or restrict turnout to dry lots during early spring growth.'
      },
      {
        title: 'Core Vaccination Time',
        description: 'Administer spring core vaccines—Tetanus, Eastern/Western Equine Encephalomyelitis, West Nile Virus, and Rabies—before mosquito populations multiply.'
      }
    ],
    relatedCalculators: [
      { name: 'Deworming & Parasite Guide', path: '/deworming-schedule' },
      { name: 'Pasture Size Calculator', path: '/pasture-size-calculator' }
    ]
  },
  {
    id: 'summer',
    season: 'Summer',
    title: 'Summer Horse Care Guide',
    emoji: '☀️',
    summary: 'Summer care focuses on managing high temperatures, maintaining hydration, and mitigating biting flies, mosquitoes, and sweet-itch-inducing midges.',
    checklist: [
      'Ensure 24/7 access to fresh, cool water and plain white salt blocks.',
      'Apply high-potency fly spray or put on lightweight fly sheets/masks.',
      'Exercise horses during cooler hours (early morning or late evening).',
      'Provide well-ventilated run-in shelters or indoor stalls with high-velocity fans.'
    ],
    tips: [
      {
        title: 'Monitor Hydration',
        description: 'An average horse needs 10 to 15 gallons of water daily, which can double in hot weather. Pinch the skin on the neck; if it takes longer than 2 seconds to snap back, your horse is dehydrated.'
      },
      {
        title: 'Beat the Bugs',
        description: 'Flies, midges, and mosquitoes spread disease and cause allergies. Keep dung cleared, spray pastures, and use breathable fly armor to keep horses comfortable.'
      }
    ],
    relatedCalculators: [
      { name: 'Water Intake Estimator', path: '/water-intake-calculator' },
      { name: 'Show & Travel Checklist', path: '/show-checklist' }
    ]
  },
  {
    id: 'autumn',
    season: 'Autumn',
    title: 'Autumn Horse Care Guide',
    emoji: '🍂',
    summary: 'Autumn is a transitional period to prepare your horse for cold weather, evaluate body weight, check teeth, and transition pasture grass safely.',
    checklist: [
      'Evaluate your horse\'s Body Condition Score (BCS) to ensure they have adequate fat reserves.',
      'Schedule a semi-annual farrier visit and check for strong hoof walls.',
      'Clean, inspect, and repair winter blankets before temperatures drop.',
      'Perform a fall fecal egg count and deworm for tapeworms after the first hard frost.'
    ],
    tips: [
      {
        title: 'Beware of Fall Pasture Spikes',
        description: 'Cool fall nights followed by sunny days cause grass to store high amounts of sugars (fructans), mimicking spring laminitis risks. Continue using muzzles on prone horses.'
      },
      {
        title: 'Assess Weight and Teeth',
        description: 'Older horses struggle to chew coarse winter hay. Get teeth floated now to prevent weight loss and impaction colics from unchewed winter forage.'
      }
    ],
    relatedCalculators: [
      { name: 'Body Condition Scorer', path: '/body-condition-scorer' },
      { name: 'Blanketing & Rugging Guide', path: '/blanketing-guide' }
    ]
  },
  {
    id: 'winter',
    season: 'Winter',
    title: 'Winter Horse Care Guide',
    emoji: '❄️',
    summary: 'Winter care is centered on preventing dehydration colics, maintaining core body heat through quality forage digestion, and managing frozen or muddy footing.',
    checklist: [
      'Check water heaters or stock tank de-icers daily to ensure water is not frozen.',
      'Increase hay rations—the fermentation of fiber in the hindgut is a horse\'s primary furnace.',
      'Check under blankets weekly to monitor body condition and skin health.',
      'Provide mud management near gates and run-in sheds to prevent scratches (mud fever).'
    ],
    tips: [
      {
        title: 'Heated Water is Crucial',
        description: 'Horses drink up to 40% less water when it is freezing, leading to a massive spike in impaction colic. Ensure drinking water is maintained between 45°F and 65°F.'
      },
      {
        title: 'Forage is the Best Heater',
        description: 'Feeding extra grain does not keep a horse warm; feeding extra high-fiber hay does. Digesting fiber produces significant metabolic heat inside the cecum.'
      }
    ],
    relatedCalculators: [
      { name: 'Blanketing & Rugging Guide', path: '/blanketing-guide' },
      { name: 'Feed Cost & Intake Calculator', path: '/feed-cost-calculator' }
    ]
  }
];

export const TIMELINES: Timeline[] = [
  {
    id: 'mare-pregnancy',
    name: 'Mare Pregnancy Timeline',
    emoji: '🐴🤰',
    description: 'An 11-month (approximately 340 days) visualization of a mare\'s gestation cycle, highlighting critical medical, dietary, and management milestones.',
    milestones: [
      { time: 'Day 14–16', title: 'First Ultrasound Scan', description: 'Confirm pregnancy and check for twins. If twins are present, the vet must pinch one to ensure a safe singleton pregnancy.', isImportant: true },
      { time: 'Day 28–30', title: 'Heartbeat Check', description: 'An ultrasound is performed to confirm a strong fetal heartbeat and healthy attachment.' },
      { time: 'Day 45', title: 'End of Early Embryonic Period', description: 'Gestation becomes stable; the risk of early embryonic loss drops significantly.' },
      { time: 'Month 5', title: 'Equine Rhinopneumonitis (EHV-1) Vaccine', description: 'Administer the first of three EHV-1 vaccinations to prevent virus-induced abortion.', isImportant: true },
      { time: 'Month 7', title: 'Second EHV-1 Vaccine', description: 'Administer the second EHV-1 booster dose.' },
      { time: 'Month 9', title: 'Third EHV-1 Vaccine & Feed Adjustments', description: 'Administer the final EHV-1 booster. Begin increasing the mare\'s energy and protein intake, as the foal grows rapidly in the last trimester.' },
      { time: 'Month 10', title: 'Pre-Foaling Vaccines', description: 'Administer Rabies, Tetanus, and Encephalitis vaccines to ensure high levels of protective antibodies are passed to the foal via colostrum (first milk).', isImportant: true },
      { time: 'Day 310', title: 'Move to Foaling Stall', description: 'Introduce the mare to her designated, clean, deeply straw-bedded foaling stall to allow her body to build antibodies to the local stall flora.' },
      { time: 'Day 335–345', title: 'Expected Foaling Date', description: 'Monitor closely (waxing of teats, dripping milk). Be present for delivery and ensure the "1-2-3 rule" is met: Foal stands in 1 hour, nurses in 2 hours, mare passes placenta in 3 hours.', isImportant: true }
    ]
  },
  {
    id: 'deworming',
    name: 'Strategic Deworming Timeline',
    emoji: '🪱',
    description: 'A modern, vet-approved strategic deworming schedule designed to prevent parasite chemical resistance by targeting specific worms seasonally based on Fecal Egg Counts.',
    milestones: [
      { time: 'Early Spring', title: 'Fecal Egg Count (FEC)', description: 'Collect a fresh manure sample and have your vet run an FEC. If egg count is high (>200 epg), deworm with Ivermectin.', isImportant: true },
      { time: 'Late Spring', title: 'Targeted Tapeworm Treatment', description: 'Deworm with Ivermectin + Praziquantel to target tapeworms that emerge after horses begin grazing spring pasture.' },
      { time: 'Summer', title: 'Pasture Management', description: 'Do not deworm routinely during hot summer months (extreme heat kills worm larvae on pastures). Harrow pastures only on hot, sunny days to bake larvae.' },
      { time: 'Early Autumn', title: 'Post-Frost Deworming', description: 'Wait until the first hard frost kills active pasture flies, then deworm with Moxidectin + Praziquantel to target bots, encysted small strongyles, and tapeworms.', isImportant: true },
      { time: 'Winter', title: 'Refugia & Monitoring', description: 'Monitor body weight and general skin health. Avoid deworming in winter unless the horse has a proven high-parasite load, protecting "refugia" (susceptible worm populations).' }
    ]
  },
  {
    id: 'vaccination',
    name: 'Annual Vaccination Timeline',
    emoji: '💉',
    description: 'Standard core and risk-based vaccination schedules for adult horses, maintaining robust immunological barriers against life-threatening diseases.',
    milestones: [
      { time: 'March – April', title: 'Core Spring Booster', description: 'Administer all five core vaccines: Tetanus Toxoid, Eastern Equine Encephalomyelitis (EEE), Western Equine Encephalomyelitis (WEE), West Nile Virus (WNV), and Rabies.', isImportant: true },
      { time: 'May – June', title: 'Risk-Based Vaccines (Travel/Shows)', description: 'If your horse travels, competes, or boards with other horses, administer risk-based vaccines like Strangles (Streptococcus equi) and Potomac Horse Fever.' },
      { time: 'September', title: 'Autumn Mosquito Booster', description: 'In warm, southern climates with long mosquito seasons, administer a second West Nile and EEE/WEE booster.' },
      { time: 'October – November', title: 'Respiratory Booster', description: 'Administer an autumn booster of Equine Influenza and Equine Herpesvirus (EHV-1/4) for horses traveling or showing during winter months.' }
    ]
  },
  {
    id: 'farrier',
    name: 'Farrier Cycle Timeline (6 Weeks)',
    emoji: '🔨',
    description: 'A breakdown of what occurs within a standard 6-week trimming or shoeing cycle, showing the progression of hoof growth.',
    milestones: [
      { time: 'Day 1', title: 'Fresh Trim or Shoeing', description: 'Farrier balances the hoof, trims away excess wall and sole, and applies new shoes if needed. Hoof angles are perfectly restored.' },
      { time: 'Week 2', title: 'Rapid Growth Begins', description: 'Hoof wall grows approximately 1/16th of an inch. Tight clinch nails keep the shoes secure.' },
      { time: 'Week 4', title: 'Toes Flare & Balance Shifts', description: 'As the toe grows longer, the center of gravity shifts forward, increasing strain on the deep digital flexor tendon. Flaring may occur on barefoot horses.' },
      { time: 'Week 5', title: 'Clinch Rise & Loose Nails', description: 'Clinches may begin to rise above the hoof wall. Farrier should be scheduled. Avoid galloping on hard surfaces.' },
      { time: 'Week 6', title: 'Next farrier appointment', description: 'Trimming/shoeing is due immediately. Delaying past 6-8 weeks risks hoof cracks, thrush, long-toe/low-heel syndrome, or thrown shoes.', isImportant: true }
    ]
  }
];
