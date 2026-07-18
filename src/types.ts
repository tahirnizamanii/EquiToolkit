export type ToolId =
  | 'weight-calculator'
  | 'blanketing-guide'
  | 'foal-color'
  | 'deworming'
  | 'mare-gestation'
  | 'feed-cost'
  | 'riding-log'
  | 'show-checklist'
  | 'body-condition'
  | 'age-converter'
  | 'medication-dosage'
  | 'saddle-fit'
  | 'height-converter'
  | 'water-intake'
  | 'boarding-cost'
  | 'pasture-size';

export interface Tool {
  id: ToolId;
  title: string;
  metaTitle: string;
  metaDesc: string;
  shortDesc: string;
  category: 'Health & Care' | 'Management' | 'Genetics' | 'Training & Prep';
  emoji: string;
  path: string;
}

export interface RideEntry {
  id: string;
  date: string;
  duration: number; // minutes
  discipline: string;
  horseName: string;
  notes: string;
}
