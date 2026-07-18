export interface PrintableField {
  label: string;
  type: 'text' | 'checkbox' | 'date' | 'table';
  placeholder?: string;
  columns?: string[];
  rows?: Record<string, string>[];
}

export interface PrintableResource {
  id: string;
  title: string;
  description: string;
  category: string;
  instructions: string;
  sections: {
    title: string;
    items?: string[];
    fields?: PrintableField[];
  }[];
}

export const PRINTABLES: PrintableResource[] = [
  {
    id: 'horse-show-checklist',
    title: "Horse Show Prep & Packing Checklist",
    description: "A comprehensive packing list divided by category to ensure you never leave crucial gear behind on show day.",
    category: "Show & Competition",
    instructions: "Fill out the horse and rider details, check off items as they are packed into the trailer, and print this page for stable-side reference.",
    sections: [
      {
        title: "Horse Identification & Documentation",
        items: [
          "Coggins Test Certificate (current negative)",
          "Health Certificate (if crossing state lines)",
          "Registration Papers / Membership Cards",
          "Show Entry Confirmation & Back Numbers",
          "CVI / Vaccination Record booklet"
        ]
      },
      {
        title: "Tack & Equipment",
        items: [
          "Saddle (with correct girth and stirrups)",
          "Bridle (and spare bit/reins)",
          "Saddle Pads (schooling and show white pads)",
          "Halter & Leather Lead Shank (with chain)",
          "Protective Boots / Polo Wraps / Bell Boots",
          "Stud kit (if competing on grass studs)"
        ]
      },
      {
        title: "Grooming & Presentation",
        items: [
          "Hard & Soft Body Brushes, Hoof Pick",
          "Mane/Tail comb, ShowSheen / Detangler",
          "Fly Spray & Grooming Towels",
          "Banding/Braiding rubber bands, yarn, wax thread, scissors",
          "Baby powder (for white legs) & Hoof Polish (black or clear)",
          "Sponges (eyes/nose and sweat wiping)"
        ]
      },
      {
        title: "Stable Supplies & Feeding",
        items: [
          "Water buckets (at least 2) & hanging snaps",
          "Feed bucket & pre-measured grain bags",
          "Hay nets stuffed with fresh orchard/alfalfa hay",
          "Manure fork, rake, muck bucket",
          "First Aid Kit (Vetwrap, thermometer, antiseptics)",
          "Cross-ties / Stall ties"
        ]
      },
      {
        title: "Rider Attire",
        items: [
          "Helmet (ASTM/SEI approved)",
          "Show jacket, Breeches/Jodhpurs, Show shirt",
          "Tall riding boots / Paddock boots & Half chaps",
          "Gloves, Hairnet, Collar pins / Stock tie",
          "Boot horn, boot jack, polishing cloth",
          "Change of comfortable clothes & rain jacket"
        ]
      }
    ]
  },
  {
    id: 'foaling-checklist',
    title: "Foaling Preparation & Emergency Checklist",
    description: "Essential preparations, monitoring schedules, and milestone checklists for foaling mares and newborns.",
    category: "Breeding",
    instructions: "Keep this checklist hanging on the stall door or tack room bulletin board. Note down your vet's emergency contact info at the top.",
    sections: [
      {
        title: "Emergency Contacts",
        fields: [
          { label: "Equine Veterinarian", type: "text", placeholder: "Dr. Name - (555) 000-0000" },
          { label: "Back-up Vet / Clinic", type: "text", placeholder: "Clinic Name - (555) 000-0000" },
          { label: "Stud Farm Manager", type: "text", placeholder: "Manager Name - (555) 000-0000" }
        ]
      },
      {
        title: "The Foaling Kit Supplies",
        items: [
          "Clean towels (plenty of them for drying)",
          "Chlorhexidine (0.5%) or 7% Iodine cup for dipping navel",
          "Fleet enema (for newborn's meconium release)",
          "Tail wrap (for the mare's tail during delivery)",
          "Surgical gloves, antiseptic soap, lubrication gel",
          "Flashlight (with fresh batteries), notebook, pen",
          "Bale string (to tie placenta up if hanging)"
        ]
      },
      {
        title: "The 1-2-3 Rule Milestones (CRITICAL)",
        items: [
          "Hour 1: Foal should be STANDING on its own feet.",
          "Hour 2: Foal should be NURSING vigorously, receiving colostrum.",
          "Hour 3: Mare should pass the PLACENTA completely (save in a bucket for vet inspection)."
        ]
      },
      {
        title: "Newborn Foal Progress Log",
        fields: [
          { label: "Foaling Date & Time", type: "text" },
          { label: "Time of Standing", type: "text" },
          { label: "Time of First Nursing", type: "text" },
          { label: "Meconium Released? (Yes/No)", type: "text" },
          { label: "Time Placenta Passed", type: "text" }
        ]
      }
    ]
  },
  {
    id: 'deworming-calendar',
    title: "Strategic Deworming Calendar & Log",
    description: "Ditch rotational schedules. Track fecal egg counts (FEC) and log targeted deworming treatments.",
    category: "Health & Care",
    instructions: "Test feces in Spring and Fall. Only administer dewormers matching your shedder classification.",
    sections: [
      {
        title: "Horse Health Classification",
        fields: [
          { label: "Horse Name", type: "text" },
          { label: "Shedder Status", type: "text", placeholder: "Low / Medium / High" },
          { label: "Spring FEC Result (EPG)", type: "text" },
          { label: "Fall FEC Result (EPG)", type: "text" }
        ]
      },
      {
        title: "Deworming Treatment Log",
        fields: [
          {
            label: "Log Table",
            type: "table",
            columns: ["Date", "Target Parasite", "Active Ingredient", "Product Name", "Dosage (lbs)", "Administered By"],
            rows: [
              { "Date": "            ", "Target Parasite": "Tapeworms, Botfly", "Active Ingredient": "Ivermectin/Praziquantel", "Product Name": "Equimax / Zimecterin Gold" },
              { "Date": "            ", "Target Parasite": "Strongyles", "Active Ingredient": "Moxidectin", "Product Name": "Quest" },
              { "Date": "            ", "Target Parasite": "Encysted Strongyles", "Active Ingredient": "Fenbendazole Double-Dose", "Product Name": "Panacur Powerpac" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'vaccination-record',
    title: "Equine Vaccination & Immunization Record",
    description: "Durable log of core and risk-based vaccinations. Highly recommended for traveling or boarding stables.",
    category: "Health & Care",
    instructions: "Have your veterinarian sign off on each immunization. Keep copy of this printed log in your truck/trailer.",
    sections: [
      {
        title: "Horse Profile",
        fields: [
          { label: "Registered Name", type: "text" },
          { label: "Barn Name", type: "text" },
          { label: "Microchip #", type: "text" },
          { label: "Year of Birth", type: "text" }
        ]
      },
      {
        title: "Core Vaccines Log (Annual)",
        fields: [
          {
            label: "Core Vaccines",
            type: "table",
            columns: ["Vaccine Name", "Target Diseases", "Date Given", "Lot / Serial #", "Vet Signature"],
            rows: [
              { "Vaccine Name": "West Nile", "Target Diseases": "West Nile Virus (WNV)" },
              { "Vaccine Name": "Rabies", "Target Diseases": "Rabies virus" },
              { "Vaccine Name": "Tetanus Toxoid", "Target Diseases": "Clostridium tetani" },
              { "Vaccine Name": "EEE / WEE", "Target Diseases": "Eastern/Western Encephalomyelitis" }
            ]
          }
        ]
      },
      {
        title: "Risk-Based Vaccines (Semi-Annual / Optional)",
        fields: [
          {
            label: "Risk Vaccines",
            type: "table",
            columns: ["Vaccine Name", "Target Diseases", "Date Given", "Lot / Serial #", "Vet Signature"],
            rows: [
              { "Vaccine Name": "Strangles", "Target Diseases": "Streptococcus equi" },
              { "Vaccine Name": "Flu/Rhino", "Target Diseases": "Influenza / Rhinopneumonitis (EHV-1/4)" },
              { "Vaccine Name": "Potomac Horse Fever", "Target Diseases": "Neorickettsia risticii" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'farrier-schedule',
    title: "Farrier Appointment Schedule & Hoof Tracker",
    description: "Keep track of trim intervals, shoe styles, hoof conditions, and upcoming shoeing schedules.",
    category: "Stable Management",
    instructions: "Aim for consistent 4-8 week intervals depending on breed, workload, and season. Share notes with your farrier.",
    sections: [
      {
        title: "Hoof Specifications",
        fields: [
          { label: "Hoof Type", type: "text", placeholder: "Barefoot / Front Shoes Only / Four Shoes" },
          { label: "Shoe Size & Material", type: "text", placeholder: "Steel / Aluminum / Custom pads" },
          { label: "Farrier Name & Phone", type: "text" }
        ]
      },
      {
        title: "Farrier Visit Ledger",
        fields: [
          {
            label: "Ledger",
            type: "table",
            columns: ["Visit Date", "Type of Service", "Interval (Weeks)", "Cost ($)", "Farrier Signature / Notes"],
            rows: [
              { "Visit Date": "            ", "Type of Service": "Trim & Hot Shoe Fronts", "Interval (Weeks)": "6 weeks" },
              { "Visit Date": "            ", "Type of Service": "Barefoot Trim", "Interval (Weeks)": "5 weeks" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'feeding-log',
    title: "Daily Stable Feeding & Grain Ledger",
    description: "Stall-side feeding instruction poster. Helps barn staff measure the exact rations of hay, grain, and supplements.",
    category: "Stable Management",
    instructions: "Fill this sheet out and laminate it. Place on the horse's stall door to prevent feeding errors.",
    sections: [
      {
        title: "Basic Profile",
        fields: [
          { label: "Horse Name", type: "text" },
          { label: "Stall Number", type: "text" },
          { label: "Special Dietary Warning", type: "text", placeholder: "NO SWEET FEED / INSULIN SENSITIVE / ALERGES" }
        ]
      },
      {
        title: "Daily Feeding Schedule",
        fields: [
          {
            label: "Schedule",
            type: "table",
            columns: ["Mealtime", "Hay Type & Amount (flakes/lbs)", "Grain Brand & Amount (scoops/lbs)", "Supplements & Medications"],
            rows: [
              { "Mealtime": "Morning (AM)", "Hay Type & Amount (flakes/lbs)": "2 flakes Timothy", "Grain Brand & Amount (scoops/lbs)": "1 lb Senior Pellet", "Supplements & Medications": "1 scoop Joint Supplement" },
              { "Mealtime": "Lunch (Noon)", "Hay Type & Amount (flakes/lbs)": "1 flake Timothy" },
              { "Mealtime": "Night (PM)", "Hay Type & Amount (flakes/lbs)": "2 flakes Timothy + 1 flake Alfalfa", "Grain Brand & Amount (scoops/lbs)": "1 lb Senior Pellet", "Supplements & Medications": "Prascend (1 tablet)" }
            ]
          }
        ]
      }
    ]
  }
];
