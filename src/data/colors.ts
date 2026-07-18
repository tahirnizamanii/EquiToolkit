export interface ColorDatabaseEntry {
  id: string;
  name: string;
  genetics: string;
  characteristics: string;
  description: string;
  faqs: { question: string; answer: string }[];
  linkingNote: string;
}

export const COAT_COLORS: ColorDatabaseEntry[] = [
  {
    id: 'bay',
    name: "Bay",
    genetics: "Requires at least one dominant Extension gene (E) and one dominant Agouti gene (A). Genetic formula: E_ A_.",
    characteristics: "Reddish-brown body (ranging from light tan to dark mahogany) with black 'points' on the mane, tail, ear tips, and lower legs.",
    description: "Bay is one of the most common and foundational coat colors in horses. The base color is actually black (E), but the Agouti gene (A) restricts the black pigment to the points (legs, mane, tail, ears) and allows the reddish-red pheomelanin base to show on the body.",
    faqs: [
      {
        question: "What is the difference between a dark bay and a black horse?",
        answer: "A dark bay horse has reddish or brown highlights on its muzzle, flank, or eyes, and its body is technically a very deep brown, whereas a true black horse is completely black without any brown highlights (except for sun-bleaching)."
      },
      {
        question: "Can two bay horses produce a chestnut foal?",
        answer: "Yes. If both bay parents carry the recessive red allele (Ee) and the Agouti allele, they have a 25% chance of passing on 'ee', which results in a chestnut coat."
      }
    ],
    linkingNote: "Predict the likelihood of a bay foal with our Foal Color Predictor by selecting the Agouti and Extension profiles of your sire and dam!"
  },
  {
    id: 'black',
    name: "Black",
    genetics: "Requires at least one dominant Extension gene (E) and homozygous recessive Agouti genes (aa). Genetic formula: E_ aa.",
    characteristics: "Entire coat is solid black, including the muzzle, flanks, and lower limbs, without any red or brown shading.",
    description: "True black is a relatively rare base coat color. Many horses that look black are actually dark bays or brown. A true black horse possesses the dominant Extension gene (E) to produce black pigment, but lacks the dominant Agouti gene (A) that would restrict black pigment to the extremities.",
    faqs: [
      {
        question: "Why does my black horse turn brown in the summer?",
        answer: "This is known as sun-bleaching. UV rays break down the melanin pigments in the hair, causing it to take on a rusty, brown tint. Providing a UV-sheet or shade can prevent this."
      },
      {
        question: "Are black horses born jet black?",
        answer: "No, most black foals are born a mousy gray or dun-like color. They shed out their foal coat to reveal their true, coal-black adult coat."
      }
    ],
    linkingNote: "Use our Foal Color Predictor to see if your black horse carries a hidden recessive red gene (Ee) that could yield chestnut offspring!"
  },
  {
    id: 'chestnut',
    name: "Chestnut",
    genetics: "Homozygous recessive Extension gene (ee), regardless of Agouti status. Genetic formula: ee __.",
    characteristics: "Reddish-golden to dark coppery-brown body, mane, and tail. The mane and tail can sometimes be 'flaxen' (blonde). No black pigment exists in the coat.",
    description: "Chestnut is a primary base color in horses, also frequently called 'sorrel' (specifically in Quarter Horses and Western circles). It is entirely recessive; because chestnut horses are 'ee', they cannot produce black pigment in their skin hair follicles, leaving only red pigment (pheomelanin).",
    faqs: [
      {
        question: "Can two chestnut horses produce a bay or black foal?",
        answer: "No. Since chestnut is homozygous recessive (ee), two chestnuts can only pass on the 'e' allele. Therefore, breeding two chestnuts together will yield a chestnut foal 100% of the time."
      },
      {
        question: "What is a flaxen chestnut?",
        answer: "A flaxen chestnut has a typical reddish-brown body but a light golden or blonde mane and tail. This is caused by a genetic modifier that acts on the red pigment in the hair."
      }
    ],
    linkingNote: "Want to see why breeding two chestnuts guarantees a chestnut foal? Test it out in our Foal Color Predictor!"
  },
  {
    id: 'grey',
    name: "Gray",
    genetics: "Caused by a dominant Gray gene (G). A horse only needs one copy of G to turn gray. Genetic formula: G_.",
    characteristics: "Born any solid base color, then progressively loses pigment over time, eventually appearing completely white or flecked (flea-bitten) with age.",
    description: "Gray is not actually a color, but a progressive depigmentation process, much like human hair turning gray but much more comprehensive. Underneath their gray hair, gray horses have dark black skin, distinguishing them from true white horses which have pink skin.",
    faqs: [
      {
        question: "Is there a difference between a white horse and a gray horse?",
        answer: "Yes. True white horses are born white and have pink skin. Gray horses are born dark (black, bay, etc.) and progressively turn white over several years, but always retain dark charcoal-colored skin."
      },
      {
        question: "Why do gray horses get melanomas?",
        answer: "Over 75% of gray horses over the age of 15 develop dermal melanomas. This is directly linked to the rapid pigment-producing metabolic pathways that occur during the progressive graying of the hair follicles."
      }
    ],
    linkingNote: "Gray is a highly dominant modifier. See how grey overrides all other base colors in our Foal Color Predictor."
  },
  {
    id: 'palomino',
    name: "Palomino",
    genetics: "A chestnut base (ee) with a single copy of the dominant Cream dilution gene (CCr). Genetic formula: ee nCr.",
    characteristics: "Golden, yellow, or cream-colored body with a pure white or flaxen mane and tail.",
    description: "The classic 'golden horse.' Palomino is produced by a single Cream dilution gene acting on a red (chestnut) base coat. The single cream allele dilutes the red body hair to gold, and dilutes the mane and tail to near-white.",
    faqs: [
      {
        question: "Can you breed two Palominos to get another Palomino?",
        answer: "Yes, but it is not guaranteed. Breeding two Palominos (ee nCr) has only a 50% chance of yielding a Palomino, a 25% chance of a chestnut (ee nn), and a 25% chance of a double-dilute Cremello (ee CrCr)."
      },
      {
        question: "How do you get a guaranteed Palomino?",
        answer: "Breeding a chestnut (ee nn) to a double-dilute Cremello (ee CrCr) will result in a Palomino foal 100% of the time, as the foal must inherit one cream allele and one non-cream allele."
      }
    ],
    linkingNote: "Calculate your chances of producing a golden Palomino foal based on your parents' cream genes using our Foal Color Predictor!"
  },
  {
    id: 'buckskin',
    name: "Buckskin",
    genetics: "A bay base (E_ A_) with a single copy of the dominant Cream dilution gene (CCr). Genetic formula: E_ A_ nCr.",
    characteristics: "Warm tan, gold, or cream body with solid black points (legs, mane, tail, and ear tips).",
    description: "A buckskin has a bay base coat that is diluted by a single copy of the Cream gene. The Cream gene acts on the red pigment of the bay body, diluting it to gold, but has virtually no effect on the black pigment of the points, keeping them stark black.",
    faqs: [
      {
        question: "Is a buckskin the same as a dun?",
        answer: "No. Buckskins are diluted by the Cream gene and do not have primitive markings. Duns are diluted by the Dun gene and always have a dark dorsal stripe, leg bars, and shoulder shadows."
      },
      {
        question: "Can a buckskin carry the recessive red gene?",
        answer: "Yes. If a buckskin has the genotype Ee Aa nCr, it carries the red 'e' gene, which means it can produce chestnut or palomino foals if bred to the right partner."
      }
    ],
    linkingNote: "Check if your buckskin mare can produce a cream double-dilute using the Foal Color Predictor!"
  },
  {
    id: 'dun',
    name: "Dun",
    genetics: "Caused by the dominant Dun gene (D). Genetic formula: D_ (acting on any base color).",
    characteristics: "Diluted body color (ranging from tan/yellow to slate gray) accompanied by prominent primitive markings: a dark dorsal stripe, leg bars, and a shoulder bar.",
    description: "Dun is an ancient, wild-type dilution gene. Unlike Cream, it dilutes both red and black pigments. It is characterized by the presence of primitive markings, particularly a sharp, dark dorsal stripe running down the spine and horizontal zebra-like stripes on the legs.",
    faqs: [
      {
        question: "What are the common types of Dun?",
        answer: "Classic Dun (on a bay base, often called Bay Dun), Red Dun (on a chestnut base, reddish stripes), and Grulla (on a black base, slate gray body with dark gray/black stripes)."
      },
      {
        question: "Does a dun horse have to have a dorsal stripe?",
        answer: "Yes. The dorsal stripe is the absolute hallmark of the Dun gene. If a horse has no dorsal stripe, it is likely a buckskin or palomino, not a true dun."
      }
    ],
    linkingNote: "Test how the ancient Dun gene interacts with base colors using our Foal Color Predictor."
  },
  {
    id: 'roan',
    name: "Roan",
    genetics: "Caused by the dominant Roan gene (Rn). Genetic formula: Rn_.",
    characteristics: "White hairs evenly intermingled with any base color, but the head, lower legs, mane, and tail remain solid dark colored.",
    description: "Roan is a pattern of white hairs mixed into a solid coat base. Because the head and legs do not get diluted, the horse retains its original base color in those areas, creating a beautiful high-contrast look (such as Blue Roan on black, or Strawberry Roan on chestnut).",
    faqs: [
      {
        question: "Does a roan horse's coat change with age?",
        answer: "Unlike grays, roan horses are born roan and do not get lighter as they grow older. However, their coats can change seasonal shade, often looking lighter in the winter."
      },
      {
        question: "What is a 'corn mark' on a roan?",
        answer: "When a roan horse gets a scratch or cut, the hair grows back in the solid base color rather than white, leaving a dark mark known as a 'corn mark'."
      }
    ],
    linkingNote: "See how the Roan gene interacts with bay, black, and chestnut bases in our Foal Color Predictor!"
  },
  {
    id: 'cremello',
    name: "Cremello",
    genetics: "A chestnut base (ee) with two copies of the dominant Cream dilution gene. Genetic formula: ee CrCr.",
    characteristics: "Cream-colored or off-white body, white or ivory mane and tail, bright pink skin, and pale blue eyes.",
    description: "Cremello is a double-dilute coat color. When a horse inherits two copies of the Cream gene on a chestnut base, both red body hair and white extremities are diluted to a pale ivory-cream hue, and the eyes turn blue due to lack of pigment.",
    faqs: [
      {
        question: "Are Cremello horses albino?",
        answer: "No. There is no such thing as a true albino horse. Cremellos have blue eyes and cream hair, and their genetics are fully mapped. They are simply double-dilute chestnuts."
      },
      {
        question: "Do Cremello horses sunburn easily?",
        answer: "Yes. Because they have pink skin with very little protective melanin, they are highly susceptible to sunburn on their muzzles, eyelids, and white patches."
      }
    ],
    linkingNote: "Breed a Cremello to a Chestnut to get 100% Palominos. Check the Foal Color Predictor to verify the math!"
  },
  {
    id: 'perlino',
    name: "Perlino",
    genetics: "A bay base (E_ A_) with two copies of the dominant Cream dilution gene. Genetic formula: E_ A_ CrCr.",
    characteristics: "Pale cream or off-white body, but the points (mane, tail, lower legs) are slightly darker rust-colored or orange-tinted. Blue eyes and pink skin.",
    description: "Perlino is a double-dilute, very similar to Cremello. However, because it has a bay base, the black points are not completely bleached out; instead, they remain as a distinct reddish-gold or orange shadow against the cream body.",
    faqs: [
      {
        question: "How do you tell a Cremello and a Perlino apart?",
        answer: "A Cremello has an evenly cream-colored mane and tail, whereas a Perlino has noticeably darker, light-orange or rusty-brown points on its mane, tail, and legs."
      },
      {
        question: "Will breeding a Perlino guarantee a dilute foal?",
        answer: "Yes. Since a Perlino has two copies of the Cream gene (CrCr), it will always pass on at least one copy of Cream to every single offspring, ensuring a dilute foal."
      }
    ],
    linkingNote: "See what happens when you cross a Perlino with a black base in our Foal Color Predictor!"
  },
  {
    id: 'pinto',
    name: "Pinto",
    genetics: "Caused by various white-spotting genes, most commonly Tobiano (TO), Frame Overo (O), or Sabino (Sb).",
    characteristics: "Sizable, irregular patches of white hair mixed with any other solid horse coat color, sitting on pink skin underneath.",
    description: "Pinto is an overarching term for colored horses with white patches. While 'Paint' is a breed registered based on Quarter Horse lineage, 'Pinto' is any breed of horse exhibiting this striking white-spotted pattern. The primary patterns are Tobiano, Overo, and Tovero.",
    faqs: [
      {
        question: "Is a Paint horse the same as a Pinto?",
        answer: "No. Pinto refers to any horse with spotted white patches regardless of breed. Paint is a specific breed registered with the American Paint Horse Association (APHA), limited to horses with Quarter Horse or Thoroughbred bloodlines."
      },
      {
        question: "What is the Lethal White syndrome in Pintos?",
        answer: "Breeding two Frame Overo (O) horses carries a 25% risk of producing an all-white foal that lacks a functioning digestive tract (Lethal White Foal Syndrome). These foals cannot survive."
      }
    ],
    linkingNote: "Ensure breeding safety by modeling Overo patterns and predicting white-spotting profiles with our Foal Color Predictor."
  },
  {
    id: 'appaloosa-color',
    name: "Appaloosa Pattern",
    genetics: "Caused by the Leopard Complex gene (Lp) paired with various patterning modifier genes (PATN1).",
    characteristics: "Spotted coat pattern (leopard, blanket, or varnished), accompanied by mottled skin, striped hooves, and white sclera.",
    description: "The Appaloosa pattern is one of the most genetically complex. The Leopard gene (Lp) enables spotting, while modifier genes dictate whether the spots appear as a blanket over the hips, a full leopard pattern, or a frost-like roan shimmer.",
    faqs: [
      {
        question: "Why do Appaloosa horses get night blindness?",
        answer: "Horses that are homozygous for the Lp gene (LpLp) suffer from Congenital Stationary Night Blindness (CSNB), which means they cannot see in low-light or dark settings from birth."
      },
      {
        question: "Do Appaloosa spots change?",
        answer: "Varnish roan Appaloosas are born dark and slowly develop white spots and a lighter coat as they age, leaving dark areas only over bony prominences like the knees and hips."
      }
    ],
    linkingNote: "Calculate leopard complex probabilities for your next breeding using our Foal Color Predictor!"
  }
];
