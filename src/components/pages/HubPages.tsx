import React, { useState, useEffect } from 'react';
import { TOOLS } from '../../data';
import { BREEDS, Breed } from '../../data/breeds';
import { COAT_COLORS, ColorDatabaseEntry } from '../../data/colors';
import { ARTICLES, Article } from '../../data/articles';
import { PRINTABLES, PrintableResource } from '../../data/printables';
import { SectionHeading, ToolCard, AlertBox, Breadcrumbs } from '../common/UIComponents';

interface HubPageProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

// ==========================================
// 1. CATEGORY HUB PAGES COMPONENT
// ==========================================
export function CategoryHubPage({ onNavigate, currentPath }: HubPageProps) {
  // Determine category based on route
  let categoryName: 'Health & Care' | 'Management' | 'Genetics' | 'Training & Prep' = 'Health & Care';
  let title = "Horse Health & Care Tools";
  let description = "Keep your horses in peak physical condition with our scientific weight, blanketing, and deworming tools.";
  let introductionText = "";

  if (currentPath.includes('/category/management')) {
    categoryName = 'Management';
    title = "Horse Stable & Breeding Management";
    description = "Optimise your farm budgets, gestation timelines, and age calculations with our management estimators.";
    introductionText = "Managing a breeding facility or boarding stable requires precise schedules, rigorous accounting, and deep physiological knowledge. Our management suite streamlines these tasks. Whether tracking mare trimesters, budgeting grain/hay costs, or projecting feed calculations, these tools keep your stables organized and operating efficiently.";
  } else if (currentPath.includes('/category/genetics')) {
    categoryName = 'Genetics';
    title = "Equine Genetics & Coat Color Predictors";
    description = "Dive into the fascinating science of equine coat genetics and predict foal color percentages.";
    introductionText = "Equine coat color genetics operate on Mendelian base models. By mapping the dominant and recessive alleles at key loci (Extension and Agouti) and accounting for dilution modifiers (Cream, Dun, Roan, Grey), breeders can forecast foal outcomes with high mathematical accuracy. Explore our predictors to discover the genetic blueprints behind famous coat colors.";
  } else if (currentPath.includes('/category/training')) {
    categoryName = 'Training & Prep';
    title = "Riding, Training & Tack Fitting Tools";
    description = "Optimise your saddle fits, journal your conditioning logs, and generate discipline-specific packing checklists.";
    introductionText = "Every rider deserves tools that promote saddle-fitting comfort and log physical conditioning metrics. Proper tack balance prevents sore backs and behavioral resistance, while rigorous log books track conditioning intervals to prevent fatigue. Use our tools to streamline your training schedules and competitive show preps.";
  } else {
    // Default Health & Care
    introductionText = "Equine wellness begins with precise morphometrics and strategic prevention. Relying on outdated rotational schedules or guessing medication dosages by eyesight can compromise horse health. Our clinical health calculators utilize validated formulas (such as the AAEP strategic deworming models and Henneke BCS scales) to give owners reliable, diagnostic-grade insights.";
  }

  useEffect(() => {
    document.title = `${title} | EquiToolkit`;
  }, [title]);

  const filteredTools = TOOLS.filter((t) => t.category === categoryName);
  const relatedArticles = ARTICLES.filter((a) => filteredTools.some((t) => t.id === a.relatedToolId));

  const breadcrumbs = [
    { label: "Category Hubs" },
    { label: title, path: currentPath }
  ];

  // Dynamic ItemList schema for tools in this category
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'numberOfItems': filteredTools.length,
    'itemListElement': filteredTools.map((tool, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'url': `https://equitoolkit.com${tool.path}`,
      'name': tool.title,
      'description': tool.shortDesc
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-3xl">
        <SectionHeading title={title} subtitle={description} icon="fa-solid fa-layer-group" />
        <p className="text-xs text-text-muted mt-4 leading-relaxed bg-white border border-border-card/30 rounded-2xl p-5 shadow-sm">
          {introductionText}
        </p>
      </div>

      {/* Grid of calculators in this category */}
      <div className="space-y-6">
        <h3 className="font-serif font-bold text-text-main text-lg border-b pb-2">Available Calculators ({filteredTools.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* Related Educational Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border-card/30 pt-10 space-y-6">
          <h3 className="font-serif font-bold text-text-main text-lg">Supporting Educational Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <a
                key={article.id}
                href={`/article/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/article/${article.slug}`);
                }}
                className="bg-white border hover:border-primary/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h4 className="font-serif font-bold text-text-main text-base mt-2.5 mb-1.5 hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t mt-4 pt-3 text-[10px] text-text-muted">
                  <span className="font-mono">{article.readTime}</span>
                  <span className="font-bold text-primary">Read Article →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. HORSE BREED DATABASE COMPONENT
// ==========================================
export function BreedDatabasePage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  useEffect(() => {
    document.title = "Horse Breed Encyclopedia & Care Database | EquiToolkit";
  }, []);

  // Classify sizes to help filtering
  const getBreedSizeCategory = (b: Breed): string => {
    const height = b.heightRange.toLowerCase();
    if (height.includes('under') || height.includes('pony') || b.id.includes('pony') || b.id.includes('miniature') || b.id.includes('falabella')) {
      return 'Pony / Miniature';
    }
    if (b.weightRange.includes('1,600') || b.weightRange.includes('1,800') || b.weightRange.includes('2,200') || b.weightRange.includes('2,400')) {
      return 'Draft Horse';
    }
    if (b.overview.toLowerCase().includes('warmblood') || b.uses.includes('Dressage') || b.uses.includes('Show Jumping')) {
      return 'Sport Warmblood';
    }
    return 'Light Riding / Stock';
  };

  const filteredBreeds = BREEDS.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
                          b.overview.toLowerCase().includes(search.toLowerCase()) ||
                          b.colors.some(c => c.toLowerCase().includes(search.toLowerCase()));
    
    const sizeCat = getBreedSizeCategory(b);
    const matchesSize = selectedSize === 'All' || sizeCat === selectedSize;

    return matchesSearch && matchesSize;
  });

  const breadcrumbs = [
    { label: "Breed Database", path: "/breeds" }
  ];

  if (selectedBreed) {
    const detailBreadcrumbs = [
      { label: "Breed Database", path: "/breeds" },
      { label: selectedBreed.name }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
        <Breadcrumbs items={detailBreadcrumbs} onNavigate={(path) => {
          setSelectedBreed(null);
          if (path !== "/breeds") onNavigate(path);
        }} />

        <button
          onClick={() => setSelectedBreed(null)}
          className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Breed Database</span>
        </button>

        <div className="bg-white border rounded-3xl p-6 md:p-10 shadow-normal grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Info Header & Key metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-2">
                {selectedBreed.name}
              </h1>
              <p className="text-sm text-text-muted leading-relaxed">
                {selectedBreed.overview}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-bg border p-4 rounded-2xl text-center">
                <span className="block text-[10px] font-bold text-text-muted uppercase">Avg Height</span>
                <span className="block font-serif font-bold text-primary text-sm mt-1">{selectedBreed.heightRange.split(' (')[0]}</span>
              </div>
              <div className="bg-bg border p-4 rounded-2xl text-center">
                <span className="block text-[10px] font-bold text-text-muted uppercase">Avg Weight</span>
                <span className="block font-serif font-bold text-primary text-sm mt-1">{selectedBreed.weightRange.split(' (')[0]}</span>
              </div>
              <div className="bg-bg border p-4 rounded-2xl text-center">
                <span className="block text-[10px] font-bold text-text-muted uppercase">Lifespan</span>
                <span className="block font-serif font-bold text-primary text-sm mt-1">{selectedBreed.lifespan}</span>
              </div>
              <div className="bg-bg border p-4 rounded-2xl text-center">
                <span className="block text-[10px] font-bold text-text-muted uppercase">Temperament</span>
                <span className="block font-serif font-bold text-primary text-xs mt-1 truncate">{selectedBreed.temperament.split(',')[0]}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-text-main border-b pb-1">History & Origin</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {selectedBreed.history}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-text-main border-b pb-1">Dietary & Feeding Considerations</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {selectedBreed.feeding}
              </p>
            </div>
          </div>

          {/* Quick specs sidebar */}
          <div className="bg-bg border border-border-card/60 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider border-b pb-2">Breed Highlights</h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <span className="block font-bold text-text-main mb-1">Standard Colors:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedBreed.colors.map((c, idx) => (
                    <span key={idx} className="bg-white border px-2 py-0.5 rounded text-[10px] text-text-muted">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-bold text-text-main mb-1">Typical Disciplines:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedBreed.uses.map((u, idx) => (
                    <span key={idx} className="bg-primary-light text-primary px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="block font-bold text-text-main mb-1 text-red-800">Primary Health Risks:</span>
                <ul className="list-disc pl-4 space-y-1 text-red-950">
                  {selectedBreed.healthIssues.map((hi, idx) => (
                    <li key={idx} className="text-[10px]">{hi}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t pt-5 space-y-3 text-xs text-center">
              <h4 className="font-bold text-text-main">Related Care Tools</h4>
              <button
                onClick={() => onNavigate('/horse-weight-calculator')}
                className="w-full bg-primary hover:bg-primary/90 text-white text-[11px] font-bold py-2 rounded-xl cursor-pointer"
              >
                Estimate This Breed's Weight
              </button>
              <button
                onClick={() => onNavigate('/horse-age-converter')}
                className="w-full bg-white border border-border-card text-text-main hover:bg-bg text-[11px] font-bold py-2 rounded-xl cursor-pointer"
              >
                Convert Age to Human Years
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Horse Breed Care Database"
          subtitle="Explore physical standards, health parameters, dietary suggestions, and history for over 50 popular horse breeds."
          icon="fa-solid fa-horse"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search breeds (e.g., Arabian, Clydesdale, bay)..."
            className="w-full pl-10 text-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-text-muted text-sm"></i>
        </div>

        <div className="flex gap-2">
          {['All', 'Light Riding / Stock', 'Sport Warmblood', 'Draft Horse', 'Pony / Miniature'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                selectedSize === size
                  ? 'bg-primary text-white border-primary'
                  : 'bg-bg hover:bg-white text-text-muted border-border-card/60'
              }`}
            >
              {size.split(' / ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Breed Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBreeds.map((breed) => (
          <div
            key={breed.id}
            onClick={() => setSelectedBreed(breed)}
            className="bg-white border hover:border-primary/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider font-mono">
                  {getBreedSizeCategory(breed)}
                </span>
                <i className="fa-solid fa-chevron-right text-xs text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all"></i>
              </div>
              <h3 className="font-serif font-bold text-text-main text-base group-hover:text-primary transition-colors">
                {breed.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mt-1.5">
                {breed.overview}
              </p>
            </div>
            
            <div className="border-t mt-4 pt-3 flex items-center justify-between text-[10px] text-text-muted font-mono">
              <span>{breed.heightRange.split(' hh')[0]} hands</span>
              <span>{breed.weightRange.split(' lbs')[0]} lbs</span>
            </div>
          </div>
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto">
          <i className="fa-solid fa-face-sad-tear text-3xl text-text-muted mb-2"></i>
          <h4 className="font-bold text-text-main">No Breeds Found</h4>
          <p className="text-xs text-text-muted">No breeds matched your search criteria. Try typing another term.</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. HORSE COAT COLOR DATABASE COMPONENT
// ==========================================
export function CoatColorDatabasePage({ onNavigate }: { onNavigate: (path: string) => void }) {
  useEffect(() => {
    document.title = "Equine Coat Color Genetics & Guide | EquiToolkit";
  }, []);

  const breadcrumbs = [
    { label: "Coat Colors Database", path: "/colors" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Equine Coat Color Encyclopedia"
          subtitle="Discover genetic profiles, locus structures, physical descriptions, and breeding tips for 12 beautiful coat colors."
          icon="fa-solid fa-palette"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COAT_COLORS.map((color) => (
          <div key={color.id} className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-text-main text-lg">{color.name}</h3>
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full font-mono uppercase">
                  Genotype: {color.id}
                </span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                {color.description}
              </p>

              <div className="bg-bg p-3.5 rounded-xl border border-border-card/40 space-y-1.5 text-xs text-text-muted">
                <p className="font-bold text-text-main">🧬 Genetic Locus Mapping:</p>
                <p className="font-mono text-[10px]">{color.genetics}</p>
                <p className="mt-1"><strong className="text-text-main">Visual Details:</strong> {color.characteristics}</p>
              </div>

              <div className="space-y-2 border-t pt-4">
                <p className="font-bold text-xs text-text-main">Color FAQ Highlights:</p>
                {color.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-bg/40 p-2.5 rounded-lg border text-[11px] space-y-1 text-text-muted">
                    <p className="font-semibold text-text-main">Q: {faq.question}</p>
                    <p>A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-light/40 border border-primary/15 rounded-xl p-3 text-center space-y-2">
              <p className="text-[10px] text-text-muted leading-relaxed">{color.linkingNote}</p>
              <button
                onClick={() => onNavigate('/foal-color-predictor')}
                className="bg-primary hover:bg-primary/95 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Launch Foal Color Predictor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. REFERENCE TABLES COMPONENT
// ==========================================
export function ReferenceTablesPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [activeTab, setActiveTab] = useState<'weight-height' | 'gestation' | 'blanket' | 'dosage' | 'age'>('weight-height');
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.title = "Equine Reference Charts & Printable Tables | EquiToolkit";
  }, []);

  const breadcrumbs = [
    { label: "Reference Tables", path: "/reference-tables" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SectionHeading
          title="Equine Reference Tables"
          subtitle="Printable, searchable databases providing instant metrics on weight, gestation milestones, dose rules, and temperature blanketing."
          icon="fa-solid fa-table"
        />
        <button
          onClick={() => window.print()}
          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
        >
          <i className="fa-solid fa-print"></i>
          <span>Print Current View</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b gap-1">
        {[
          { id: 'weight-height', label: 'Breed Specs (Height & Weight)' },
          { id: 'gestation', label: 'Gestation Milestone Timeline' },
          { id: 'blanket', label: 'Blanket Temp Chart' },
          { id: 'dosage', label: 'Dosage Weights Reference' },
          { id: 'age', label: 'Age Conversion Reference' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSearch('');
            }}
            className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Filter for Tables */}
      {(activeTab === 'weight-height' || activeTab === 'dosage') && (
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter table rows..."
            className="w-full pl-9 text-xs"
          />
          <i className="fa-solid fa-filter absolute left-3 top-3 text-text-muted text-xs"></i>
        </div>
      )}

      {/* Tab Render Area */}
      <div className="bg-white border rounded-3xl p-6 shadow-sm overflow-x-auto">
        {activeTab === 'weight-height' && (
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b bg-bg/50">
                <th className="p-3">Breed Name</th>
                <th className="p-3">Average Height (Hands)</th>
                <th className="p-3">Average Weight (lbs)</th>
                <th className="p-3">Average Weight (kg)</th>
                <th className="p-3">Lifespan</th>
                <th className="p-3">Temperament</th>
              </tr>
            </thead>
            <tbody>
              {BREEDS.filter(b => b.name.toLowerCase().includes(search.toLowerCase())).map((breed) => (
                <tr key={breed.id} className="border-b hover:bg-bg/25">
                  <td className="p-3 font-semibold text-text-main">{breed.name}</td>
                  <td className="p-3 font-mono">{breed.heightRange.split(' (')[0]}</td>
                  <td className="p-3 font-mono">{breed.weightRange.split(' lbs')[0]} lbs</td>
                  <td className="p-3 font-mono">{breed.weightRange.includes('kg') ? breed.weightRange.split('(')[1].replace(')', '') : 'N/A'}</td>
                  <td className="p-3">{breed.lifespan}</td>
                  <td className="p-3 truncate max-w-[150px]">{breed.temperament}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'gestation' && (
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b bg-bg/50">
                <th className="p-3">Gestation Day Range</th>
                <th className="p-3">Trimester / Phase</th>
                <th className="p-3">Fetal Development Milestones</th>
                <th className="p-3">Management & Veterinary Reminders</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: "Day 14 - 16", phase: "First Trimester", fetal: "Initial embryo vesicle visible in uterus via ultrasound.", mgmt: "Mandatory ultrasound to pinch and eliminate dangerous twins." },
                { day: "Day 28 - 30", phase: "First Trimester", fetal: "Fetal heartbeat detected. Sizable limb bud structures start.", mgmt: "Recheck scan to confirm cardiac viability. Standard nutrition." },
                { day: "Day 45 - 60", phase: "First Trimester", fetal: "Foal sex can begin to be determined by specialized scanners.", mgmt: "Check uterine attachment. Maintain normal deworming cycles." },
                { day: "Day 150", phase: "Second Trimester", fetal: "Genitals, hooves, and tactile hairs around muzzle are fully formed.", mgmt: "Pneumabort-K (EHV-1) vaccine booster #1." },
                { day: "Day 210", phase: "Second Trimester", fetal: "Rapid skeleton ossification. Mane and tail follicles emerge.", mgmt: "Pneumabort-K (EHV-1) vaccine booster #2." },
                { day: "Day 270", phase: "Third Trimester", fetal: "Fetus gains weight rapidly, taking up over 60% of total birth mass.", mgmt: "Pneumabort-K (EHV-1) vaccine booster #3." },
                { day: "Day 310", phase: "Third Trimester", fetal: "Lungs prepare for air respiratory mechanics.", mgmt: "Administer standard 5-way vaccine boosters to maximize colostrum antibodies." },
                { day: "Day 330 - 345", phase: "Late Gestation / Birth", fetal: "Full maturation of internal systems. Final position adjust.", mgmt: "Prepare indoor sanitized straw foaling stall. Watch udder 'waxing'." }
              ].map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3 font-bold text-primary font-mono">{row.day}</td>
                  <td className="p-3"><span className="bg-primary-light text-primary font-bold px-2.5 py-0.5 rounded-full text-[10px]">{row.phase}</span></td>
                  <td className="p-3 text-text-muted leading-relaxed">{row.fetal}</td>
                  <td className="p-3 text-text-muted leading-relaxed font-semibold">{row.mgmt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'blanket' && (
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b bg-bg/50">
                <th className="p-3">Ambient Temperature</th>
                <th className="p-3">Unclipped Horse (Natural Coat)</th>
                <th className="p-3">Clipped / Shaved Horse</th>
                <th className="p-3">Senior / Hard-Keeper Addition</th>
              </tr>
            </thead>
            <tbody>
              {[
                { temp: "Above 60°F (15°C)", natural: "No blanket", clipped: "No blanket / Fly sheet only", senior: "No blanket" },
                { temp: "50°F to 60°F (10°C to 15°C)", natural: "No blanket", clipped: "Light sheet (0g)", senior: "No blanket" },
                { temp: "40°F to 50°F (5°C to 10°C)", natural: "No blanket (Rain sheet if heavy rain)", clipped: "Lightweight blanket (100g)", senior: "Light sheet if damp" },
                { temp: "30°F to 40°F (-1°C to 5°C)", natural: "No blanket / Light blanket if wind/rain", clipped: "Mediumweight blanket (200g)", senior: "Lightweight blanket (100g)" },
                { temp: "20°F to 30°F (-6°C to -1°C)", natural: "Lightweight blanket (100g)", clipped: "Heavyweight blanket (300g)", senior: "Mediumweight blanket (200g)" },
                { temp: "Below 20°F (-6°C)", natural: "Mediumweight blanket (200g)", clipped: "Heavy blanket + Neck hood + Liner", senior: "Heavyweight blanket (300g)" }
              ].map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-bg/10">
                  <td className="p-3 font-bold text-text-main font-mono">{row.temp}</td>
                  <td className="p-3 text-text-muted">{row.natural}</td>
                  <td className="p-3 text-primary font-semibold">{row.clipped}</td>
                  <td className="p-3 text-text-muted font-mono">{row.senior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'dosage' && (
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b bg-bg/50">
                <th className="p-3">Active Drug Ingredient</th>
                <th className="p-3">Therapeutic Class</th>
                <th className="p-3">Standard Reference Dosage Range</th>
                <th className="p-3">Emergency Indication</th>
                <th className="p-3">Vet Route & Frequency</th>
              </tr>
            </thead>
            <tbody>
              {[
                { drug: "Flunixin Meglumine (Banamine)", class: "NSAID", dose: "1.1 mg/kg (or 10cc liquid per 1000 lbs)", use: "Visceral abdominal pain (Colic), ophthalmic uveitis", route: "Oral paste or Intravenous (IV) only. NEVER IM." },
                { drug: "Phenylbutazone (Bute)", class: "NSAID", dose: "1.0 - 2.0 grams per 1000 lbs body weight", use: "Skeletal joint pain, lameness, bone fever", route: "Oral powder/paste or slow IV only. Highly tissue damaging if missed." },
                { drug: "Pyrantel Pamoate (Strongid)", class: "Dewormer", dose: "6.6 mg/kg base (Double dose targets tapeworms)", use: "Roundworms, strongyles, pinworms", route: "Oral paste. Safe safety margin." },
                { drug: "Ivermectin (Eqvalan / Zimecterin)", class: "Dewormer", dose: "0.2 mg/kg body weight", use: "Bots, strongyles, microfilariae", route: "Oral paste. standard quarterly deworming." },
                { drug: "Quest (Moxidectin)", class: "Dewormer", dose: "0.4 mg/kg body weight", use: "Encysted small strongyle larvae", route: "Oral paste. WARNING: Narrow safety index. Do not overdose." }
              ].filter(d => d.drug.toLowerCase().includes(search.toLowerCase())).map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-bg/25 text-text-muted">
                  <td className="p-3 font-bold text-text-main">{row.drug}</td>
                  <td className="p-3 font-semibold">{row.class}</td>
                  <td className="p-3 font-mono text-[11px]">{row.dose}</td>
                  <td className="p-3">{row.use}</td>
                  <td className="p-3 text-red-900 font-semibold">{row.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'age' && (
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b bg-bg/50">
                <th className="p-3">Horse Age (Years)</th>
                <th className="p-3">Human Age Equivalence</th>
                <th className="p-3">Equine Life Stage Category</th>
                <th className="p-3">Typical Barn Management focus</th>
              </tr>
            </thead>
            <tbody>
              {[
                { horse: "1 year", human: "12 years", stage: "Yearling", focus: "Basic halter breaking, social herds, skeletal minerals" },
                { horse: "2 years", human: "18 years", stage: "Two-Year-Old", focus: "Light groundwork, initial saddle lunging, bone checks" },
                { horse: "3 years", human: "21 years", stage: "Young Adult", focus: "Initial mounting, light backing training, wolf tooth dental" },
                { horse: "5 years", human: "25 years", stage: "Adult Prime", focus: "Full competitive workload, regular shoeing cycles" },
                { horse: "10 years", human: "35 years", stage: "Middle Age", focus: "Peak athletic competition, performance joint buffers" },
                { horse: "15 years", human: "50 years", stage: "Mature Veteran", focus: "Early joint wear screenings, hock maintenance checks" },
                { horse: "20 years", human: "65 years", stage: "Early Senior", focus: "Pituitary PPID / Cushings blood panels, senior diet fibers" },
                { horse: "25 years", human: "75 years", stage: "Geriatric Senior", focus: "Wetted senior feeds, arthritis management, free-choice soft hay" },
                { horse: "30 years", human: "90 years", stage: "Extreme Geriatric", focus: "Comprehensive weight tracking, teeth floating every 6 mos" }
              ].map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-bg/25 text-text-muted">
                  <td className="p-3 font-bold text-text-main font-mono">{row.horse}</td>
                  <td className="p-3 text-primary font-bold font-mono">{row.human}</td>
                  <td className="p-3 font-semibold">{row.stage}</td>
                  <td className="p-3 text-xs">{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. PRINTABLE RESOURCES COMPONENT
// ==========================================
export function PrintableResourcesPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [selectedPrintable, setSelectedPrintable] = useState<PrintableResource | null>(null);

  useEffect(() => {
    document.title = "Printable Stable Log Books & Checklists | EquiToolkit";
  }, []);

  const breadcrumbs = [
    { label: "Printable Stable Resources", path: "/printable-resources" }
  ];

  if (selectedPrintable) {
    const detailBreadcrumbs = [
      { label: "Printable Stable Resources", path: "/printable-resources" },
      { label: selectedPrintable.title }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
        <Breadcrumbs items={detailBreadcrumbs} onNavigate={(path) => {
          setSelectedPrintable(null);
          if (path !== "/printable-resources") onNavigate(path);
        }} />

        <div className="flex justify-between items-center no-print">
          <button
            onClick={() => setSelectedPrintable(null)}
            className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Printable Index</span>
          </button>
          
          <button
            onClick={() => window.print()}
            className="bg-primary hover:bg-primary/95 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <i className="fa-solid fa-print"></i>
            <span>Print Sheet</span>
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="bg-white border rounded-3xl p-6 md:p-10 shadow-normal print-view space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-primary tracking-wider">{selectedPrintable.category}</span>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-text-main mt-1">
                {selectedPrintable.title}
              </h1>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                {selectedPrintable.description}
              </p>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className="text-2xl">🐴</span>
              <span className="font-serif font-bold text-sm text-text-main">EquiToolkit.com</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {selectedPrintable.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3.5">
                <h3 className="font-bold text-sm text-text-main uppercase tracking-wide border-b pb-1">
                  {sec.title}
                </h3>

                {/* If it contains list items */}
                {sec.items && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-1">
                    {sec.items.map((item, itemIdx) => (
                      <label key={itemIdx} className="flex items-start space-x-3 text-xs text-text-muted hover:text-text-main cursor-pointer">
                        <input type="checkbox" className="w-4.5 h-4.5 rounded border-border-card text-primary focus:ring-primary mt-0.5 print:border-2" />
                        <span className="leading-relaxed select-none">{item}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* If it contains fields */}
                {sec.fields && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sec.fields.map((f, fIdx) => {
                      if (f.type === 'table' && f.columns && f.rows) {
                        return (
                          <div key={fIdx} className="col-span-1 sm:col-span-2 overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="border-b bg-bg/50">
                                  {f.columns.map((col, colIdx) => (
                                    <th key={colIdx} className="p-2 border">{col}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {f.rows.map((row, rowIdx) => (
                                  <tr key={rowIdx} className="border-b hover:bg-bg/20">
                                    {f.columns?.map((col, cIdx) => (
                                      <td key={cIdx} className="p-2 border font-mono">
                                        {row[col] || <div className="h-4.5"></div>}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                                {/* Empty rows for manual printing pen input */}
                                {Array.from({ length: 4 }).map((_, emptyIdx) => (
                                  <tr key={`empty-${emptyIdx}`} className="border-b h-7">
                                    {f.columns?.map((_, cIdx) => (
                                      <td key={cIdx} className="p-2 border"></td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }

                      return (
                        <div key={fIdx} className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-text-main uppercase">{f.label}</label>
                          <input
                            type="text"
                            placeholder={f.placeholder || "_________________________________"}
                            className="w-full text-xs py-1.5 px-3 border border-border-card rounded-xl focus:border-primary outline-none bg-transparent print:border-b-2 print:border-t-0 print:border-x-0 print:rounded-none print:px-0"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-5 flex justify-between items-center text-[10px] text-text-muted">
            <span>Instructions: {selectedPrintable.instructions}</span>
            <span>Date Printed: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Printable Stable Templates"
          subtitle="Equine show checklists, farrier ledgers, stable feed signs, and health record cards fully optimized for home printers."
          icon="fa-solid fa-file-pdf"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRINTABLES.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPrintable(p)}
            className="bg-white border hover:border-primary/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  {p.category}
                </span>
                <i className="fa-solid fa-chevron-right text-xs text-text-muted group-hover:text-primary transition-all"></i>
              </div>
              <h3 className="font-serif font-bold text-text-main text-base group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mt-2">
                {p.description}
              </p>
            </div>
            
            <div className="border-t mt-5 pt-3 flex items-center justify-between text-[11px] text-text-muted">
              <span>Form Fields & Checklists</span>
              <span className="font-bold text-primary">Open & Print →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. ARTICLES HUB PAGE COMPONENT
// ==========================================
export function ArticlesHubPage({ onNavigate, currentPath }: HubPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    // If route is /article/slug-name, open it
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        setActiveArticle(article);
        document.title = `${article.title} | EquiToolkit Articles`;
      }
    } else {
      setActiveArticle(null);
      document.title = "Educational Equine Resource Articles | EquiToolkit";
    }
  }, [currentPath]);

  const filteredArticles = ARTICLES.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                          a.summary.toLowerCase().includes(search.toLowerCase()) ||
                          a.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const breadcrumbs = [
    { label: "Educational Articles", path: "/articles" }
  ];

  if (activeArticle) {
    const detailBreadcrumbs = [
      { label: "Educational Articles", path: "/articles" },
      { label: activeArticle.title }
    ];

    // Find the actual calculator related to this article
    const tool = TOOLS.find(t => t.id === activeArticle.relatedToolId);

    // Dynamic Article Schema (JSON-LD)
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': activeArticle.title,
      'description': activeArticle.summary,
      'datePublished': '2026-07-16T12:00:00Z',
      'dateModified': '2026-07-16T12:00:00Z',
      'author': {
        '@type': 'Organization',
        'name': 'EquiToolkit Editorial Team',
        'url': 'https://equitoolkit.com'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'EquiToolkit',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://equitoolkit.com/icon.png'
        }
      },
      'mainEntityOfPage': `https://equitoolkit.com/article/${activeArticle.slug}`
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <Breadcrumbs items={detailBreadcrumbs} onNavigate={(path) => {
          if (path === "/articles") {
            onNavigate("/articles");
          } else {
            onNavigate(path);
          }
        }} />

        <button
          onClick={() => onNavigate('/articles')}
          className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Articles Index</span>
        </button>

        <article className="bg-white border rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="border-b pb-5">
            <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
              {activeArticle.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-text-main mt-3 mb-2">
              {activeArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
              <span>{activeArticle.readTime}</span>
              <span>•</span>
              <span>Published: July 2026</span>
            </div>
          </div>

          {/* Render article body with manual beautiful typography (equivalent to prose class) */}
          <div className="space-y-5 text-sm text-text-muted leading-relaxed">
            {activeArticle.content.split('\n\n').map((para, paraIdx) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={paraIdx} className="text-lg font-serif font-bold text-text-main pt-3 border-b pb-1">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('#### ')) {
                return (
                  <h4 key={paraIdx} className="text-sm font-bold text-text-main uppercase tracking-wide pt-2">
                    {para.replace('#### ', '')}
                  </h4>
                );
              }
              if (para.startsWith('* ') || para.startsWith('- ')) {
                return (
                  <ul key={paraIdx} className="list-disc pl-5 space-y-1">
                    {para.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>{li.replace(/^[*\-]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1')}</li>
                    ))}
                  </ul>
                );
              }
              if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                return (
                  <ol key={paraIdx} className="list-decimal pl-5 space-y-1">
                    {para.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>{li.replace(/^\d+\.\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1')}</li>
                    ))}
                  </ol>
                );
              }
              if (para.startsWith('$$\\text{Weight (lbs)}')) {
                return (
                  <div key={paraIdx} className="font-mono text-xs bg-bg p-3.5 rounded-xl border text-center text-text-main">
                    Weight (lbs) = (Heart Girth"² × Body Length") ÷ 330
                  </div>
                );
              }
              if (para.startsWith('$$\\text{Weight (kg)}')) {
                return (
                  <div key={paraIdx} className="font-mono text-xs bg-bg p-3.5 rounded-xl border text-center text-text-main">
                    Weight (kg) = (Heart Girth cm² × Body Length cm) ÷ 11,877
                  </div>
                );
              }
              if (para.startsWith('|')) {
                // Table parsing
                const rows = para.split('\n').filter(r => r.trim() !== '');
                const headers = rows[0].split('|').map(h => h.trim()).filter(h => h !== '');
                const bodyRows = rows.slice(2).map(r => r.split('|').map(td => td.trim()).filter(td => td !== ''));

                return (
                  <div key={paraIdx} className="overflow-x-auto my-4 border rounded-xl bg-white">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-bg border-b">
                          {headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-bold text-text-main">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bodyRows.map((r, rIdx) => (
                          <tr key={rIdx} className="border-b last:border-0 hover:bg-bg/20">
                            {r.map((td, tdIdx) => (
                              <td key={tdIdx} className="p-3 font-mono">{td}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              // Normal paragraph with optional inline bold parsing
              const cleanPara = para.replace(/\*\*([^*]+)\*\*/g, '$1');
              return (
                <p key={paraIdx} className="leading-relaxed text-text-muted">
                  {cleanPara}
                </p>
              );
            })}
          </div>

          {/* Related Interactive Tool Call-out box */}
          {tool && (
            <div className="bg-primary-light/50 border border-primary/20 rounded-2xl p-6 text-center space-y-3.5 mt-8 no-print">
              <span className="text-3xl">{tool.emoji}</span>
              <h4 className="font-serif font-bold text-text-main text-base">Calculate This Instantly!</h4>
              <p className="text-xs text-text-muted max-w-md mx-auto">
                No need to do the math yourself. Use our interactive {tool.title} to estimate values in seconds.
              </p>
              <button
                onClick={() => onNavigate(tool.path)}
                className="bg-primary hover:bg-primary/95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5"
              >
                <span>Launch Interactive Tool</span>
                <i className="fa-solid fa-arrow-pointer"></i>
              </button>
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Educational Equine Articles"
          subtitle="Read expert guides on horse nutrition, pregnancy stages, strategic deworming, winter blanketing rules, and saddle fitting."
          icon="fa-solid fa-book-open"
        />
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search educational articles..."
            className="w-full pl-10 text-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-text-muted text-sm"></i>
        </div>

        <div className="flex gap-2">
          {['All', 'Health & Care', 'Management', 'Training & Prep'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-bg hover:bg-white text-text-muted border-border-card/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onNavigate(`/article/${article.slug}`)}
            className="bg-white border hover:border-primary/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                {article.category}
              </span>
              <h3 className="font-serif font-bold text-text-main text-base group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>
            
            <div className="border-t mt-5 pt-3 flex items-center justify-between text-[10px] text-text-muted font-mono">
              <span>{article.readTime}</span>
              <span className="font-bold text-primary group-hover:underline">Read Guide →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto">
          <i className="fa-solid fa-book-open text-3xl text-text-muted mb-2"></i>
          <h4 className="font-bold text-text-main">No Articles Found</h4>
          <p className="text-xs text-text-muted">Try removing keywords or changing filters to browse all our content.</p>
        </div>
      )}
    </div>
  );
}
