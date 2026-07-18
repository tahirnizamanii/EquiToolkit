export interface FeedItem {
  id: string;
  name: string;
  category: 'Hay' | 'Grass' | 'Grain' | 'Supplement' | 'Mineral' | 'Electrolyte';
  nutritionalValue: string;
  pros: string[];
  cons: string[];
  suitableFor: string;
  recommendations: string;
}

export const FEED_DATABASE: FeedItem[] = [
  {
    id: 'alfalfa-hay',
    name: 'Alfalfa Hay (Lucerne)',
    category: 'Hay',
    nutritionalValue: 'High protein (16–20%), high digestible energy, very high calcium (1.2–1.5%), low sugar (WSC < 10%).',
    pros: [
      'Excellent for building muscle and top line',
      'High calcium acts as a natural stomach buffer against ulcers',
      'Very palatable; ideal for picky eaters or horses needing weight gain'
    ],
    cons: [
      'High calorie content can cause obesity in easy keepers',
      'Imbalance of calcium-to-phosphorus ratio if fed as 100% of forage',
      'Increases urination and ammonia smell in stalls due to high protein'
    ],
    suitableFor: 'Growing foals, lactating mares, active performance horses, senior horses needing weight gain, and horses prone to gastric ulcers.',
    recommendations: 'Feed as 20% to 50% of the daily forage ration, blended with grass hay to balance calories and calcium, or feed exclusively to high-performance athletes.'
  },
  {
    id: 'timothy-hay',
    name: 'Timothy Hay',
    category: 'Hay',
    nutritionalValue: 'Moderate protein (7–10%), moderate digestible energy, high fiber, balanced calcium-to-phosphorus ratio (~1.5:1).',
    pros: [
      'Excellent fiber source that promotes healthy gut motility',
      'Low in calories, allowing horses to chew longer without gaining excess weight',
      'Lower risk of mold than clover or alfalfa hays'
    ],
    cons: [
      'Can be expensive in regions where it is not locally grown',
      'Not high enough in nutrients/energy for heavy performance or lactating horses'
    ],
    suitableFor: 'Easy keepers, pleasure horses, horses on stall rest, and metabolic or laminetic horses needing low-calorie forage.',
    recommendations: 'Provide free-choice or feed at 1.5% to 2% of the horse\'s body weight daily. Outstanding base forage for almost all adult horses.'
  },
  {
    id: 'orchard-grass-hay',
    name: 'Orchard Grass Hay',
    category: 'Hay',
    nutritionalValue: 'Moderate protein (8–11%), moderate energy, high fiber, very palatable.',
    pros: [
      'Highly palatable and soft texture',
      'Good fiber content, excellent for continuous foraging',
      'Cheaper than Timothy in many regions'
    ],
    cons: [
      'Can vary widely in sugar/NSC content depending on harvest maturity',
      'Needs sugar analysis before feeding to metabolic/insulin-resistant horses'
    ],
    suitableFor: 'Pleasure horses, show horses, and general stable herds.',
    recommendations: 'Feed at 1.5% to 2% of the horse\'s body weight daily. Great for blending with alfalfa hay.'
  },
  {
    id: 'ryegrass-pasture',
    name: 'Ryegrass Pasture',
    category: 'Grass',
    nutritionalValue: 'High digestible energy, high protein (up to 20% in spring), very high non-structural carbohydrates (NSC/sugars).',
    pros: [
      'Extremely lush and highly nutritious base forage',
      'Supports high milk production in lactating mares and rapid growth in youngsters'
    ],
    cons: [
      'Extremely high sugar content, especially in early spring or after frosts',
      'High risk of triggering pasture laminitis or founder in sensitive horses',
      'Can cause mild loose manure or "grass bellies"'
    ],
    suitableFor: 'Performance horses, hard keepers, growing foals, and lactating broodmares.',
    recommendations: 'Restrict grazing time during spring and autumn peaks using a grazing muzzle or dry-lot turnout, particularly for ponies or easy keepers.'
  },
  {
    id: 'fescue-pasture',
    name: 'Tall Fescue',
    category: 'Grass',
    nutritionalValue: 'Moderate to high energy, moderate protein, hardy turf grass.',
    pros: [
      'Highly resistant to heavy grazing, drought, and trampling',
      'Good baseline nutrition for gelding and non-breeding stock'
    ],
    cons: [
      'Risk of Endophyte Fungus infection, which causes "fescue toxicosis"',
      'Highly toxic to pregnant broodmares (causes thick placenta, retained placenta, lack of milk, or foaling emergencies)'
    ],
    suitableFor: 'Geldings, non-breeding mares, and pleasure horses.',
    recommendations: 'Remove pregnant broodmares from fescue pastures and fescue-blend hay for at least the last 60 to 90 days of gestation to prevent toxicosis.'
  },
  {
    id: 'oats',
    name: 'Whole or Rolled Oats',
    category: 'Grain',
    nutritionalValue: 'Moderate protein (11–12%), high starch, moderate fiber, high phosphorus.',
    pros: [
      'Highly digestible starch compared to corn or barley',
      'Provides quick, accessible energy for working horses',
      'High in silicon, promoting hoof wall strength'
    ],
    cons: [
      'Can cause excitability or "hot" behavior due to high starch loads',
      'Extremely high in phosphorus relative to calcium; can disrupt calcium absorption'
    ],
    suitableFor: 'Working performance horses, racehorses, and horses needing quick energy.',
    recommendations: 'Limit feed to no more than 0.5% of body weight per single meal. Always feed alongside high-calcium forage (like alfalfa or calcium-supplemented feed) to maintain a proper Ca:P ratio.'
  },
  {
    id: 'beet-pulp',
    name: 'Beet Pulp',
    category: 'Grain',
    nutritionalValue: 'High digestible fiber, moderate protein (8–10%), very low starch and sugar (NSC < 10%). Excellent prebiotic fibers.',
    pros: [
      'Outstanding, safe weight builder without high starch risk',
      'Provides "cool" energy via hindgut fiber fermentation',
      'Increases water intake when fed soaked, reducing dehydration risks'
    ],
    cons: [
      'Must be soaked before feeding to prevent choke or impaction',
      'Low in vitamins and minerals; should be fed with a balancer'
    ],
    suitableFor: 'Hard keepers, metabolic horses, horses prone to tying up or ulcers, senior horses with poor teeth.',
    recommendations: 'Always soak in warm water (1 part beet pulp to 2-3 parts water) for at least 15–30 minutes before feeding. Ideal for mixing with other feeds or supplements.'
  },
  {
    id: 'wheat-bran',
    name: 'Wheat Bran',
    category: 'Grain',
    nutritionalValue: 'Moderate protein, high fiber, extremely high in phosphorus.',
    pros: [
      'Highly palatable; great for masking medications or making warm winter "mashes"',
      'High fiber density'
    ],
    cons: [
      'Severe calcium-to-phosphorus imbalance (1:10 ratio) if fed in large amounts',
      'Does not have a laxative effect as commonly believed; sudden mashes can disrupt gut bacteria'
    ],
    suitableFor: 'Occasional treats or as a small ingredient in balanced commercial feeds.',
    recommendations: 'Feed only in small, balanced quantities (under 1 cup daily) or as a rare treat. Avoid feeding large daily amounts to growing youngsters.'
  },
  {
    id: 'electrolytes',
    name: 'Salt & Electrolytes',
    category: 'Electrolyte',
    nutritionalValue: 'Sodium, Chloride, Potassium, Magnesium, and Calcium.',
    pros: [
      'Triggers the thirst response, preventing dehydration and impaction colic',
      'Replaces minerals lost in sweat during heavy training or hot weather'
    ],
    cons: [
      'Can irritate stomach ulcers if fed in high concentrations on an empty stomach',
      'Excessive amounts without access to water can cause salt toxicity'
    ],
    suitableFor: 'All horses (free-choice salt) and hard-working, traveling, or heavily sweating performance horses (added electrolytes).',
    recommendations: 'Ensure every horse has constant, 24/7 access to a plain white salt block. Add 1-2 tablespoons of electrolytes to wet feed or a dedicated water bucket (always offer plain water as a second choice) after heavy sweating.'
  },
  {
    id: 'flaxseed-oil',
    name: 'Flaxseed / Linseed (Oil or Meal)',
    category: 'Supplement',
    nutritionalValue: 'High fat (30-40%), rich in Omega-3 fatty acids, low starch.',
    pros: [
      'Imparts a deep, mirror-like coat shine',
      'Omega-3 fatty acids possess natural anti-inflammatory properties',
      'Improves skin health and can alleviate sweet itch symptoms'
    ],
    cons: [
      'Raw, unprocessed flax seeds contain small amounts of toxic compounds; must be boiled, micronized, or fed as cold-pressed oil'
    ],
    suitableFor: 'Horses with dry coats, sweet itch sufferers, seniors, and hard keepers needing extra fat calories.',
    recommendations: 'Feed 1 to 4 ounces of cold-pressed flaxseed oil daily or 1/2 cup of stabilized, ground flax meal mixed directly into wet feed.'
  }
];
