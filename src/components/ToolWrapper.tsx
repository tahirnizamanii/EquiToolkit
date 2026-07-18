import React, { useEffect } from 'react';
import { Tool } from '../types';
import { TOOLS } from '../data';
import { Breadcrumbs, RelatedTools } from './common/UIComponents';

interface ToolWrapperProps {
  tool: Tool;
  onBack: () => void;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export default function ToolWrapper({ tool, onBack, onNavigate, children }: ToolWrapperProps) {
  // Sync page metadata
  useEffect(() => {
    document.title = tool.metaTitle;
    
    // Find or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', tool.metaDesc);

    // Inject JSON-LD structured data
    let jsonLdScript = document.getElementById('json-ld-structured-data');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('id', 'json-ld-structured-data');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': tool.title,
      'description': tool.metaDesc,
      'url': `https://equitoolkit.com${tool.path}`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires HTML5 and Javascript enabled',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    };

    jsonLdScript.textContent = JSON.stringify(structuredData);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      // Clean up JSON-LD on unmount
      const existingScript = document.getElementById('json-ld-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [tool]);

  // High-value SEO Copy for the 12 tools
  const getSEOCopy = () => {
    switch (tool.id) {
      case 'weight-calculator':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">How to Measure Your Horse's Weight Without a Scale</h3>
            <p>
              Estimating your horse's weight accurately is critical for calculating medication dosages, choosing the correct dewormer plunger settings, assessing dietary intake, and monitoring overall body condition. While a professional walk-on equine scale is the gold standard, most barn managers rely on the morphometric formula used by veterinarians worldwide.
            </p>

            <div className="bg-bg border p-4 rounded-xl">
              <h4 className="font-bold text-text-main text-sm mb-1">📐 The Mathematical Weight Equation:</h4>
              <p className="font-mono text-xs">
                Imperial (Inches / Pounds): Weight (lbs) = (Heart Girth² × Body Length) ÷ 330
              </p>
              <p className="font-mono text-xs mt-1">
                Metric (Centimeters / Kilograms): Weight (kg) = (Heart Girth² × Body Length) ÷ 11,877
              </p>
            </div>

            <h4 className="font-bold text-text-main">Steps to Obtain Accurate Morphometric Measurements:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Stand on flat ground:</strong> Ensure the horse is standing square on a firm, level surface. Head should be in an upright, relaxed position.</li>
              <li><strong>Measure Heart Girth:</strong> Pass a cloth measuring tape around the barrel just behind the elbows and over the lowest point of the withers. Pull the tape snug but not so tight that it depresses the skin. Record the value.</li>
              <li><strong>Measure Body Length:</strong> Using an assistant, measure from the absolute point of the shoulder (scapulo-humeral joint) straight back along the side to the point of the buttock (tuber ischii). Do not warp the tape around the curve of the rump.</li>
            </ol>

            <h4 className="font-bold text-text-main mt-4">Frequently Asked Questions (FAQ)</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-text-main">Q: Can this formula be used for pregnant mares or growing foals?</p>
                <p>A: Pregnant mares in late-gestation and young foals require modified equations. For late-pregnancy mares, adding 10-15% to the calculated weight is generally recommended. Foals require a divisor of 280 instead of 330 for imperial calculations.</p>
              </div>
              <div>
                <p className="font-semibold text-text-main">Q: What is the margin of error?</p>
                <p>A: In clinical trials, the standard heart girth body length equation matches a scale weight within 3% to 5% accuracy. Conformation variations (long backs, deep ribs) can slightly bias results.</p>
              </div>
            </div>
          </article>
        );

      case 'blanketing-guide':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">Understanding Horse Thermoregulation and Winter Blanketing</h3>
            <p>
              Deciding whether to blanket your horse is one of the most controversial topics in equine care. In general, horses are far better equipped to handle cold temperatures than humans. Their "thermoneutral zone" is much lower than ours, ranging from 40°F (5°C) to 75°F (24°C). However, variables like wind, rain, and coat-clipping change these parameters dramatically.
            </p>

            <h4 className="font-bold text-text-main">The Power of the Natural Winter Coat</h4>
            <p>
              An unclipped horse grows a thick, oily coat of hair. When temperatures drop, microscopic muscles raise the hair follicles (piloerection) to trap a deep layer of warm air near the skin. If you place a heavy blanket on a horse with a full winter coat prematurely, you crush this natural air loft, disabling their natural thermoregulation and potentially causing them to shiver or sweat.
            </p>

            <h4 className="font-bold text-text-main">When is Blanketing Absolutely Necessary?</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>The Horse is Clipped:</strong> Shaving or clipping removes the natural insulating layer. Clipped horses MUST be blanketed in cold temperatures.</li>
              <li><strong>Wet or Freezing Rain:</strong> Rain flatlines the hair coat. Once the skin gets wet, the horse loses the ability to trap warm air and can suffer severe cold stress.</li>
              <li><strong>Seniors and Hard Keepers:</strong> Older horses or horses with poor dental condition cannot generate enough digestive heat from digesting hay and need synthetic insulation.</li>
              <li><strong>No Windbreaks or Shelter:</strong> High wind and snow without shelter bypasses hair insulation.</li>
            </ul>

            <h4 className="font-bold text-text-main mt-4">Frequently Asked Questions (FAQ)</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-text-main">Q: What does blanket "fill" mean (e.g. 100g, 200g, 300g)?</p>
                <p>A: Fill represents the weight of the polyfill insulation inside the blanket. Turnout sheets have 0g fill (waterproof layer only), medium-weight turnouts typically have 150g to 200g, and heavy blankets range from 300g to 400g.</p>
              </div>
              <div>
                <p className="font-semibold text-text-main">Q: Is a stable blanket the same as a turnout blanket?</p>
                <p>A: No! Stable blankets are NOT waterproof. If a horse rolls in mud or goes outside in a stable blanket during rain, the fabric will absorb water, exposing the skin directly to freezing cold. Turnouts are fully windproof and waterproof.</p>
              </div>
            </div>
          </article>
        );

      case 'foal-color':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">The Science of Equine Coat Color Genetics</h3>
            <p>
              Predicting the color of a future foal is a fascinating application of Mendelian genetics. Every horse coat color, from a basic chestnut to a rare perlino, starts with just two foundational pigments: red (phaeomelanin) and black (eumelanin). The expression of these pigments is controlled by various loci and modifiers.
            </p>

            <h4 className="font-bold text-text-main">1. The Base Colors: Extension (E) and Agouti (A)</h4>
            <p>
              All horse coat colors are determined by two main genes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Extension Locus (E):</strong> Controls the production of black pigment. The dominant allele <em>E</em> allows black hair production. The recessive allele <em>e</em> restricts pigment to red (Chestnut).</li>
              <li><strong>Agouti Locus (A):</strong> Controls the distribution of black hair. The dominant allele <em>A</em> restricts black hair to the "points" (mane, tail, legs), turning a black horse into a Bay. Agouti has no visible effect on Chestnut (red) horses.</li>
            </ul>

            <h4 className="font-bold text-text-main">2. Dilution Modifiers: Cream, Dun, and Roan</h4>
            <p>
              Base colors can be modified by dilution genes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cream Dilution (Cr):</strong> A single copy on Chestnut produces Palomino, and on Bay produces Buckskin. Two copies of cream produce double dilutes like Cremello (on Chestnut base) or Perlino (on Bay base).</li>
              <li><strong>Dun Locus (D):</strong> Dilutes body color while leaving primitive markings (dorsal stripe, leg barring).</li>
              <li><strong>Roan Locus (Rn):</strong> Intersperses white hairs evenly throughout the body, leaving the head and legs dark.</li>
            </ul>

            <h4 className="font-bold text-text-main mt-4">Coat Color Genetics FAQ</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-text-main">Q: Why did my two Chestnut horses have a Chestnut foal? Is any other color possible?</p>
                <p>A: Genetically, Chestnut is fully recessive (ee). Since both parents only carry "e" alleles, they can never produce a black or bay foal. Two Chestnut parents will ALWAYS produce a Chestnut foal (100% probability).</p>
              </div>
              <div>
                <p className="font-semibold text-text-main">Q: Is Grey a coat color?</p>
                <p>A: Grey is actually a dominant depigmentation modifier (G). A grey horse is born a normal base color (like bay or black) and progressively loses pigment with age, turning white. At least one parent MUST be Grey to produce a Grey foal.</p>
              </div>
            </div>
          </article>
        );

      case 'deworming':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">A Modern Approach to Strategic Equine Parasite Control</h3>
            <p>
              Historically, horse owners dewormed every 60 days on a rotational basis. Unfortunately, this heavy and unscientific use of chemical compounds has created massive global drug resistance. Today, the American Association of Equine Practitioners (AAEP) advocates for a **strategic deworming protocol** based on individual fecal egg counts (FEC).
            </p>

            <h4 className="font-bold text-text-main">Understanding Fecal Egg Counts (EPG)</h4>
            <p>
              A fecal egg count measures the number of strongyle eggs per gram (EPG) of manure. Based on the test, horses are classified into three shedder profiles:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Low Shedders (&lt;200 EPG):</strong> These horses have strong immune systems that naturally suppress parasite reproduction. They only require 1-2 targeted dewormings per year.</li>
              <li><strong>Moderate Shedders (200 - 500 EPG):</strong> Require a rotational program of 2-3 treatments.</li>
              <li><strong>High Shedders (&gt;500 EPG):</strong> These individuals represent 20% of the herd but are responsible for shedding 80% of pasture eggs. They require 3-4 targeted dewormings per year.</li>
            </ul>

            <h4 className="font-bold text-text-main">Chemical Classes and Resistance Notes</h4>
            <p>
              Always consult your veterinarian to verify compound efficacy, as some regions show total resistance to specific chemical classes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Macrocyclic Lactones (Ivermectin, Moxidectin):</strong> Standard for adult strongyles and bots. Moxidectin is highly effective against encysted small strongyle larvae.</li>
              <li><strong>Pyrazines (Praziquantel):</strong> Combined with ivermectin or moxidectin to kill Tapeworms (essential in late Fall).</li>
              <li><strong>Benzimidazoles (Fenbendazole, Oxybendazole):</strong> Frequently used in young horses for Ascarids. Rapidly losing efficacy against adult strongyles.</li>
            </ul>
          </article>
        );

      case 'mare-gestation':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">The Complete Equine Gestation and Foaling Guide</h3>
            <p>
              The average gestation period for a pregnant mare is **340 days**, though a normal, healthy pregnancy can range anywhere from 320 to 365 days. Managing a pregnant mare requires meticulous tracking of developmental milestones and preventative veterinary care to ensure both mare and foal remain healthy.
            </p>

            <h4 className="font-bold text-text-main">Trimester Management Highlights:</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>First Trimester (Days 1 - 110):</strong> Most critical phase for embryonic attachment. Ensure pasture is free of toxic tall fescue grass (endophytes can cause red bag delivery or lack of colostrum). Verify single pregnancy on Day 14.</li>
              <li><strong>Second Trimester (Days 111 - 220):</strong> Fetal growth is slow but structural. Maintain basic maintenance feed rations. The mare should remain in light work if conditioned.</li>
              <li><strong>Third Trimester (Days 221 - Birth):</strong> 70% of fetal growth occurs now. Increase energy, protein, and mineral density in feed. Vaccinate for Equine Herpesvirus-1 (EHV-1) at months 5, 7, and 9 to prevent abortion.</li>
            </ul>

            <h4 className="font-bold text-text-main">Signs of Impending Foaling:</h4>
            <p>
              As the expected due date approaches, monitor the mare for these structural changes:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Bagging Up:</strong> Udder enlargement starts 2-4 weeks prior to foaling.</li>
              <li><strong>Waxing:</strong> Small droplets of amber wax appear on the teat tips 24-48 hours before delivery.</li>
              <li><strong>Relaxed Pelvis:</strong> Tailhead ligaments soften and hollow out a few days before.</li>
              <li><strong>Restlessness:</strong> Pawing, sweating, looking at flank (indicates Stage 1 labor).</li>
            </ol>
          </article>
        );

      case 'feed-cost':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">Strategic Equine Nutrition Budgeting</h3>
            <p>
              Feeding horses is often the largest recurring monthly expense in stable management. Building a precise forage-first budget helps prevent waste, optimizes nutritional value, and manages cash flow.
            </p>

            <h4 className="font-bold text-text-main">The Forage-First Philosophy</h4>
            <p>
              The equine digestive system evolved to digest continuous quantities of fiber. A healthy horse should consume **1.5% to 2.5% of their body weight in forage (hay or pasture) daily**. For a typical 1,000-pound horse, this means 15 to 25 pounds of clean hay per day. Concentrate feeds (grains) should only be used to bridge caloric gaps or deliver vital vitamins.
            </p>

            <h4 className="font-bold text-text-main">Tips to Minimize Hay and Feed Waste:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Use Slow Feed Nets:</strong> Feeding loose hay on the stall floor results in up to 30% waste from trampling and urine contamination. Slow-feeders reduce this waste to under 5%.</li>
              <li><strong>Buy Hay by Weight, Not by Bale:</strong> A "bale of hay" can weigh 40 lbs or 80 lbs. Calculating cost per pound is the only accurate way to compare hay suppliers.</li>
              <li><strong>Store Feed in Airtight Metal Bins:</strong> Rodents contaminate feed bags rapidly. Storing feed in heavy bins prevents spoilage and feed-loss.</li>
            </ul>
          </article>
        );

      case 'riding-log':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">How Keeping a Training Journal Accelerates Progress</h3>
            <p>
              Whether you are preparing for a Grand Prix Dressage test, a 100-mile endurance run, or simply training a green horse, documentation is your greatest tool. Consistent journaling helps you identify plateaus, monitor physical fatigue, and cultivate consistent habits.
            </p>

            <h4 className="font-bold text-text-main">What to Track in Your Riding Log:</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Warm-Up Responsiveness:</strong> How long did it take the horse to stretch down and accept the bit?</li>
              <li><strong>Arena Workload:</strong> Balance left vs. right rein, lateral movements attempted, and quality of transitions.</li>
              <li><strong>Recovery Heart Rate:</strong> How quickly did the respiratory rate return to resting? (Indicates athletic conditioning).</li>
              <li><strong>Ground/Stiff Conditions:</strong> Note hard arena footing, heavy mud, or steep hills to correlate with hoof or joint soreness.</li>
            </ul>
          </article>
        );

      case 'show-checklist':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">Pro Competitor Tips for Horse Show Preparation</h3>
            <p>
              Showing horses is an exciting, demanding process. Forgetting a crucial piece of gear—like your horse's negative Coggins paperwork or a custom show bridle—can disqualify you before you even enter the ring. Use our discipline-specific checklist generator to ensure a flawless travel day.
            </p>

            <h4 className="font-bold text-text-main">The "Three-Ring Binder" Rule for Show Administration</h4>
            <p>
              Keep a dedicated, waterproof folder in your towing vehicle containing:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Negative Coggins Test:</strong> Must be current within 12 months (or 6 months for some state lines).</li>
              <li><strong>Health Certificate (CVI):</strong> Required for interstate hauling, issued within 30 days.</li>
              <li><strong>Vaccination Records:</strong> Keep detailed logs of Flu/Rhino boosters given within 6 months (often required for USEF/USDF sanctioned events).</li>
            </ul>
          </article>
        );

      case 'body-condition':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">An In-Depth Guide to the Henneke 1-9 BCS System</h3>
            <p>
              Developed by Dr. Don Henneke in 1983, the **Henneke Body Condition Score (BCS)** is a standardized visual and palpable scoring system used by veterinarians, animal welfare officers, and nutritionists. It evaluates fat deposits on specific skeletal target zones to determine dietary adequacy.
            </p>

            <h4 className="font-bold text-text-main">The Six Key Fat Evaluation Zones:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>The Crest:</strong> Check for hard or soft fat buildup along the top of the neck.</li>
              <li><strong>The Withers:</strong> Check if spinal processes are visible or buried in fat padding.</li>
              <li><strong>Behind the Shoulder:</strong> Feel the area immediately behind the shoulder blade for fat deposits.</li>
              <li><strong>The Ribs:</strong> Visually assess and run fingers across the ribs. Can they be felt under light pressure?</li>
              <li><strong>The Loin (Spine):</strong> Does the spine form a ridge (underweight), a flat line (ideal), or a gutter crease (obese)?</li>
              <li><strong>The Tailhead:</strong> Assess the soft tissue around the tail. Is it hollow, spongy, or bulging with hard fat cushions?</li>
            </ol>
          </article>
        );

      case 'age-converter':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">Understanding Horse Longevity and Lifespan Factors</h3>
            <p>
              Many equestrians multiply a horse's age by 3 to estimate their human equivalent. However, this simple rule is inaccurate. Equine aging curves are highly non-linear, with rapid physical development occurring in the first two years of life followed by a gradual biological deceleration.
            </p>

            <h4 className="font-bold text-text-main">Breed and Size Longevity Variances:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Ponies (Shetlands, Welsh):</strong> Extremely long-lived. It is not uncommon for healthy ponies to remain active and healthy well into their mid-to-late 30s.</li>
              <li><strong>Light Breeds (Arabians, Quarter Horses):</strong> Average lifespans range from 25 to 30 years. Arabians are particularly famous for maintaining physical soundness in advanced age.</li>
              <li><strong>Draft Breeds (Clydesdales, Shires):</strong> Due to their massive skeletal load, draft horses age slightly faster. Seniors are generally classified at 18+ years rather than 20+.</li>
            </ul>
          </article>
        );

      case 'medication-dosage':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">Equine Medication Safety Guidelines</h3>
            <p>
              Equine veterinary pharmacology is highly specialized. Administering incorrect medications—or standard medications at improper dosages—can result in devastating clinical outcomes, including gastric bleeding, kidney damage, or death.
            </p>

            <h4 className="font-bold text-text-main text-red-700">Crucial Drug Safety Warnings:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-red-950 bg-red-50 p-4 rounded-xl border border-red-200">
              <li><strong>Banamine (Flunixin) IM Injection Risk:</strong> NEVER inject liquid Banamine into the neck muscles. If the solution is contaminated, it can trap anaerobic bacteria, causing rapid Gas Gangrene (clostridial myonecrosis) which is 80% fatal. Always administer liquid Banamine orally if IV access is unavailable.</li>
              <li><strong>NSAID Stacking Danger:</strong> Do not give Phenylbutazone (Bute) and Banamine simultaneously. "Stacking" these anti-inflammatories doesn't increase pain relief; instead, it synergizes toxicity, causing profound stomach ulcers and right dorsal colitis.</li>
              <li><strong>Dewormer Safety Margins:</strong> Moxidectin (Quest) has a very narrow safety profile. Overdosing by even 20% can cause lethargy, respiratory depression, or coma in smaller, younger, or geriatric horses.</li>
            </ul>
          </article>
        );

      case 'saddle-fit':
        return (
          <article className="prose prose-stone max-w-none mt-12 pt-8 border-t border-border-card/40 space-y-6 text-sm text-text-muted">
            <h3 className="text-xl font-bold text-text-main">The Importance of Proper Saddle Fitting</h3>
            <p>
              Your horse's back is a complex system of muscles, ligaments, and nerves designed for locomotion—not for carrying rider weight. An ill-fitting saddle tree restricts shoulder movement, pinches spinal processes, and creates severe focal pressure points that result in pain, behavioral problems, and gait asymmetry.
            </p>

            <h4 className="font-bold text-text-main">The "Four Golden Rules" of Saddle Fitting:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Gullet Clearance:</strong> There must be at least 2 to 3 fingers of clearance between the pommel (underaffiliated) and the horse's withers when a rider is fully mounted.</li>
              <li><strong>Spinal Channel Width:</strong> The channel must be wide enough that the saddle panels rest completely on the rib support muscles (longissimus dorsi), never touching the vertebrae or ligament.</li>
              <li><strong>Angle matching:</strong> The angle of the gullet tree must exactly match the slope of the horse's shoulders. A mismatch causes pinching at the top or bottom of the tree.</li>
              <li><strong>No Bridging:</strong> The panels must contact the back evenly from front to back. Gaps in the center concentrate weight onto small spots, leading to muscle atrophy (white hairs).</li>
            </ol>
          </article>
        );

      default:
        return null;
    }
  };

  // Find previous and next tools for quick sub-navigation
  const currentIndex = TOOLS.findIndex((t) => t.id === tool.id);
  const prevTool = currentIndex > 0 ? TOOLS[currentIndex - 1] : TOOLS[TOOLS.length - 1];
  const nextTool = currentIndex < TOOLS.length - 1 ? TOOLS[currentIndex + 1] : TOOLS[0];

  const breadcrumbItems = [
    { label: tool.category },
    { label: tool.title, path: tool.path }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-fade-in">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbItems} onNavigate={onNavigate} />

      {/* Tool Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <span>{tool.emoji}</span>
          <span>{tool.category}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight font-serif mb-3">
          {tool.title}
        </h1>
        <p className="text-sm md:text-base text-text-muted leading-relaxed no-print">
          {tool.shortDesc}
        </p>
      </div>

      {/* Interactive Tool Component Area */}
      <div className="relative">
        {children}
      </div>

      {/* Previous and Next Tool Navigation */}
      <div className="max-w-4xl mx-auto mt-8 flex items-center justify-between gap-4 border-y border-border-card/30 py-4 no-print">
        {prevTool && (
          <a
            href={prevTool.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(prevTool.path);
            }}
            className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-primary transition-colors group text-left cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-white border border-border-card flex items-center justify-center text-xs group-hover:bg-primary-light group-hover:text-primary transition-colors">
              <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-0.5"></i>
            </span>
            <div>
              <span className="block text-[10px] text-text-muted font-normal">Previous Tool</span>
              <span className="block font-serif text-text-main group-hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">{prevTool.title}</span>
            </div>
          </a>
        )}

        {nextTool && (
          <a
            href={nextTool.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(nextTool.path);
            }}
            className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-primary transition-colors group text-right cursor-pointer"
          >
            <div className="order-1 sm:order-none">
              <span className="block text-[10px] text-text-muted font-normal">Next Tool</span>
              <span className="block font-serif text-text-main group-hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">{nextTool.title}</span>
            </div>
            <span className="w-8 h-8 rounded-full bg-white border border-border-card flex items-center justify-center text-xs group-hover:bg-primary-light group-hover:text-primary transition-colors">
              <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-0.5"></i>
            </span>
          </a>
        )}
      </div>

      {/* Rich Educational Text Block below the fold */}
      <div className="max-w-4xl mx-auto mt-12">
        {getSEOCopy()}
      </div>

      {/* Related Tools section */}
      <div className="max-w-4xl mx-auto">
        <RelatedTools currentToolId={tool.id} allTools={TOOLS} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
