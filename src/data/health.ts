export interface HealthCondition {
  id: string;
  name: string;
  category: string;
  summary: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  whenToCallVet: string;
  faqs: { question: string; answer: string }[];
  relatedCalculators: { name: string; path: string }[];
  relatedArticles: { name: string; path: string }[];
  references: string[];
}

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    id: 'colic',
    name: 'Colic',
    category: 'Gastrointestinal',
    summary: 'Colic is a broad term indicating abdominal pain in horses. It ranges from mild gas cramps to life-threatening intestinal twists (torsions) or severe impactions that require immediate surgery.',
    symptoms: [
      'Paw-scratching at the ground repeatedly',
      'Biting or looking back at the flanks/stomach',
      'Lying down and rolling frequently, or thrashing',
      'Repeatedly getting up and down',
      'Absence of manure or decrease in fecal output',
      'Abnormal gut sounds (usually silent or hyperactive)',
      'Sweating without physical exertion, elevated heart rate'
    ],
    causes: [
      'Sudden feed or hay changes disrupting gut flora',
      'Dehydration or lack of clean, non-frozen drinking water',
      'Sandy pasture grazing leading to sand accumulation in the colon',
      'High grain diets with low forage content',
      'Heavy internal parasite burdens (worms)',
      'Intestinal displacement, twists, or entrapments'
    ],
    prevention: [
      'Provide continuous access to fresh, clean water (thawed in winter)',
      'Make any feed, pasture, or hay transitions gradually over 7–10 days',
      'Maximize turnout and forage grazing; minimize grain intake',
      'Keep your horse on a regular deworming schedule based on fecal egg counts',
      'Use rubber mats or feeders to prevent sand ingestion on sandy soils'
    ],
    whenToCallVet: 'Call your veterinarian immediately (Colic is always an emergency!). Take away all food but do not withhold water. Keep the horse walking slowly if they are thrashing or trying to roll, and monitor their heart rate.',
    faqs: [
      {
        question: 'Should I walk a colicking horse indefinitely?',
        answer: 'Walk the horse only if they are trying to roll or thrash. If they are standing quietly, walking is unnecessary and can exhaust them. Let them rest in a safe, deeply bedded stall while waiting for the vet.'
      },
      {
        question: 'Is it safe to give Banamine (Flunixin Meglumine) before the vet arrives?',
        answer: 'You should always consult your vet before administering Banamine. Giving it too early can mask critical symptoms and prevent the vet from making an accurate diagnostic assessment.'
      }
    ],
    relatedCalculators: [
      { name: 'Horse Weight Calculator', path: '/horse-weight-calculator' },
      { name: 'Water Intake Estimator', path: '/water-intake-calculator' }
    ],
    relatedArticles: [
      { name: 'Strategic Deworming Guidelines', path: '/article/strategic-deworming' }
    ],
    references: [
      'American Association of Equine Practitioners (AAEP) - Colic Guide',
      'UC Davis School of Veterinary Medicine - Equine Colic Facts'
    ]
  },
  {
    id: 'laminitis',
    name: 'Laminitis',
    category: 'Hoof & Skeletal',
    summary: 'Laminitis is the painful inflammation of the sensitive laminae that bond the hoof wall to the coffin bone. If left untreated, it can progress to founder, where the coffin bone rotates or sinks through the sole.',
    symptoms: [
      'Reluctance to walk or turn; stiff, gingerly gait',
      'A characteristic "founder stance" (rocking weight back onto hind legs)',
      'Increased digital pulse in the affected legs',
      'Hooves that feel hot to the touch',
      'Lying down for extended periods to relieve hoof pressure'
    ],
    causes: [
      'Carbohydrate overload from lush spring pasture grass or grain spill',
      'Support-limb laminitis (overloading one leg due to injury on the opposite leg)',
      'Endocrine disorders like Cushing\'s disease (PPID) or Equine Metabolic Syndrome (EMS)',
      'Systemic illness or toxemia (e.g. retained placenta in postpartum mares)'
    ],
    prevention: [
      'Restrict grazing on high-sugar pastures, especially in spring, using grazing muzzles',
      'Store grains securely in rodent-proof, locked feed rooms',
      'Maintain an strict schedule with a professional farrier (every 4–6 weeks)',
      'Test senior horses for Cushings (PPID) and manage diets for EMS-prone horses'
    ],
    whenToCallVet: 'Call your veterinarian immediately at the first sign of soreness or heat. Stand the horse in cold water or ice up to their fetlocks to reduce inflammation while waiting.',
    faqs: [
      {
        question: 'Can a horse fully recover from laminitis?',
        answer: 'Yes, mild cases caught early can make a full recovery with prompt veterinary care, dietary restrictions, and corrective shoeing. Severe cases with bone rotation (founder) require intensive, long-term management.'
      }
    ],
    relatedCalculators: [
      { name: 'Body Condition Scorer', path: '/body-condition-scorer' },
      { name: 'Pasture Size Calculator', path: '/pasture-size-calculator' }
    ],
    relatedArticles: [
      { name: 'Understanding Laminitis and Founder', path: '/article/understanding-laminitis' }
    ],
    references: [
      'AAEP - Equine Laminitis Overview',
      'Royal Veterinary College - Laminitis Prevention'
    ]
  },
  {
    id: 'thrush',
    name: 'Thrush',
    category: 'Hoof & Skeletal',
    summary: 'Thrush is a common bacterial and fungal infection of the frog region of the hoof, characterized by a foul-smelling, black, tar-like discharge. It thrives in wet, anaerobic, or dirty environments.',
    symptoms: [
      'Foul-smelling, thick, black discharge from the clefts of the frog',
      'Tenderness when cleaning out the sulcus (clefts) of the hoof',
      'Ragged, decaying frog tissue'
    ],
    causes: [
      'Standing in wet, muddy paddocks or dirty, manure-filled stalls',
      'Lack of daily hoof picking and cleaning',
      'Poor hoof conformation or contracted heels preventing natural hoof cleaning'
    ],
    prevention: [
      'Pick and clean hooves daily to allow oxygen to reach the frog',
      'Maintain clean, dry bedding in stalls',
      'Ensure paddocks have dry, elevated areas away from mud',
      'Keep regular 4-6 week farrier trims to prevent heel contraction'
    ],
    whenToCallVet: 'Generally treatable by owners using commercial over-the-counter thrush remedies (e.g., copper sulfate solution). Call the vet if the infection is deep, causes lameness, or bleeds when picked.',
    faqs: [
      {
        question: 'What is the best home treatment for thrush?',
        answer: 'Thoroughly pick and brush the hoof clean. Apply a commercial thrush solution or a diluted iodine mixture to the dry frog clefts daily until the black discharge and odor subside.'
      }
    ],
    relatedCalculators: [
      { name: 'Saddle Fit & Back Comfort Guide', path: '/saddle-fit-guide' }
    ],
    relatedArticles: [],
    references: [
      'Equine Veterinary Education - Thrush Management'
    ]
  },
  {
    id: 'rain-rot',
    name: 'Rain Rot',
    category: 'Dermatological',
    summary: 'Rain rot (dermatophilosis) is a bacterial skin infection that produces painful, crusty scabs that peel off with tufts of hair, leaving raw pink spots. It is triggered by persistent moisture and skin friction.',
    symptoms: [
      'Raised, paint-brush-like tufts of hair along the top of the back, rump, or lower legs',
      'Hard, crusty scabs that are painful to peel',
      'Pus underneath newly removed scabs, leaving raw hairless skin'
    ],
    causes: [
      'Infection by Dermatophilus congolensis bacteria',
      'Prolonged wet weather coupled with lack of adequate shelter',
      'Skin irritation from biting insects or poor-fitting blankets trapping sweat'
    ],
    prevention: [
      'Provide adequate run-in shelters in rainy conditions',
      'Avoid blanket use on damp or sweaty horses; ensure blankets are fully breathable',
      'Groom regularly with clean brushes to distribute skin oils and check for early bumps'
    ],
    whenToCallVet: 'Call your vet if lesions cover more than 30% of the body, fail to clear with topical antimicrobial washes, or if the horse appears severely painful or lethargic.',
    faqs: [
      {
        question: 'Is rain rot contagious?',
        answer: 'Yes, it is highly contagious. It can be spread to other horses via shared grooming brushes, blankets, or tack. Always isolate grooming tools for infected horses.'
      }
    ],
    relatedCalculators: [
      { name: 'Blanketing & Rugging Guide', path: '/blanketing-guide' }
    ],
    relatedArticles: [],
    references: [
      'Merck Veterinary Manual - Dermatophilosis in Horses'
    ]
  },
  {
    id: 'sweet-itch',
    name: 'Sweet Itch',
    category: 'Dermatological',
    summary: 'Sweet itch is an allergic hypersensitivity reaction to the saliva of biting midges (Culicoides), causing intense itching, hives, hair loss, and thickened skin along the mane and tail.',
    symptoms: [
      'Intense, compulsive scratching against posts, trees, or fences',
      'Hair loss along the mane, poll, and tailhead ("rat tail" appearance)',
      'Crusted, oozing sores and thickened, leathery skin from self-trauma'
    ],
    causes: [
      'Allergic reaction to Culicoides midge bites',
      'Genetic predisposition in certain breeds (e.g. Shires, Welsh Ponies)'
    ],
    prevention: [
      'Use fine-mesh fly sheets and neck-covering fly masks',
      'Apply high-strength insect repellents containing permethrin or picaridin',
      'Install high-velocity fans in stalls to keep midges from landing',
      'Keep horses indoors during peak midge activity times (dawn and dusk)'
    ],
    whenToCallVet: 'Call your vet if skin is raw, bleeding, or shows secondary bacterial infection, or if the horse is in constant distress and requires prescription corticosteroid or antihistamine therapy.',
    faqs: [
      {
        question: 'When is sweet itch most active?',
        answer: 'It is highly seasonal, peaking during warm spring, summer, and autumn months when biting midge populations are highest.'
      }
    ],
    relatedCalculators: [
      { name: 'Show & Travel Checklist', path: '/show-checklist' }
    ],
    relatedArticles: [],
    references: [
      'University of Minnesota Extension - Equine Sweet Itch'
    ]
  },
  {
    id: 'equine-influenza',
    name: 'Equine Influenza',
    category: 'Respiratory',
    summary: 'Equine Influenza is a highly contagious respiratory virus affecting the upper respiratory tract. It spreads rapidly through airborne droplets or contaminated shared water and tack.',
    symptoms: [
      'Sudden onset of a harsh, dry, hacking cough',
      'High fever (often between 103°F and 106°F)',
      'Clear, watery nasal discharge that may turn thick and yellow later',
      'Lethargy, loss of appetite, and swollen lymph nodes under the jaw'
    ],
    causes: [
      'Infection by Equine Influenza Virus strains (orthomyxovirus)'
    ],
    prevention: [
      'Vaccinate bi-annually or annually, especially for horses that travel or live in boarding stables',
      'Quarantine new arrivals for 14–21 days before introducing them to the main herd',
      'Avoid sharing water buckets, bits, or brushes at horse shows'
    ],
    whenToCallVet: 'Call your vet immediately if your horse develops a sudden high fever and a cough. Isolate the horse from others. Provide absolute rest: one day of rest for every day of fever is the clinical standard.',
    faqs: [
      {
        question: 'How long is a horse contagious with influenza?',
        answer: 'Horses can shed the virus for up to 10 days after symptoms begin. Strict quarantine and sanitation are essential during this period.'
      }
    ],
    relatedCalculators: [
      { name: 'Horse Age in Human Years', path: '/horse-age-converter' }
    ],
    relatedArticles: [
      { name: 'Horse Showing Safety & Bio-Security', path: '/article/biosecurity-guide' }
    ],
    references: [
      'AAEP - Equine Influenza Vaccination Guidelines',
      'Equine Disease Communication Center (EDCC)'
    ]
  },
  {
    id: 'cushings-disease',
    name: "Cushing's Disease (PPID)",
    category: 'Endocrine',
    summary: 'Pituitary Pars Intermedia Dysfunction (PPID), commonly known as Cushing\'s disease, is a progressive endocrine disorder in older horses caused by benign enlargement of the pituitary gland, disrupting hormone levels.',
    symptoms: [
      'Hirsutism (failure to shed a long, curly winter coat in summer)',
      'Chronic, unexplained laminitis episodes',
      'Abnormal fat deposits, particularly over the eyes, neck crest, and tailhead',
      'Muscle wasting along the top line, leading to a pot-bellied appearance',
      'Increased thirst and urination (PU/PD), and increased sweating'
    ],
    causes: [
      'Dopaminergic neurodegeneration of the pituitary gland, leading to overproduction of ACTH and other hormones.'
    ],
    prevention: [
      'While PPID cannot be prevented, early detection through routine endocrine blood tests (ACTH levels) allows for successful management.',
      'Provide strict low-sugar, low-starch diets'
    ],
    whenToCallVet: 'Schedule a vet visit if you notice a delayed coat shed or muscle wasting. PPID is diagnosed via an ACTH blood test and successfully managed with daily oral Prascend (pergolide) tablets.',
    faqs: [
      {
        question: 'At what age do horses get Cushing\'s?',
        answer: 'It is most common in horses over 15 years old, but it can occasionally affect younger horses. It is highly treatable, and treated horses can live comfortable, active lives.'
      }
    ],
    relatedCalculators: [
      { name: 'Body Condition Scorer', path: '/body-condition-scorer' },
      { name: 'Horse Age in Human Years', path: '/horse-age-converter' }
    ],
    relatedArticles: [
      { name: 'Caring for the Senior Horse', path: '/article/senior-horse-care' }
    ],
    references: [
      'Equine Endocrinology Group (EEG) - PPID Recommendations',
      'AAEP - Cushing\'s Disease Guide'
    ]
  },
  {
    id: 'ems',
    name: 'Equine Metabolic Syndrome (EMS)',
    category: 'Endocrine',
    summary: 'Equine Metabolic Syndrome (EMS) is a metabolic disorder characterized by obesity, insulin dysregulation, and an extremely high risk of pasture-associated laminitis. Often referred to as "easy keepers."',
    symptoms: [
      'Obesity that is resistant to moderate dietary calorie restriction',
      'Regional adiposity (thick, hard "cresty" neck, fat pockets behind shoulders)',
      'Subclinical or clinical laminitis'
    ],
    causes: [
      'Insulin dysregulation/resistance, often exacerbated by high-sugar feeds, lack of exercise, and genetic predisposition.'
    ],
    prevention: [
      'Maintain an active exercise regimen for sound, non-laminitic horses',
      'Feed low-sugar, low-non-structural-carbohydrate (NSC < 10%) hay',
      'Strictly limit or ban grazing on lush pasture; use dry lots instead'
    ],
    whenToCallVet: 'Consult your vet if your horse has a hard cresty neck or fat pockets. They can perform oral sugar tests to evaluate insulin function and build a custom weight loss and exercise plan.',
    faqs: [
      {
        question: 'Can EMS be treated with medication?',
        answer: 'Dietary management and exercise are the primary treatments. However, short-term medications like Thyro-L (levothyroxine) can be prescribed to jumpstart metabolism and weight loss in severe cases.'
      }
    ],
    relatedCalculators: [
      { name: 'Body Condition Scorer', path: '/body-condition-scorer' },
      { name: 'Pasture Size Calculator', path: '/pasture-size-calculator' }
    ],
    relatedArticles: [],
    references: [
      'AAEP - Equine Metabolic Syndrome Guidelines'
    ]
  },
  {
    id: 'ulcers',
    name: 'Equine Gastric Ulcers (EGUS)',
    category: 'Gastrointestinal',
    summary: 'Equine Gastric Ulcer Syndrome (EGUS) is the erosion of the stomach lining caused by prolonged exposure to stomach acid. It is highly prevalent in performance, show, and racehorses.',
    symptoms: [
      'Poor performance or resistance when being ridden',
      'Girthiness or sensitivity when tightening the cinch/girth',
      'Dull, unthrifty coat and slow weight loss',
      'Mild, recurrent colic after eating grain',
      'Irritability, grinding teeth, or wind-sucking (cribbing)'
    ],
    causes: [
      'Stomach acid splashing onto the non-glandular upper stomach lining (usually during high-intensity exercise)',
      'Extended periods of fasting without forage to buffer stomach acid',
      'High-grain, low-forage diets',
      'Prolonged use of NSAIDs like Bute or Banamine'
    ],
    prevention: [
      'Provide free-choice hay or continuous pasture grazing; never let the stomach empty',
      'Feed a small handful of alfalfa hay 30 minutes before riding to create an acid-buffering fiber mat in the stomach',
      'Minimize stress during travel, trailering, and stable changes'
    ],
    whenToCallVet: 'Consult your vet to perform a gastroscope (a camera passed into the stomach), which is the only definitive way to diagnose ulcers. Treatment typically involves a 28-day course of GastroGard (omeprazole).',
    faqs: [
      {
        question: 'Why does alfalfa help prevent ulcers?',
        answer: 'Alfalfa is high in calcium and protein, which act as natural antacids and temporarily raise the pH of the stomach, protecting the lining.'
      }
    ],
    relatedCalculators: [
      { name: 'Feed Cost & Intake Calculator', path: '/feed-cost-calculator' },
      { name: 'Medication Dosage Guide', path: '/medication-dosage' }
    ],
    relatedArticles: [],
    references: [
      'Journal of Veterinary Internal Medicine - EGUS Consensus Statement',
      'AAEP - Gastric Ulcer Facts'
    ]
  },
  {
    id: 'founder',
    name: 'Founder',
    category: 'Hoof & Skeletal',
    summary: 'Founder is the chronic phase of laminitis where structural failure of the laminae allows the coffin bone (P3) to rotate downward or sink vertically within the hoof capsule, potentially penetrating the sole.',
    symptoms: [
      'Chronic lameness, especially on hard surfaces or tight turns',
      'Rings on the hoof wall that are wider at the heel than the toe',
      'Dropped, flat, or convex soles instead of a normal concave cup',
      'Distorted hoof shape with a long, flared, curled toe ("slipper foot")'
    ],
    causes: [
      'Unresolved, severe, or poorly managed acute laminitis',
      'Poor trimming that leaves the heels excessively high or the toes long'
    ],
    prevention: [
      'Treat any sign of laminitis as an emergency; do not delay treatment',
      'Work with a qualified farrier and use digital radiographs (X-rays) to guide custom corrective trimming and orthopedic shoeing'
    ],
    whenToCallVet: 'Founder requires immediate joint veterinary and farrier intervention. X-rays are mandatory to measure the exact degree of bone rotation and guide corrective trims.',
    faqs: [
      {
        question: 'Can a foundered horse still be ridden?',
        answer: 'It depends on the severity. Mild rotation cases can often return to light riding with custom orthopedic shoes or hoof boots. Severe rotation cases may be retired permanently but can remain comfortable pasture citizens.'
      }
    ],
    relatedCalculators: [
      { name: 'Horse Height Converter', path: '/height-converter' }
    ],
    relatedArticles: [
      { name: 'Understanding Laminitis and Founder', path: '/article/understanding-laminitis' }
    ],
    references: [
      'AAEP - Founder and Corrective Farriery',
      'Equine Podiatry Association'
    ]
  },
  {
    id: 'tendon-injuries',
    name: 'Tendon & Ligament Injuries',
    category: 'Hoof & Skeletal',
    summary: 'Tendon and ligament strains or tears (such as bowed tendons of the superficial digital flexor) are serious athletic injuries that require long-term rest, rehabilitation, and careful ultrasound monitoring.',
    symptoms: [
      'Localized swelling ("bow" shape along the back of the cannon bone)',
      'Heat and pain when the tendon is palpated or squeezed',
      'Varying degrees of lameness, especially visible on soft ground'
    ],
    causes: [
      'Athletic hyperextension or fatigue of the lower leg',
      'Working on deep, muddy, or hard, unyielding footing',
      'Poor conformation or long-toe/low-heel hoof imbalances placing extra strain on the tendons'
    ],
    prevention: [
      'Ensure proper warm-ups and avoid working fatigued horses',
      'Avoid training or galloping on poor, deep, or uneven arena footing',
      'Apply cold hosing or ice boots to legs after intense gallops or jumping sessions'
    ],
    whenToCallVet: 'Call your vet immediately if a leg is swollen, hot, or painful. Stall-rest the horse and apply ice. Your vet will perform a soft-tissue ultrasound to diagnose the size and depth of the tendon tear.',
    faqs: [
      {
        question: 'How long do tendon injuries take to heal?',
        answer: 'Tendon fibers heal slowly due to limited blood supply. Expect a rehabilitation timeline of 6 to 12 months, starting with absolute stall rest and hand-walking, followed by a gradual reintroduction to exercise.'
      }
    ],
    relatedCalculators: [
      { name: 'Riding & Conditioning Log', path: '/riding-log' }
    ],
    relatedArticles: [],
    references: [
      'AAEP - Care and Rehabilitation of Tendon Injuries'
    ]
  },
  {
    id: 'hoof-abscess',
    name: 'Hoof Abscess',
    category: 'Hoof & Skeletal',
    summary: 'A hoof abscess is a localized bacterial infection inside the sensitive structures of the hoof, resulting in trapped pus under high pressure. It is a very common cause of sudden, non-weight-bearing lameness.',
    symptoms: [
      'Sudden, severe, three-legged lameness (non-weight-bearing)',
      'Strong, throbbing digital pulse in the affected leg',
      'Fetlock or lower-leg swelling',
      'Warmth in the hoof capsule; pain when hoof testers are applied'
    ],
    causes: [
      'Bacteria entering the hoof through a nail prick, a crack in the white line, or a deep sole puncture',
      'Extremely wet weather softening the sole, followed by dry weather cracking the hoof wall'
    ],
    prevention: [
      'Clean hooves daily to inspect for cracks, rocks, or punctures',
      'Keep your farrier visits regular to maintain strong, crack-free hoof walls',
      'Keep horses out of deep, standing mud when possible'
    ],
    whenToCallVet: 'Call your vet or farrier to pinpoint and drain the abscess using hoof testers. Once drained, relief is almost instantaneous. Soak the hoof in hot Epsom salt water and wrap it with Ichthammol to draw out any remaining infection.',
    faqs: [
      {
        question: 'How do you draw out a hoof abscess?',
        answer: 'Soak the foot in warm water with Epsom salts for 15 minutes, apply a drawing packing (like Ichthammol or a poultice pad), wrap with an animal lintex, and cover with a protective duct-tape boot to keep it clean.'
      }
    ],
    relatedCalculators: [
      { name: 'Saddle Fit & Back Comfort Guide', path: '/saddle-fit-guide' }
    ],
    relatedArticles: [],
    references: [
      'AAEP - Managing Hoof Abscesses'
    ]
  },
  {
    id: 'choke',
    name: 'Choke (Esophageal Obstruction)',
    category: 'Gastrointestinal',
    summary: 'Choke in horses is an obstruction of the esophagus (not the windpipe). The horse can still breathe, but cannot swallow, resulting in saliva, feed, and water draining out of their nostrils.',
    symptoms: [
      'Saliva, mixed with feed and water, discharging from the nostrils',
      'Repeated coughing and arching or stretching of the neck',
      'Panic, sweating, and frequent attempts to swallow'
    ],
    causes: [
      'Eating dry feed, pellets, beet pulp, or hay too quickly ("bolting" food)',
      'Insufficient saliva production (often due to dehydration or lack of drinking)',
      'Poor dental condition (sharp teeth or missing molars preventing thorough chewing)'
    ],
    prevention: [
      'Wet or soak grain pellets and beet pulp thoroughly before feeding',
      'Place large, smooth rocks in feed tubs to slow down horses that bolt their food',
      'Provide dental care at least once a year to ensure proper chewing surfaces'
    ],
    whenToCallVet: 'Choke is an immediate veterinary emergency. Remove all food and water. Keep the horse calm with their head down to prevent them from inhaling feed into their lungs, which can cause fatal aspiration pneumonia.',
    faqs: [
      {
        question: 'Can a horse suffocate from choke?',
        answer: 'No, because the obstruction is in the esophagus, not the trachea (windpipe). However, the long-term risk of aspiration pneumonia (inhaling food into the lungs) is extremely dangerous and requires immediate veterinary intervention.'
      }
    ],
    relatedCalculators: [
      { name: 'Water Intake Estimator', path: '/water-intake-calculator' }
    ],
    relatedArticles: [],
    references: [
      'AAEP - Esophageal Obstruction (Choke)'
    ]
  },
  {
    id: 'eye-problems',
    name: 'Eye Problems & Corneal Ulcers',
    category: 'Ophthalmology',
    summary: 'Eye issues, such as corneal ulcers, uveitis (moon blindness), or conjunctivitis, can escalate rapidly and threaten sight. A squinting or cloudy eye should always be treated as an emergency.',
    symptoms: [
      'Squinting, tearing, or keeping the eye tightly shut (blepharospasm)',
      'Cloudiness, blue-gray tint, or film over the surface of the eye',
      'Yellow or green pus-like discharge',
      'Swollen, red eyelids and sensitivity to bright light'
    ],
    causes: [
      'Scratches on the cornea from tree branches, hay stems, or burrs',
      'Bacterial or fungal infections entering a scratch',
      'Autoimmune reactions (Equine Recurrent Uveitis)'
    ],
    prevention: [
      'Use high-quality, well-fitting fly masks to protect eyes from dust, wind, and flies',
      'Ensure pastures are free of low-hanging, sharp branches or exposed nails'
    ],
    whenToCallVet: 'Call your vet immediately for any squinting or cloudy eye. NEVER use left-over eye ointments without a vet exam: if the ointment contains steroids and the eye has a corneal ulcer, it can cause rapid, permanent blindness.',
    faqs: [
      {
        question: 'How does a vet diagnose a corneal ulcer?',
        answer: 'The vet will apply a special yellow-green stain (fluorescein) to the eye. The stain sticks to any damaged areas of the cornea, glowing under a blue light to reveal the exact shape and size of the ulcer.'
      }
    ],
    relatedCalculators: [
      { name: 'Show & Travel Checklist', path: '/show-checklist' }
    ],
    relatedArticles: [],
    references: [
      'AAEP - Equine Ophthalmology and Ulcers',
      'UC Davis Veterinary Medicine - Equine Eye Care'
    ]
  }
];
