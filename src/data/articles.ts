export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  relatedToolId: string;
  readTime: string;
  summary: string;
  content: string; // Markdown supported content
}

export const ARTICLES: Article[] = [
  {
    id: 'measure-weight-no-scale',
    title: "How to Measure Horse Weight Without a Scale",
    slug: "measure-horse-weight-without-scale",
    category: "Health & Care",
    relatedToolId: "weight-calculator",
    readTime: "6 min read",
    summary: "Learn how to accurately estimate your horse's weight using just a standard seamstress tape measure and basic math formulas.",
    content: `Estimated body weight is critical for calculating medication dosages, feed rations, and monitoring your horse's health. While a livestock scale is the gold standard, most owners don't have access to one. This guide explains how to get highly accurate estimates using only a seamstress tape measure and the standard equine weight formula.

### The Standard Equine Weight Formula

The most scientifically validated formula for adult horses is:

$$\\text{Weight (lbs)} = \\frac{\\text{Heart Girth (inches)}^2 \\times \\text{Body Length (inches)}}{330}$$

For metric measurements:

$$\\text{Weight (kg)} = \\frac{\\text{Heart Girth (cm)}^2 \\times \\text{Body Length (cm)}}{11{,}877}$$

### Step-by-Step Measurement Guide

To get accurate results, place the horse on a flat, level surface and stand them square. You will need a partner to assist you.

1. **Measure Heart Girth:** Wrap the tape measure around the horse's girth, starting just behind the elbows and passing over the lowest point of the withers. Pull the tape snug but not tight. Record the measurement at the end of an exhalation.
2. **Measure Body Length:** Place the starting end of the tape at the point of the horse's shoulder (the bony protrusion at the front of the chest). Run the tape in a straight line along the horse's side to the point of the buttock (the rearmost bony point). Do not follow the curves of the ribs.
3. **Run the Math:** Square your heart girth, multiply by the body length, and divide by **330** (or use our instant Horse Weight Calculator at the top of the page).

### Adjusting for Different Age Groups

* **Weanlings (6 months to 1 year):** Divide by **350** instead of 330.
* **Yearlings (1 to 2 years):** Divide by **301** instead of 330.
* **Ponies:** Divide by **330**, but be aware that compact pony breeds can carry a higher density, making a weight tape slightly less accurate than the formula.`
  },
  {
    id: 'horse-weight-by-breed',
    title: "Horse Weight Chart by Breed & Type",
    slug: "horse-weight-chart-by-breed",
    category: "Health & Care",
    relatedToolId: "weight-calculator",
    readTime: "5 min read",
    summary: "A comprehensive reference of average horse weight ranges across 40+ breeds, from tiny miniatures to massive draft horses.",
    content: `Understanding what a healthy horse should weigh starts with knowing their breed standards. Weight varies dramatically between light riding horses, heavy drafts, and small ponies. 

### Why Breed Standards Matter

A horse's weight is determined by their skeletal structure, bone density, and muscle mass. For example, a 15-hand Quarter Horse, with its heavy muscles, will naturally weigh 200–300 lbs more than a 15-hand Arabian with its lighter, more refined frame.

### Average Weight Ranges by Category

| Category | Average Height (Hands) | Average Weight (lbs) | Examples |
| :--- | :--- | :--- | :--- |
| **Miniature** | Under 8.2 hh | 150 - 350 lbs | Falabella, Mini |
| **Pony** | 11.0 - 14.2 hh | 500 - 900 lbs | Shetland, Welsh, Connemara |
| **Light Riding** | 14.1 - 16.0 hh | 800 - 1,100 lbs | Arabian, Morgan, Paso Fino |
| **Stock Horse** | 14.2 - 16.0 hh | 1,000 - 1,300 lbs | Quarter Horse, Paint, Appaloosa |
| **Sport Horse** | 15.3 - 17.2 hh | 1,150 - 1,400 lbs | Warmbloods, Thoroughbreds |
| **Heavy Draft** | 16.0 - 19.0 hh | 1,600 - 2,400 lbs | Clydesdale, Shire, Belgian |

### Tracking Fluctuation
Rather than targeting a single absolute weight, focus on keeping your horse within their breed's ideal weight range while monitoring their Body Condition Score (BCS). Fluctuations of more than 50 lbs in a month warrant a veterinary evaluation or a change in feeding schedule.`
  },
  {
    id: 'winter-blanketing-temperature-chart',
    title: "The Ultimate Winter Blanketing Guide & Temperature Chart",
    slug: "winter-blanketing-temperature-chart",
    category: "Health & Care",
    relatedToolId: "blanketing-guide",
    readTime: "8 min read",
    summary: "Unsure when to blanket? Use this comprehensive temperature chart and checklist to keep your horse comfortable in cold, wind, and rain.",
    content: `Deciding whether to blanket your horse is one of the most debated topics in stable management. Horses are highly efficient at regulating their own body temperature through their thick winter coats, but certain factors like clipping, age, and wet weather make blankets essential.

### The Horse's Thermoneutral Zone

An unclipped horse is perfectly comfortable in temperatures ranging from **15°F to 60°F (-9°C to 15°C)**. When it gets colder than 15°F, or when wind and rain flaten their coat's insulating fluff, they require supplemental protection.

### Blanket Weight Temperature Chart (For Clipped vs Unclipped Horses)

| Temperature Range | Unclipped Horse (Natural Coat) | Clipped Horse (Shaved) |
| :--- | :--- | :--- |
| **Above 60°F (15°C)** | No blanket | No blanket / Fly sheet |
| **50°F to 60°F (10°C to 15°C)** | No blanket | No blanket or Light Sheet |
| **40°F to 50°F (5°C to 10°C)** | No blanket / Rain Sheet if wet | Light Blanket (100g) |
| **30°F to 40°F (-1°C to 5°C)** | Light Blanket (100g) | Medium Blanket (200g) |
| **20°F to 30°F (-6°C to -1°C)** | Medium Blanket (200g) | Heavy Blanket (300g) + Neck Wrap |
| **Below 20°F (-6°C)** | Heavy Blanket (300g) | Heavy Blanket + Liner + Neck Wrap |

### The Danger of Over-Blanketing

Over-blanketing is far more dangerous than under-blanketing. If a horse becomes too warm, they will sweat underneath their blanket. The sweat cannot evaporate, soaking their hair and skin. When the temperature drops further, the wet hair loses all insulating ability, leaving the horse dangerously cold and prone to skin conditions like rain rot.`
  },
  {
    id: 'horse-feeding-guide-for-nutrition',
    title: "Horse Feeding & Nutrition Guide: Base Principles",
    slug: "horse-feeding-nutrition-guide",
    category: "Management",
    relatedToolId: "feed-cost",
    readTime: "7 min read",
    summary: "A deep dive into equine digestion, daily dry matter requirements, hay types, and grain feeding schedules for ultimate health.",
    content: `Horses are non-ruminant herbivores designed to eat small amounts of fibrous forage continuously throughout the day. Modern stable management, which often involves feeding twice a day in stalls, challenges their digestive anatomy. This guide covers how to align your feeding schedule with equine physiology.

### Rule #1: Forage First

The foundation of every horse's diet must be high-quality forage (hay or pasture). 
* An average horse requires **1.5% to 2.5% of their body weight** in dry forage daily.
* For a 1,000 lb horse, this equates to **15 to 25 lbs of hay per day**.
* Forage provides the necessary fiber to keep the hindgut fermenting properly, preventing colic and stomach ulcers.

### Selecting Hay: Grass vs Alfalfa

1. **Grass Hay (Timothy, Orchard, Brome):** Lower in calories and protein. Ideal for easy keepers, senior pasture horses, and idle riding mounts. Can be fed almost free-choice.
2. **Alfalfa Hay (Legume):** Rich in protein, calcium, and calories. Excellent for growing horses, lactating mares, and hard-working performance athletes. Because of its calcium content, it helps buffer stomach acid and prevent ulcers.

### When to Feed Grain

Grains and concentrated feeds should only be used to supply calories that high-quality forage cannot provide. If your horse maintains a healthy body condition score on hay alone, a simple low-calorie **ration balancer** is all they need to satisfy their daily vitamin and mineral requirements.`
  },
  {
    id: 'mare-pregnancy-timeline-and-stages',
    title: "Mare Pregnancy Timeline: Trimester by Trimester",
    slug: "mare-pregnancy-timeline-and-stages",
    category: "Management",
    relatedToolId: "mare-gestation",
    readTime: "9 min read",
    summary: "Track your mare's 11-month pregnancy journey. Learn about key fetal milestones, nutritional changes, and veterinary checks.",
    content: `The gestation period of a mare is approximately **340 days** (roughly 11 months), but can range safely from 320 to 365 days. Managing a pregnant mare requires careful monitoring, particularly in the first and final trimesters.

### Trimester 1 (Days 1 to 110)
* **Milestones:** Fertilization, implantation, and initial organ development.
* **Nutrition:** Keep the mare on a standard maintenance diet. Overfeeding in the first trimester is a common cause of early embryonic loss.
* **Vet Checks:** Confirm pregnancy via ultrasound on Day 14–16 (essential for detecting and pinching twins), and confirm fetal heartbeat on Day 28–30.

### Trimester 2 (Days 111 to 220)
* **Milestones:** Rapid fetal skeletal development. The fetus grows to about the size of a medium dog.
* **Nutrition:** Slightly increase protein and mineral availability, particularly calcium and phosphorus.
* **Management:** Maintain standard exercise. Light riding is perfectly safe for healthy mares during this period.

### Trimester 3 (Days 221 to 340)
* **Milestones:** Over 60% of the foal's birth weight is gained during the final 90 days. The lungs fully mature in the last few weeks.
* **Nutrition:** Significantly increase caloric and protein intake. The fetus occupies a large space in the abdomen, restricting stomach space – feed smaller, nutrient-dense meals.
* **Vaccinations:** Administer the Pneumabort-K (EHV-1) vaccine at months 5, 7, and 9 to prevent abortion, and give standard boosters (Tetanus, EEE, WEE, Rabies) 4 weeks before the due date to ensure high antibody levels in the colostrum.`
  },
  {
    id: 'strategic-deworming-vs-rotational',
    title: "Strategic Deworming: Stopping Parasite Resistance",
    slug: "strategic-deworming-vs-rotational",
    category: "Health & Care",
    relatedToolId: "deworming",
    readTime: "6 min read",
    summary: "Why traditional rotational deworming is failing and how to implement a modern, targeted deworming calendar using fecal egg counts.",
    content: `For decades, horse owners were taught to rotate different deworming chemicals every 8 weeks. Today, the American Association of Equine Practitioners (AAEP) strictly warns against this practice. Rotational deworming has caused widespread parasite resistance, making some chemicals completely useless.

### The Problem with Rotational Deworming

By deworming every horse on a rigid schedule, we kill off the weak parasites and leave the resistant 'super-worms' to reproduce. Modern veterinary science advocates for **Strategic, Targeted Deworming**, focusing on individual horse susceptibility.

### The 80/20 Rule of Equine Parasites

In any pasture, approximately **20% of the horses carry 80% of the parasite load**. These horses are 'high shedders'. The remaining 80% of horses are naturally resistant and need minimal chemical treatment.

### How to Implement Strategic Deworming

1. **Perform a Fecal Egg Count (FEC):** Have your vet analyze a fresh manure sample twice a year (spring and fall).
2. **Classify Your Horse:**
   * **Low Shedder (0 - 200 eggs per gram):** Needs deworming only twice a year (typically Spring and Fall) targeting tapeworms and strongyles.
   * **Medium Shedder (200 - 500 eggs per gram):** Needs 2 to 3 targeted treatments per year.
   * **High Shedder (500+ eggs per gram):** Requires 4 treatments per year and pasture management reviews.
3. **Pasture Management:** Pick up manure from paddocks twice weekly and do not overstock pastures. This naturally breaks the parasite life cycle without chemicals.`
  },
  {
    id: 'how-to-saddle-fit-comprehensive',
    title: "Saddle Fitting 101: Checking Tree Width & Balance",
    slug: "saddle-fitting-101",
    category: "Training & Prep",
    relatedToolId: "saddle-fit",
    readTime: "8 min read",
    summary: "A step-by-step guide to assessing western and english saddle fit, checking wither clearance, shoulder angle, and flocking balance.",
    content: `An ill-fitting saddle can cause severe back pain, muscle atrophy, behavioral resistance, and poor performance. Whether you ride English or Western, you must regularly evaluate how your saddle fits your horse's changing back.

### The 4 Pillars of Saddle Fitting

To check your saddle's fit, place it directly on your horse's bare back (without a saddle pad) standing square on a flat surface.

#### 1. Wither Clearance
There should be a minimum of **2 to 3 fingers of vertical clearance** between the underside of the pommel (English) or gullet (Western) and the top of the horse's withers. Check this both when the horse is standing idle and when you are sitting in the saddle.

#### 2. Shoulder Blade Freedom
The tree of the saddle must sit behind the shoulder blade (scapula). If the tree points are too narrow, they will pinch the scapular cartilage, restricting front leg reach and causing the horse to shorten their stride.

#### 3. Gullet Channel Width
The channel (gullet) running down the center of the saddle must be wide enough (typically 3–4 fingers wide) to clear the horse's spine and the surrounding dorsal ligaments. No part of the saddle should ever apply direct pressure to the spine.

#### 4. Panel Contact & Balance
The panels must contact the horse's back evenly from front to back. Run your hand flat underneath the panels. If you feel a gap in the middle, the saddle is **bridging**, which concentrates all your weight onto the shoulders and loins. If the saddle rocks back and forth, the tree curvature is too steep.`
  }
];
