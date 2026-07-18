export interface EquipmentGuide {
  id: string;
  name: string;
  emoji: string;
  summary: string;
  buyingAdvice: string[];
  sizingChart: { size: string; measurements: string; description: string }[];
  maintenanceTips: string[];
  faqs: { question: string; answer: string }[];
  relatedTools: { name: string; path: string }[];
}

export const EQUIPMENT_GUIDES: EquipmentGuide[] = [
  {
    id: 'saddles',
    name: 'Saddles (English & Western)',
    emoji: '🏇',
    summary: 'A saddle is the primary interface between rider and horse. A proper-fitting saddle is vital to prevent back soreness, behavior issues, and muscle atrophy, while aligning the rider\'s center of gravity with the horse\'s motion.',
    buyingAdvice: [
      'Prioritize gullet/tree fit for the horse over seat style for the rider; an ill-fitting tree can cause permanent muscle damage.',
      'Check that the saddle panels follow the slope of the horse\'s back and distribute weight evenly without bridging or pressure points.',
      'Always test the fit without a pad first to verify gullet clearance (2-3 fingers at the wither) and shoulder clearance.'
    ],
    sizingChart: [
      { size: '15" - 16"', measurements: 'English Seat Size', description: 'Youth / Petite Adult' },
      { size: '16.5" - 17.5"', measurements: 'English Seat Size', description: 'Average Adult (Standard size)' },
      { size: '18" - 19"', measurements: 'English Seat Size', description: 'Tall or Larger Adult' },
      { size: '13" - 14"', measurements: 'Western Seat Size', description: 'Youth Rider' },
      { size: '15"', measurements: 'Western Seat Size', description: 'Average Adult (Standard Western)' },
      { size: '16" - 17"', measurements: 'Western Seat Size', description: 'Larger Adult' }
    ],
    maintenanceTips: [
      'Wipe down sweat and dirt with a damp sponge after every single ride to prevent leather rot.',
      'Clean deep grease with a high-quality pH-balanced leather cleaner or saddle soap every 1-2 months.',
      'Apply a thin layer of leather conditioner or oil after cleaning to restore moisture and maintain flexibility; avoid conditioning the underside of flaps.'
    ],
    faqs: [
      {
        question: 'How do I know if my saddle is "bridging"?',
        answer: 'Slide your hand under the saddle panels while the horse is standing. If you feel pressure at the front and back but no contact in the middle, the saddle is bridging, which concentrates your weight onto two small sore spots.'
      },
      {
        question: 'Should I buy a leather or synthetic saddle?',
        answer: 'Leather is durable, molds to your seat over time, and holds its resale value, but requires continuous care. Synthetics are lightweight, weather-proof, easy to clean with water, and budget-friendly, making them great for trail riding.'
      }
    ],
    relatedTools: [
      { name: 'Saddle Fit & Back Comfort Guide', path: '/saddle-fit-guide' }
    ]
  },
  {
    id: 'bridles',
    name: 'Bridles & Headstalls',
    emoji: '🐴',
    summary: 'Bridles hold the bit in the horse\'s mouth and provide the rider with a communication channel through the reins. Options include English caveson bridles, Western headstalls, and bitless options.',
    buyingAdvice: [
      'Choose a bridle with a padded crownpiece to reduce pressure on the sensitive poll area behind the ears.',
      'Verify the browband is long enough; a tight browband pulls the headstall forward, pinching the ears.',
      'Avoid overtightening nosebands (flash or caveson); you should easily fit two fingers under any strap.'
    ],
    sizingChart: [
      { size: 'Pony', measurements: 'Browband: ~14.5", Noseband: ~20-22"', description: 'Small ponies and young stock' },
      { size: 'Cob', measurements: 'Browband: ~15.5", Noseband: ~22-24"', description: 'Large ponies, Arabians, small Quarter Horses' },
      { size: 'Full / Horse', measurements: 'Browband: ~16.5", Noseband: ~24-26"', description: 'Average Thoroughbreds, Warmbloods, Quarter Horses' },
      { size: 'Oversize / Warmblood', measurements: 'Browband: ~17.5", Noseband: ~26-28"', description: 'Drafts and large-headed Warmbloods' }
    ],
    maintenanceTips: [
      'Disassemble the entire bridle twice a year for deep cleaning and conditioning of every buckle and strap.',
      'Check all stitching, especially at the bit attachments, for signs of wear or cracking to ensure safety.'
    ],
    faqs: [
      {
        question: 'How tight should the throatlatch be?',
        answer: 'You should be able to fit 3 to 4 fingers (or a fist) between the throatlatch strap and the horse\'s cheekbone to ensure they can flex their neck and breathe comfortably.'
      }
    ],
    relatedTools: [
      { name: 'Show & Travel Checklist', path: '/show-checklist' }
    ]
  },
  {
    id: 'bits',
    name: 'Bits & Mouthpieces',
    emoji: '🔩',
    summary: 'Bits apply pressure to the bars, tongue, lips, and poll of the horse to guide speed and direction. Understanding the differences between snaffles (direct action) and curbs (leverage action) is essential for ethical riding.',
    buyingAdvice: [
      'Always start with the mildest possible bit that still allows for safe control (usually a thick, sweet iron loose-ring snaffle).',
      'Ensure the bit is 1/4" wider than the horse\'s mouth; a tight bit pinches the lips, while a loose bit slides through.',
      'Avoid thin wire or twisted metal bits, which concentrate pressure in sharp, painful ways.'
    ],
    sizingChart: [
      { size: '4.5" (115 mm)', measurements: 'Mouthpiece Width', description: 'Ponies and small-headed Cobs' },
      { size: '5.0" (127 mm)', measurements: 'Mouthpiece Width', description: 'Average Cob, Arabian, or refined Horse' },
      { size: '5.5" (140 mm)', measurements: 'Mouthpiece Width', description: 'Average Adult Horse, Warmbloods, Quarter Horses' },
      { size: '6.0" (152 mm)', measurements: 'Mouthpiece Width', description: 'Draft horses and heavy Warmbloods' }
    ],
    maintenanceTips: [
      'Dunk the bit in a bucket of clean water or scrub the mouthpiece with a stiff brush immediately after riding to remove dried saliva and grass.',
      'Never oil the mouthpiece of a bit; use non-toxic metal polish only on the external rings/shanks if necessary.'
    ],
    faqs: [
      {
        question: 'What is the difference between a snaffle and a curb bit?',
        answer: 'A snaffle bit attaches reins directly to the mouthpiece rings, applying a 1:1 ratio of direct pressure. A curb bit has shanks that create leverage, multiplying rein pressure and applying it to the poll and chin groove via a curb chain.'
      }
    ],
    relatedTools: [
      { name: 'Riding & Conditioning Log', path: '/riding-log' }
    ]
  },
  {
    id: 'blankets',
    name: 'Horse Blankets & Rugs',
    emoji: '🧥',
    summary: 'Blankets protect horses from rain, wind, mud, and extreme cold. Selecting the right weight (fill in grams) is essential to keep your horse warm without causing them to overheat or sweat underneath.',
    buyingAdvice: [
      'Choose the blanket weight based on your horse\'s coat (clipped vs. unclipped) and the temperature.',
      'Check for a waterproof, breathable ripstop outer shell (minimum 1200 Denier for pasture turnouts).',
      'Adjust chest buckles and leg straps so the blanket is secure but does not rub the shoulders or pull tightly at the tail.'
    ],
    sizingChart: [
      { size: '64" - 68"', measurements: 'Center chest to rear tail edge', description: 'Large Pony / Small Cob' },
      { size: '70" - 74"', measurements: 'Center chest to rear tail edge', description: 'Cob / Small Horse (Arabian)' },
      { size: '76" - 80"', measurements: 'Center chest to rear tail edge', description: 'Standard Horse (Standard size)' },
      { size: '82" - 86"', measurements: 'Center chest to rear tail edge', description: 'Large Warmblood / Draft Cross' }
    ],
    maintenanceTips: [
      'Brush off dried mud daily to maintain breathability.',
      'Wash with a specialty residue-free blanket soap; regular laundry detergent destroys the waterproof coating.',
      'Re-treat the outer fabric with a waterproofing spray once a year.'
    ],
    faqs: [
      {
        question: 'Can a horse overheat in a heavy blanket?',
        answer: 'Yes! Overheating is a major risk. If a horse sweats under a blanket, the moisture cools and they will end up colder than if they were unblanketed. Monitor temperatures closely.'
      }
    ],
    relatedTools: [
      { name: 'Blanketing & Rugging Guide', path: '/blanketing-guide' }
    ]
  },
  {
    id: 'boots',
    name: 'Protective Boots & Wraps',
    emoji: '🥾',
    summary: 'Boots (such as brushing, bell, or open-front boots) protect the lower legs from impact, overreaching, and scrapes during riding, jumping, or turnout.',
    buyingAdvice: [
      'Choose the boot type that matches your activity: brushing boots protect the inner cannon bone, while bell boots protect the heels from overreaching hind hooves.',
      'Ensure boots fit snugly but do not pinch or trap dirt, which acts like sandpaper against the skin.'
    ],
    sizingChart: [
      { size: 'Small / Pony', measurements: 'Height: ~8-9", Fetlock circ: ~9-10"', description: 'Ponies and thin-legged cobs' },
      { size: 'Medium / Cob', measurements: 'Height: ~10", Fetlock circ: ~10-11"', description: 'Average horses, front legs' },
      { size: 'Large / Horse', measurements: 'Height: ~11-12", Fetlock circ: ~11-12"', description: 'Large horses, or hind legs' }
    ],
    maintenanceTips: [
      'Hose off dirt and mud immediately after use; let them air dry fully before placing on the horse.',
      'Check velcro straps regularly to ensure they remain strong and clean of grass fibers.'
    ],
    faqs: [
      {
        question: 'Should I leave boots on for turnout?',
        answer: 'Only if the horse is prone to self-injury. Leaving boots on for extended periods traps heat and moisture, which can weaken tendon structures over time.'
      }
    ],
    relatedTools: [
      { name: 'Riding & Conditioning Log', path: '/riding-log' }
    ]
  },
  {
    id: 'halters',
    name: 'Halters & Lead Ropes',
    emoji: '🎗️',
    summary: 'A halter is the most basic equipment for catching, leading, tying, and grooming your horse. Options include nylon flat web, leather, and braided rope halters.',
    buyingAdvice: [
      'Always use a halter with a leather breakaway crownpiece when tying or turned out in a pasture; a nylon halter will not break in an emergency, risking neck fractures.',
      'Rope halters are excellent for ground training but should never be used for cross-tying, trailer tying, or pasture turnout.'
    ],
    sizingChart: [
      { size: 'Foal / Mini', measurements: 'Noseband: ~14-16", Crown: ~24-28"', description: 'Foals and miniatures' },
      { size: 'Cob', measurements: 'Noseband: ~20-22", Crown: ~32-36"', description: 'Refined heads, average ponies' },
      { size: 'Horse', measurements: 'Noseband: ~24-26", Crown: ~38-42"', description: 'Standard horse size' },
      { size: 'Warmblood / Draft', measurements: 'Noseband: ~28-30", Crown: ~44-48"', description: 'Drafts and large warmbloods' }
    ],
    maintenanceTips: [
      'Clean leather halters with saddle soap and conditioner annually.',
      'Nylon halters can be placed inside a pillowcase and washed in a standard washing machine on a gentle cycle.'
    ],
    faqs: [
      {
        question: 'Why are rope halters popular?',
        answer: 'Rope halters are lightweight and apply pressure on narrower surface areas, which discourages horses from leaning or pulling against the handler, making them excellent for ground work.'
      }
    ],
    relatedTools: [
      { name: 'Show & Travel Checklist', path: '/show-checklist' }
    ]
  }
];
