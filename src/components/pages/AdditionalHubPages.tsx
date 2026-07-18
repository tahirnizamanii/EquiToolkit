import React, { useState, useEffect } from 'react';
import { BREEDS, Breed } from '../../data/breeds';
import { ARTICLES } from '../../data/articles';
import { TOOLS } from '../../data';
import { HEALTH_CONDITIONS, HealthCondition } from '../../data/health';
import { FEED_DATABASE, FeedItem } from '../../data/feed';
import { EQUIPMENT_GUIDES, EquipmentGuide } from '../../data/equipment';
import { SEASONAL_GUIDES, TIMELINES, SeasonalGuide, Timeline } from '../../data/careCenter';
import { Breadcrumbs, SectionHeading, AlertBox } from '../common/UIComponents';

interface HubPageProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

// Helper: Trust Badge & Authorship for all pages
function TrustBadge() {
  return (
    <div className="bg-primary-light/40 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs mt-6 select-none no-print">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <i className="fa-solid fa-user-doctor text-sm"></i>
        </div>
        <div>
          <p className="font-bold text-text-main">Reviewed & Fact-Checked by EquiToolkit Editorial Board</p>
          <p className="text-text-muted mt-0.5">Written in accordance with veterinary standards and AAEP guidelines.</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-mono text-[10px] text-text-muted">Last Reviewed: July 2026</p>
        <p className="font-mono text-[10px] text-primary font-bold mt-0.5">Updated: August 2026</p>
      </div>
    </div>
  );
}

// ============================================================================
// 1. HORSE HEALTH LIBRARY PAGE
// ============================================================================
export function HealthLibraryPage({ onNavigate }: HubPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCondition, setActiveCondition] = useState<HealthCondition | null>(null);

  useEffect(() => {
    document.title = activeCondition
      ? `${activeCondition.name} Symptoms, Causes & Vet Care | EquiToolkit`
      : "Equine Health Library & Veterinary Database | EquiToolkit";
  }, [activeCondition]);

  const categories = ['All', 'Gastrointestinal', 'Hoof & Skeletal', 'Dermatological', 'Respiratory', 'Endocrine', 'Ophthalmology'];

  const filteredConditions = HEALTH_CONDITIONS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.summary.toLowerCase().includes(search.toLowerCase()) ||
                          c.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConditionClick = (condition: HealthCondition) => {
    setActiveCondition(condition);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (activeCondition) {
    const breadcrumbs = [
      { label: "Health Library", path: "/health-library" },
      { label: activeCondition.name }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
        <Breadcrumbs items={breadcrumbs} onNavigate={() => setActiveCondition(null)} />

        <button
          onClick={() => setActiveCondition(null)}
          className="inline-flex items-center space-x-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Health Library</span>
        </button>

        <div className="bg-white border rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                {activeCondition.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-3">
              {activeCondition.name}
            </h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-4xl">
              {activeCondition.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-text-main text-lg flex items-center gap-2 text-red-600">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>Common Symptoms</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-text-main">
                {activeCondition.symptoms.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-bg p-3 rounded-xl border border-border-card/30">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-text-main text-lg flex items-center gap-2">
                  <i className="fa-solid fa-circle-question text-primary"></i>
                  <span>What Causes It?</span>
                </h3>
                <ul className="space-y-2 text-xs text-text-muted list-disc pl-5">
                  {activeCondition.causes.map((c, idx) => (
                    <li key={idx} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h3 className="font-serif font-bold text-text-main text-lg flex items-center gap-2 text-emerald-600">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>Prevention & Control</span>
                </h3>
                <ul className="space-y-2 text-xs text-text-muted list-disc pl-5">
                  {activeCondition.prevention.map((p, idx) => (
                    <li key={idx} className="leading-relaxed">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency / Vet Call trigger */}
          <div className="bg-amber-50 border-2 border-amber-500/30 rounded-2xl p-5 md:p-6 space-y-2.5">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-phone-volume animate-bounce"></i>
              <span>When to Call a Veterinarian</span>
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              {activeCondition.whenToCallVet}
            </p>
          </div>

          {/* Expandable FAQs */}
          {activeCondition.faqs.length > 0 && (
            <div className="border-t pt-8 space-y-4">
              <h3 className="font-serif font-bold text-text-main text-lg">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {activeCondition.faqs.map((faq, idx) => (
                  <details key={idx} className="bg-bg border rounded-xl p-4 group cursor-pointer" open={idx === 0}>
                    <summary className="font-bold text-xs text-text-main flex justify-between items-center list-none select-none">
                      <span>{faq.question}</span>
                      <span className="text-primary group-open:rotate-180 transition-transform duration-200">
                        <i className="fa-solid fa-chevron-down text-[10px]"></i>
                      </span>
                    </summary>
                    <p className="text-xs text-text-muted mt-3 leading-relaxed border-t pt-2.5 pl-1 select-text">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related Tools / Guides */}
          <div className="border-t pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-text-main text-xs uppercase tracking-wider mb-3">Related Calculators & Tools</h4>
              <div className="space-y-2">
                {activeCondition.relatedCalculators.map((c, idx) => (
                  <a
                    key={idx}
                    href={c.path}
                    onClick={(e) => { e.preventDefault(); onNavigate(c.path); }}
                    className="flex items-center justify-between p-3 bg-primary-light/30 border border-primary/10 rounded-xl text-xs font-semibold text-primary hover:bg-primary-light/60 transition-colors"
                  >
                    <span>{c.name}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-text-main text-xs uppercase tracking-wider mb-3">Related Educational Guides</h4>
              <div className="space-y-2">
                {activeCondition.relatedArticles.length > 0 ? (
                  activeCondition.relatedArticles.map((a, idx) => (
                    <a
                      key={idx}
                      href={a.path}
                      onClick={(e) => { e.preventDefault(); onNavigate(a.path); }}
                      className="flex items-center justify-between p-3 bg-bg border rounded-xl text-xs font-semibold text-text-main hover:border-primary/40 transition-colors"
                    >
                      <span>{a.name}</span>
                      <i className="fa-solid fa-book text-[10px] text-text-muted"></i>
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-text-muted italic p-3">No specific guides available. Visit our complete educational articles section.</p>
                )}
              </div>
            </div>
          </div>

          {/* References */}
          <div className="border-t pt-6 text-[10px] text-text-muted space-y-1.5 bg-bg/50 p-4 rounded-xl">
            <p className="font-bold uppercase tracking-wider">Trusted Veterinary References</p>
            <ul className="list-disc pl-5 space-y-0.5">
              {activeCondition.references.map((ref, idx) => (
                <li key={idx} className="font-mono">{ref}</li>
              ))}
            </ul>
          </div>

          <TrustBadge />
        </div>
      </div>
    );
  }

  const breadcrumbs = [{ label: "Health Library", path: "/health-library" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Equine Health Library"
          subtitle="Explore our comprehensive veterinary encyclopedia covering common diseases, symptoms, preventions, and when to call the veterinarian."
          icon="fa-solid fa-book-medical"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symptoms, causes, diseases (e.g., colic, coughing)..."
            className="w-full pl-10 text-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-text-muted text-sm"></i>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConditions.map((condition) => (
          <div
            key={condition.id}
            onClick={() => handleConditionClick(condition)}
            className="bg-white border hover:border-red-500/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                {condition.category}
              </span>
              <h3 className="font-serif font-bold text-text-main text-base group-hover:text-red-600 transition-colors">
                {condition.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                {condition.summary}
              </p>
            </div>

            <div className="border-t mt-5 pt-3 flex items-center justify-between text-[10px] font-bold text-red-600 group-hover:underline">
              <span>Vet-Reviewed Content</span>
              <span>View Details →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredConditions.length === 0 && (
        <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto">
          <i className="fa-solid fa-microscope text-3xl text-text-muted mb-2"></i>
          <h4 className="font-bold text-text-main">No Conditions Found</h4>
          <p className="text-xs text-text-muted">Try looking for general terms or resetting your filters.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. STABLE MANAGEMENT HUB
// ============================================================================
export function StableHubPage({ onNavigate }: HubPageProps) {
  const [activeTab, setActiveTab] = useState<'checklists' | 'feed-hay' | 'planner' | 'contacts'>('checklists');

  // Checklists State
  const [dailyTasks, setDailyTasks] = useState([
    { id: 'd1', label: 'Check stock tank heaters & water buckets (Fresh, thawed water)', done: false },
    { id: 'd2', label: 'Feed morning hay & grain rations; log consumption', done: false },
    { id: 'd3', label: 'Pick stalls and dump manure; top up bedding shavings', done: false },
    { id: 'd4', label: 'Conduct physical visual checks (leg heat, scrapes, behavior)', done: false },
    { id: 'd5', label: 'Turn out horses into pasture/dry-lot (Verify gates locked)', done: false },
    { id: 'd6', label: 'Pick hooves of turned-in horses', done: false },
    { id: 'd7', label: 'Feed evening hay & grain rations', done: false }
  ]);

  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 'w1', label: 'Scrub out and sanitize all water tanks and troughs', done: false },
    { id: 'w2', label: 'Sweep feed room, empty dust bins, and count feed bag inventories', done: false },
    { id: 'w3', label: 'Wash feeding tubs and oil squeaky gate latches', done: false },
    { id: 'w4', label: 'Inspect paddock fencing and wire lines for safety', done: false }
  ]);

  const [monthlyTasks, setMonthlyTasks] = useState([
    { id: 'm1', label: 'Deep wash trailer, verify trailer tires & brakes', done: false },
    { id: 'm2', label: 'Cobweb dusting and high beams disinfection', done: false },
    { id: 'm3', label: 'Check barn first-aid kit; restock Vetwrap and bandages', done: false }
  ]);

  // Feed Inventory State
  const [feedInventory, setFeedInventory] = useState({
    grainBags: 12,
    grainPerDay: 1.5,
    hayBales: 45,
    hayPerDay: 4.0
  });

  // Planner State
  const [plannerDates, setPlannerDates] = useState({
    vaccination: '2026-03-10',
    farrier: '2026-07-01',
    dental: '2025-08-15'
  });

  // Emergency Contact state
  const [contacts, setContacts] = useState({
    vetName: 'Dr. Sarah Collins, DVM',
    vetPhone: '555-019-4820',
    farrierName: 'Jason Vance, CJF',
    farrierPhone: '555-012-9938',
    stableManager: 'Lucy Armstrong',
    stablePhone: '555-015-2831',
    address: '942 Whispering Pines Rd, Lexington, KY 40502'
  });

  const toggleTask = (id: string, list: 'daily' | 'weekly' | 'monthly') => {
    if (list === 'daily') {
      setDailyTasks(dailyTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    } else if (list === 'weekly') {
      setWeeklyTasks(weeklyTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    } else {
      setMonthlyTasks(monthlyTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }
  };

  // Calculations for feed runway
  const grainDaysRemaining = Math.max(0, Math.floor(feedInventory.grainBags / (feedInventory.grainPerDay || 0.1)));
  const hayDaysRemaining = Math.max(0, Math.floor(feedInventory.hayBales / (feedInventory.hayPerDay || 0.1)));

  const getReorderDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculations for Planner
  const calcNextDue = (lastDateStr: string, intervalMonths: number) => {
    const d = new Date(lastDateStr);
    if (isNaN(d.getTime())) return { date: 'Invalid', overdue: false };
    d.setMonth(d.getMonth() + intervalMonths);
    const today = new Date();
    return {
      date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      overdue: d < today
    };
  };

  const nextVac = calcNextDue(plannerDates.vaccination, 6);
  const nextFarrier = calcNextDue(plannerDates.farrier, 1.5); // 6 weeks
  const nextDental = calcNextDue(plannerDates.dental, 12);

  const breadcrumbs = [{ label: "Stable Management Hub", path: "/stable-hub" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Stable Management Hub"
          subtitle="A suite of interactive operational tools to streamline checklist compliance, feed runways, vaccination schedules, and emergency dispatch sheets."
          icon="fa-solid fa-warehouse"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-card/30">
        {(['checklists', 'feed-hay', 'planner', 'contacts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-xs font-bold border-b-2 transition-colors cursor-pointer capitalize ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            {tab === 'feed-hay' ? 'Feed & Hay' : tab}
          </button>
        ))}
      </div>

      {/* Content Areas */}
      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm">
        {activeTab === 'checklists' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-text-main">Operational Checklists</h3>
                <p className="text-xs text-text-muted">Perform daily, weekly, and monthly husbandry tasks to guarantee health compliance.</p>
              </div>
              <button
                onClick={() => {
                  setDailyTasks(dailyTasks.map(t => ({ ...t, done: false })));
                  setWeeklyTasks(weeklyTasks.map(t => ({ ...t, done: false })));
                  setMonthlyTasks(monthlyTasks.map(t => ({ ...t, done: false })));
                }}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Reset All Checks
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Daily Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                    <span>Daily Checklist</span>
                  </h4>
                  <span className="text-[10px] font-mono text-text-muted bg-bg px-2 py-0.5 rounded-full">
                    {dailyTasks.filter(t => t.done).length} / {dailyTasks.length} Done
                  </span>
                </div>
                <div className="space-y-2">
                  {dailyTasks.map(task => (
                    <label key={task.id} className="flex items-start gap-2.5 p-2.5 rounded-xl border hover:bg-bg/40 transition-colors cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id, 'daily')}
                        className="mt-0.5"
                      />
                      <span className={`text-[11px] leading-tight ${task.done ? 'text-text-muted line-through' : 'text-text-main font-semibold'}`}>
                        {task.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Weekly Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
                    <span>Weekly Checklist</span>
                  </h4>
                  <span className="text-[10px] font-mono text-text-muted bg-bg px-2 py-0.5 rounded-full">
                    {weeklyTasks.filter(t => t.done).length} / {weeklyTasks.length} Done
                  </span>
                </div>
                <div className="space-y-2">
                  {weeklyTasks.map(task => (
                    <label key={task.id} className="flex items-start gap-2.5 p-2.5 rounded-xl border hover:bg-bg/40 transition-colors cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id, 'weekly')}
                        className="mt-0.5"
                      />
                      <span className={`text-[11px] leading-tight ${task.done ? 'text-text-muted line-through' : 'text-text-main font-semibold'}`}>
                        {task.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Monthly Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-text-main text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-600 inline-block"></span>
                    <span>Monthly Checklist</span>
                  </h4>
                  <span className="text-[10px] font-mono text-text-muted bg-bg px-2 py-0.5 rounded-full">
                    {monthlyTasks.filter(t => t.done).length} / {monthlyTasks.length} Done
                  </span>
                </div>
                <div className="space-y-2">
                  {monthlyTasks.map(task => (
                    <label key={task.id} className="flex items-start gap-2.5 p-2.5 rounded-xl border hover:bg-bg/40 transition-colors cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id, 'monthly')}
                        className="mt-0.5"
                      />
                      <span className={`text-[11px] leading-tight ${task.done ? 'text-text-muted line-through' : 'text-text-main font-semibold'}`}>
                        {task.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-4 text-center">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <i className="fa-solid fa-print"></i>
                <span>Print Physical Barn Sheet</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'feed-hay' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-serif font-bold text-text-main">Feed & Hay Inventory Tracker</h3>
              <p className="text-xs text-text-muted font-medium">Log stable reserves to monitor daily burn rates and get automated warning notifications for reordering.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input section */}
              <div className="bg-bg border p-5 rounded-2xl space-y-4">
                <h4 className="font-bold text-text-main text-xs uppercase tracking-wider border-b pb-1.5">Configure Inventory levels</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Grain Bags in Stock</label>
                    <input
                      type="number"
                      value={feedInventory.grainBags || ''}
                      onChange={(e) => setFeedInventory({ ...feedInventory, grainBags: Number(e.target.value) })}
                      className="w-full text-xs"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Grain Burn (Bags/Day)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={feedInventory.grainPerDay || ''}
                      onChange={(e) => setFeedInventory({ ...feedInventory, grainPerDay: Number(e.target.value) })}
                      className="w-full text-xs"
                      min="0.1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Hay Bales in Stock</label>
                    <input
                      type="number"
                      value={feedInventory.hayBales || ''}
                      onChange={(e) => setFeedInventory({ ...feedInventory, hayBales: Number(e.target.value) })}
                      className="w-full text-xs"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Hay Burn (Bales/Day)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={feedInventory.hayPerDay || ''}
                      onChange={(e) => setFeedInventory({ ...feedInventory, hayPerDay: Number(e.target.value) })}
                      className="w-full text-xs"
                      min="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Calculations Runway Output */}
              <div className="space-y-6">
                <h4 className="font-bold text-text-main text-xs uppercase tracking-wider">Inventory Health Runway</h4>
                
                <div className="space-y-4">
                  {/* Grain status card */}
                  <div className="bg-white border p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="block text-[9px] font-bold text-text-muted uppercase tracking-wider">Grain Bags Runway</span>
                      <span className={`block font-serif font-bold text-lg ${grainDaysRemaining < 7 ? 'text-red-600' : 'text-primary'}`}>
                        {grainDaysRemaining} Days left
                      </span>
                      <span className="block text-[10px] text-text-muted">Expected Reorder: <strong className="text-text-main">{getReorderDate(grainDaysRemaining)}</strong></span>
                    </div>
                    {grainDaysRemaining < 7 ? (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                        ⚠️ Low Feed Alert
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                        ✓ Optimal
                      </span>
                    )}
                  </div>

                  {/* Hay status card */}
                  <div className="bg-white border p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="block text-[9px] font-bold text-text-muted uppercase tracking-wider">Hay Bales Runway</span>
                      <span className={`block font-serif font-bold text-lg ${hayDaysRemaining < 10 ? 'text-red-600' : 'text-primary'}`}>
                        {hayDaysRemaining} Days left
                      </span>
                      <span className="block text-[10px] text-text-muted">Expected Reorder: <strong className="text-text-main">{getReorderDate(hayDaysRemaining)}</strong></span>
                    </div>
                    {hayDaysRemaining < 10 ? (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                        ⚠️ Low Hay Alert
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                        ✓ Optimal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-serif font-bold text-text-main">Routine Care Planner</h3>
              <p className="text-xs text-text-muted font-medium">Keep track of crucial medical dates. This calculator flags when services are overdue.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="bg-bg border p-5 rounded-2xl space-y-4">
                <h4 className="font-bold text-text-main text-xs uppercase tracking-wider border-b pb-1.5">Last Performed Dates</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Last Core Vaccination</label>
                    <input
                      type="date"
                      value={plannerDates.vaccination}
                      onChange={(e) => setPlannerDates({ ...plannerDates, vaccination: e.target.value })}
                      className="w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Last Farrier Trim/Shoes</label>
                    <input
                      type="date"
                      value={plannerDates.farrier}
                      onChange={(e) => setPlannerDates({ ...plannerDates, farrier: e.target.value })}
                      className="w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Last Dental Float Exam</label>
                    <input
                      type="date"
                      value={plannerDates.dental}
                      onChange={(e) => setPlannerDates({ ...plannerDates, dental: e.target.value })}
                      className="w-full text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Status and Next Due Runway */}
              <div className="space-y-4">
                <h4 className="font-bold text-text-main text-xs uppercase tracking-wider">Planner Alerts & Due Dates</h4>
                
                <div className="space-y-3">
                  {/* Vac Card */}
                  <div className="bg-white border p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-xs text-text-main">Core Vaccination</span>
                      <span className="block text-[10px] text-text-muted">Interval: 6 Months (Spring/Fall boosters)</span>
                      <span className="block text-[11px] font-semibold mt-1">Next Due: {nextVac.date}</span>
                    </div>
                    {nextVac.overdue ? (
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">OVERDUE</span>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">CURRENT</span>
                    )}
                  </div>

                  {/* Farrier Card */}
                  <div className="bg-white border p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-xs text-text-main">Farrier Trim/Shoeing</span>
                      <span className="block text-[10px] text-text-muted">Interval: 6 Weeks</span>
                      <span className="block text-[11px] font-semibold mt-1">Next Due: {nextFarrier.date}</span>
                    </div>
                    {nextFarrier.overdue ? (
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">OVERDUE</span>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">CURRENT</span>
                    )}
                  </div>

                  {/* Dental Card */}
                  <div className="bg-white border p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-xs text-text-main">Dental Care float</span>
                      <span className="block text-[10px] text-text-muted">Interval: 12 Months (Annual Exam)</span>
                      <span className="block text-[11px] font-semibold mt-1">Next Due: {nextDental.date}</span>
                    </div>
                    {nextDental.overdue ? (
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">OVERDUE</span>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">CURRENT</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-text-main">Emergency Dispatch Sheet</h3>
                <p className="text-xs text-text-muted">Post this sheet near the barn phone, primary entryway, or tack room.</p>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-primary/95 transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-print"></i>
                <span>Print Sheet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Form Input */}
              <div className="bg-bg border p-5 rounded-2xl space-y-3">
                <h4 className="font-bold text-text-main text-xs uppercase tracking-wider border-b pb-1.5">Edit Barn Contacts</h4>
                
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Primary Vet Name</label>
                    <input
                      type="text"
                      value={contacts.vetName}
                      onChange={(e) => setContacts({ ...contacts, vetName: e.target.value })}
                      className="w-full text-xs py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Veterinary Emergency Line</label>
                    <input
                      type="text"
                      value={contacts.vetPhone}
                      onChange={(e) => setContacts({ ...contacts, vetPhone: e.target.value })}
                      className="w-full text-xs py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Farrier Name</label>
                    <input
                      type="text"
                      value={contacts.farrierName}
                      onChange={(e) => setContacts({ ...contacts, farrierName: e.target.value })}
                      className="w-full text-xs py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Farrier Emergency Line</label>
                    <input
                      type="text"
                      value={contacts.farrierPhone}
                      onChange={(e) => setContacts({ ...contacts, farrierPhone: e.target.value })}
                      className="w-full text-xs py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Barn Owner / stable Manager</label>
                    <input
                      type="text"
                      value={contacts.stableManager}
                      onChange={(e) => setContacts({ ...contacts, stableManager: e.target.value })}
                      className="w-full text-xs py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Manager Telephone</label>
                    <input
                      type="text"
                      value={contacts.stablePhone}
                      onChange={(e) => setContacts({ ...contacts, stablePhone: e.target.value })}
                      className="w-full text-xs py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-muted uppercase mb-0.5">Barn Address (For Ambulance Dispatch)</label>
                    <textarea
                      value={contacts.address}
                      onChange={(e) => setContacts({ ...contacts, address: e.target.value })}
                      className="w-full text-xs py-1"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Physical Render Card */}
              <div className="border-2 border-dashed border-red-500/40 rounded-2xl p-6 space-y-6 bg-red-50/20 shadow-sm relative overflow-hidden" id="emergency-sheet">
                {/* Red warning border banner */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600"></div>

                <div className="text-center">
                  <span className="text-red-600 text-2xl inline-block mb-1"><i className="fa-solid fa-phone-flip animate-pulse"></i></span>
                  <h4 className="font-serif font-black text-red-700 text-lg uppercase tracking-wider">EMERGENCY DISPATCH SHEET</h4>
                  <p className="text-[9px] font-mono text-text-muted uppercase">POST CONSPICUOUSLY IN HORSE BARN</p>
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div>
                    <span className="block text-[9px] font-bold text-text-muted uppercase">STABLE LOCATION / PHYSICAL ADDRESS</span>
                    <strong className="block text-xs text-text-main bg-white border px-3 py-2 rounded-xl mt-1 font-mono leading-relaxed">{contacts.address}</strong>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-red-100 p-3 rounded-xl">
                      <span className="block text-[8px] font-black text-red-600 uppercase">1. VETERINARIAN</span>
                      <span className="block text-xs font-bold text-text-main mt-0.5">{contacts.vetName}</span>
                      <a href={`tel:${contacts.vetPhone}`} className="block text-xs font-mono font-black text-red-700 mt-1 hover:underline">{contacts.vetPhone}</a>
                    </div>

                    <div className="bg-white border p-3 rounded-xl">
                      <span className="block text-[8px] font-bold text-text-muted uppercase">2. FARRIER</span>
                      <span className="block text-xs font-bold text-text-main mt-0.5">{contacts.farrierName}</span>
                      <a href={`tel:${contacts.farrierPhone}`} className="block text-xs font-mono font-bold text-primary mt-1 hover:underline">{contacts.farrierPhone}</a>
                    </div>
                  </div>

                  <div className="bg-white border p-3.5 rounded-xl">
                    <span className="block text-[8px] font-bold text-text-muted uppercase">3. BARN MANAGER / CONTACT</span>
                    <span className="block text-xs font-bold text-text-main mt-0.5">{contacts.stableManager}</span>
                    <a href={`tel:${contacts.stablePhone}`} className="block text-xs font-mono font-bold text-primary mt-1 hover:underline">{contacts.stablePhone}</a>
                  </div>
                </div>

                <div className="text-[10px] text-text-muted leading-relaxed italic border-t pt-4">
                  Keep this dispatcher sheet current. Under horse welfare acts, early intervention is critical in suspected colicking, severe lameness, or bleeding.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 3. HORSE BREED COMPARISON TOOL
// ============================================================================
export function BreedComparisonPage({ onNavigate }: HubPageProps) {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(['quarter-horse', 'thoroughbred']);

  const handleSelectBreed = (index: number, id: string) => {
    const updated = [...selectedBreeds];
    updated[index] = id;
    setSelectedBreeds(updated);
  };

  const addComparisonColumn = () => {
    if (selectedBreeds.length < 3) {
      // Find a breed not currently in selection
      const remaining = BREEDS.find(b => !selectedBreeds.includes(b.id));
      if (remaining) {
        setSelectedBreeds([...selectedBreeds, remaining.id]);
      }
    }
  };

  const removeComparisonColumn = (index: number) => {
    if (selectedBreeds.length > 2) {
      setSelectedBreeds(selectedBreeds.filter((_, idx) => idx !== index));
    }
  };

  const activeBreeds = selectedBreeds.map(id => BREEDS.find(b => b.id === id)).filter(Boolean) as Breed[];

  const breadcrumbs = [{ label: "Breed Comparison Tool", path: "/breed-comparison" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Breed Comparison Tool"
          subtitle="Select two or three horse breeds to compare their temperament, morphology, typical workloads, lifespan, and unique breed-specific care considerations side-by-side."
          icon="fa-solid fa-code-compare"
        />
      </div>

      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 overflow-x-auto">
        {/* Selection bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-b pb-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {selectedBreeds.map((id, index) => (
              <div key={index} className="flex items-center gap-1 bg-bg border px-3 py-1.5 rounded-xl">
                <span className="text-[10px] font-mono text-text-muted">Slot {index+1}:</span>
                <select
                  value={id}
                  onChange={(e) => handleSelectBreed(index, e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-text-main focus:ring-0 cursor-pointer pr-8"
                >
                  {BREEDS.map(b => (
                    <option key={b.id} value={b.id} disabled={selectedBreeds.includes(b.id) && id !== b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                {selectedBreeds.length > 2 && (
                  <button
                    onClick={() => removeComparisonColumn(index)}
                    className="text-red-600 hover:text-red-700 font-bold ml-1 text-xs shrink-0 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {selectedBreeds.length < 3 && (
              <button
                onClick={addComparisonColumn}
                className="bg-primary-light hover:bg-primary/20 text-primary font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                + Add Breed
              </button>
            )}
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <table className="w-full border-collapse text-xs text-left min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-border-card/30 font-bold text-text-muted uppercase tracking-wider w-1/4">Metric</th>
              {activeBreeds.map((breed) => (
                <th key={breed.id} className="p-4 border-b-2 border-border-card/30 font-serif font-bold text-text-main text-base w-1/4 text-center">
                  {breed.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-card/20 font-semibold">
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Height (Hands)</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-main font-bold font-serif text-sm bg-bg/20">{b.heightRange}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Average Weight</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-main font-serif text-sm bg-bg/20">{b.weightRange}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Temperament Scale</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-main">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-primary">{b.temperament}</span>
                    <span className="text-[10px] text-text-muted font-normal mt-0.5">
                      {b.temperament.includes('High') || b.temperament.includes('Spirited') ? '🔥 Hot-blooded' : b.temperament.includes('Calm') ? '❄️ Cold-blooded' : '⏳ Warm-blooded'}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Primary Uses</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-muted font-normal leading-relaxed">{b.uses.join(', ')}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Lifespan</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-main">{b.lifespan || '25 - 30 Years'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Rider Experience level</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-main">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    b.overview.toLowerCase().includes('easy') || b.temperament.toLowerCase().includes('calm')
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border border-amber-200'
                  }`}>
                    {b.overview.toLowerCase().includes('easy') || b.temperament.toLowerCase().includes('calm') ? 'Beginner / Intermediate' : 'Intermediate / Advanced'}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Climate Suitability</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-muted font-normal leading-relaxed">
                  {b.id === 'shetland-pony' || b.id === 'shire' ? 'Highly cold hardy, sensitive to high heat/humidity' : 'Adaptable, prefers temperate environments'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Grooming Needs</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-text-muted font-normal leading-relaxed">
                  {b.id === 'shire' || b.id === 'gypsy-vanner' ? 'High maintenance (requires detailed leg feather cleaning and washing)' : 'Low to moderate (routine grooming is sufficient)'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-text-muted uppercase text-[10px]">Key Health Concerns</td>
              {activeBreeds.map((b) => (
                <td key={b.id} className="p-4 text-center text-red-700 font-normal leading-relaxed bg-red-50/10">
                  {b.id === 'thoroughbred' ? 'Gastric ulcers, thin soles, exercise induced pulmonary hemorrhage' : b.id === 'quarter-horse' ? 'PSSM (Tying up), navicular syndrome, HYPP' : 'Metabolic disorders, obesity, laminetic risk'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 4. INTERACTIVE HORSE GROWTH CHARTS PAGE
// ============================================================================
export function GrowthChartsPage({ onNavigate }: HubPageProps) {
  const [horseType, setHorseType] = useState<'Standard' | 'Pony' | 'Draft'>('Standard');
  const [ageMonths, setAgeMonths] = useState(6);
  const [measuredWeight, setMeasuredWeight] = useState(420);

  // Growth curve formula constants based on average breed values
  const adultWeights = { Standard: 1100, Pony: 700, Draft: 1800 };
  const targetAdultWeight = adultWeights[horseType];

  // Predict expected weight based on developmental percentages
  // Month 1: 20%, Month 3: 35%, Month 6: 50%, Month 12: 75%, Month 18: 90%, Month 24: 98%, Month 36: 100%
  const getGrowthPercentage = (months: number) => {
    if (months <= 0) return 0.1;
    if (months <= 1) return 0.1 + (months * 0.1); // 10% to 20%
    if (months <= 3) return 0.2 + ((months - 1) * 0.075); // 20% to 35%
    if (months <= 6) return 0.35 + ((months - 3) * 0.05); // 35% to 50%
    if (months <= 12) return 0.50 + ((months - 6) * 0.0416); // 50% to 75%
    if (months <= 18) return 0.75 + ((months - 12) * 0.025); // 75% to 90%
    if (months <= 24) return 0.90 + ((months - 18) * 0.0133); // 90% to 98%
    if (months <= 36) return 0.98 + ((months - 24) * 0.0016); // 98% to 100%
    return 1.0;
  };

  const predictedPercentage = getGrowthPercentage(ageMonths);
  const expectedAverageWeight = Math.round(targetAdultWeight * predictedPercentage);
  const predictedAdultWeight = Math.round(measuredWeight / predictedPercentage);

  // Plot data points for drawing a beautiful SVG growth curve
  const curvePoints = Array.from({ length: 37 }, (_, index) => {
    const m = index;
    const pct = getGrowthPercentage(m);
    const w = targetAdultWeight * pct;
    return { months: m, weight: w };
  });

  // Convert month coordinate (0-36) and weight coordinate (0-max_weight) to SVG coordinates (0-400, 0-250)
  const maxW = targetAdultWeight * 1.1;
  const getSvgCoords = (months: number, weight: number) => {
    const x = 40 + (months / 36) * 330;
    const y = 220 - (weight / maxW) * 190;
    return { x, y };
  };

  // Build path coordinate string
  const pathData = curvePoints.reduce((acc, p, idx) => {
    const { x, y } = getSvgCoords(p.months, p.weight);
    return acc + (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }, '');

  const userPoint = getSvgCoords(ageMonths, measuredWeight);

  const breadcrumbs = [{ label: "Growth Charts & Milestones", path: "/growth-charts" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Interactive Horse Growth Charts"
          subtitle="Estimate adult horse weights, project foaling/yearling growth rates, and plot developmental growth curves to verify a healthy metabolic trajectory."
          icon="fa-solid fa-chart-line"
        />
      </div>

      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Inputs Section */}
          <div className="bg-bg border p-5 rounded-2xl space-y-4">
            <h4 className="font-bold text-text-main text-xs uppercase tracking-wider border-b pb-2">Target Horse Parameters</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Target Horse Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard', 'Pony', 'Draft'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setHorseType(type);
                        // Reset defaults based on selection
                        if (type === 'Pony') setMeasuredWeight(280);
                        else if (type === 'Draft') setMeasuredWeight(680);
                        else setMeasuredWeight(420);
                      }}
                      className={`py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        horseType === type
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-border-card text-text-muted hover:bg-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Current Age ({ageMonths} Months)</label>
                <input
                  type="range"
                  min="1"
                  max="36"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-border-card rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-text-muted font-mono mt-1">
                  <span>1 Mo (Foal)</span>
                  <span>12 Mo (Yearling)</span>
                  <span>36 Mo (Adult)</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase mb-1">Current Weight (lbs)</label>
                <input
                  type="number"
                  value={measuredWeight || ''}
                  onChange={(e) => setMeasuredWeight(Number(e.target.value))}
                  className="w-full text-xs"
                  min="20"
                  max="2500"
                />
              </div>
            </div>
          </div>

          {/* Graphical Projection Plot */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-text-main text-xs uppercase tracking-wider">Dynamic Growth Curve (months vs. lbs)</h4>
            
            <div className="bg-bg/40 border border-border-card/30 rounded-2xl p-4 flex justify-center items-center">
              <svg viewBox="0 0 400 250" className="w-full max-w-lg">
                {/* Grid horizontal lines */}
                {[0.25, 0.5, 0.75, 1.0].map((pct, idx) => {
                  const weightLine = maxW * pct;
                  const { y } = getSvgCoords(0, weightLine);
                  return (
                    <g key={idx}>
                      <line x1="40" y1={y} x2="370" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="35" y={y + 3} className="text-[8px] font-mono fill-text-muted text-right" textAnchor="end">
                        {Math.round(weightLine)}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical grid lines */}
                {[0, 6, 12, 18, 24, 30, 36].map((m, idx) => {
                  const { x } = getSvgCoords(m, 0);
                  return (
                    <g key={idx}>
                      <line x1={x} y1="30" x2={x} y2="220" stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x={x} y="233" className="text-[8px] font-mono fill-text-muted text-center" textAnchor="middle">
                        {m}M
                      </text>
                    </g>
                  );
                })}

                {/* Bottom solid baseline */}
                <line x1="40" y1="220" x2="370" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="40" y1="30" x2="40" y2="220" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Base curve path */}
                <path d={pathData} fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />

                {/* User Coordinate plot circle */}
                <circle cx={userPoint.x} cy={userPoint.y} r="6" className="fill-accent stroke-white" strokeWidth="2" />

                {/* Chart Labels */}
                <text x="200" y="246" className="text-[8px] font-mono fill-text-muted text-center" textAnchor="middle">Age in Months</text>
                <text x="12" y="125" transform="rotate(-90, 12, 125)" className="text-[8px] font-mono fill-text-muted text-center" textAnchor="middle">Weight in Lbs</text>

                {/* Legend */}
                <g transform="translate(45, 10)" className="select-none pointer-events-none">
                  <line x1="0" y1="10" x2="15" y2="10" stroke="var(--color-primary)" strokeWidth="2.5" />
                  <text x="20" y="13" className="text-[8px] font-bold fill-text-main">Healthy developmental average</text>
                  <circle cx="160" cy="10" r="4" className="fill-accent" />
                  <text x="168" y="13" className="text-[8px] font-bold fill-text-main">Your Horse ({ageMonths}m, {measuredWeight} lbs)</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Milestone Statistics metrics output */}
        <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-bg/50 p-4 rounded-xl border text-center">
            <span className="block text-[9px] font-bold text-text-muted uppercase">Target Adult Weight</span>
            <span className="block font-serif font-bold text-text-main text-lg mt-1">{targetAdultWeight} lbs</span>
            <span className="block text-[10px] text-text-muted mt-0.5">Average for {horseType} breeds</span>
          </div>

          <div className="bg-bg/50 p-4 rounded-xl border text-center">
            <span className="block text-[9px] font-bold text-text-muted uppercase">% of Growth Completed</span>
            <span className="block font-serif font-bold text-primary text-lg mt-1">{(predictedPercentage * 100).toFixed(1)}%</span>
            <span className="block text-[10px] text-text-muted mt-0.5">At current {ageMonths} months age</span>
          </div>

          <div className="bg-bg/50 p-4 rounded-xl border text-center">
            <span className="block text-[9px] font-bold text-text-muted uppercase">Projected Mature Weight</span>
            <span className="block font-serif font-bold text-accent text-lg mt-1">{predictedAdultWeight} lbs</span>
            <span className="block text-[10px] text-text-muted mt-0.5">Estimated based on current burn-rate</span>
          </div>
        </div>

        {/* Developmental Milestones info sheet */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-serif font-bold text-text-main text-base">Key Developmental Milestones (Foal to Adult)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-bg p-3.5 rounded-xl border border-border-card/30">
              <strong className="block text-primary">Months 1–3 (Foalhood)</strong>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">Extremely rapid growth. Needs nutrient-rich mare milk or high-quality creep feed. Reaches 35% of adult weight.</p>
            </div>
            <div className="bg-bg p-3.5 rounded-xl border border-border-card/30">
              <strong className="block text-primary">Month 6 (Weaning)</strong>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">Transition away from milk. Gut microflora must stabilize on forage and high-protein rations. Reaches 50% of adult weight.</p>
            </div>
            <div className="bg-bg p-3.5 rounded-xl border border-border-card/30">
              <strong className="block text-primary">Month 12 (Yearling)</strong>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">High bone development phase. Crucial to balance calcium-phosphorus intake to prevent developmental orthopedic diseases (DOD). Reaches 75% weight.</p>
            </div>
            <div className="bg-bg p-3.5 rounded-xl border border-border-card/30">
              <strong className="block text-primary">Month 24+ (Physiological Maturity)</strong>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">Skeletal plates in knees fuse. Muscle density continues to fill out until month 36, completing growth cycles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. EQUIPMENT GUIDES PAGE
// ============================================================================
export function EquipmentGuidesPage({ onNavigate }: HubPageProps) {
  const [activeGuide, setActiveGuide] = useState<EquipmentGuide>(EQUIPMENT_GUIDES[0]);
  const [horseHeight, setHorseHeight] = useState(15.2);

  // Auto sizing helper
  const getSuggestedSize = (height: number) => {
    if (height < 14.0) return 'Cob / Small';
    if (height < 16.2) return 'Full / Standard';
    return 'Oversize / Warmblood';
  };

  const breadcrumbs = [{ label: "Equipment Guides", path: "/equipment-guides" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Tack & Equipment Sizing Guides"
          subtitle="Ensure professional fittings, read purchasing advice, use our interactive sizing calculator, and learn expert cleaning tips."
          icon="fa-solid fa-toolbox"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left selector rails */}
        <div className="space-y-2 lg:col-span-1">
          {EQUIPMENT_GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              className={`w-full text-left p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeGuide.id === guide.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-text-muted hover:text-text-main hover:bg-bg'
              }`}
            >
              <span>{guide.emoji} {guide.name}</span>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          ))}
        </div>

        {/* Right Content Sheet */}
        <div className="lg:col-span-3 bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-text-main flex items-center gap-2">
              <span>{activeGuide.emoji}</span>
              <span>{activeGuide.name} Information & Sizing</span>
            </h2>
            <p className="text-xs text-text-muted leading-relaxed mt-2.5">
              {activeGuide.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
            {/* Sizing Chart & Interactive Calculator */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-text-main text-base flex items-center gap-1.5">
                <i className="fa-solid fa-ruler-combined text-primary"></i>
                <span>Sizing Chart</span>
              </h3>

              <div className="border rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-3 bg-bg p-2 font-bold text-[10px] text-text-muted uppercase border-b">
                  <span>Size Label</span>
                  <span>Measurements</span>
                  <span>Target Fit</span>
                </div>
                <div className="divide-y font-medium text-[11px]">
                  {activeGuide.sizingChart.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-2 hover:bg-bg/20 transition-colors">
                      <span className="font-bold text-text-main">{row.size}</span>
                      <span className="text-text-muted font-mono">{row.measurements}</span>
                      <span className="text-text-muted leading-tight">{row.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive estimator box */}
              <div className="bg-primary-light/40 border border-primary/20 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-primary text-[11px] uppercase tracking-wider">Quick Sizing Helper</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-text-muted">Enter Horse Height (Hands)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={horseHeight}
                      onChange={(e) => setHorseHeight(Number(e.target.value))}
                      className="w-full text-xs py-1 mt-1 bg-white border-primary/20 focus:border-primary/40 focus:ring-0"
                    />
                  </div>
                  <div className="text-[11px] font-bold text-text-main">
                    Suggested Standard Size: <span className="text-primary">{getSuggestedSize(horseHeight)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buying Advice & Tips */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-text-main text-base flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-question text-primary"></i>
                  <span>Buying Advice & Tips</span>
                </h3>
                <ul className="space-y-2.5 text-[11px] text-text-muted leading-relaxed list-disc pl-5">
                  {activeGuide.buyingAdvice.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-serif font-bold text-text-main text-base flex items-center gap-1.5 text-emerald-700">
                  <i className="fa-solid fa-soap"></i>
                  <span>Cleaning & Maintenance</span>
                </h3>
                <ul className="space-y-2 text-[11px] text-text-muted leading-relaxed list-disc pl-5">
                  {activeGuide.maintenanceTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <TrustBadge />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. SEASONAL HORSE CARE CENTER
// ============================================================================
export function SeasonalCarePage({ onNavigate }: HubPageProps) {
  const [activeSeason, setActiveSeason] = useState<SeasonalGuide>(SEASONAL_GUIDES[0]);

  const breadcrumbs = [{ label: "Seasonal Care Center", path: "/seasonal-care" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Seasonal Horse Care Center"
          subtitle="Navigate seasonal shifts comfortably. Browse our evergreen vet guides, custom management tips, and seasonal checklists."
          icon="fa-solid fa-calendar-days"
        />
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2 bg-white border p-1.5 rounded-2xl shadow-sm">
        {SEASONAL_GUIDES.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setActiveSeason(guide)}
            className={`py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeSeason.id === guide.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-transparent text-text-muted hover:text-text-main hover:bg-bg/50'
            }`}
          >
            <span>{guide.emoji}</span>
            <span>{guide.season}</span>
          </button>
        ))}
      </div>

      {/* Main Content sheet */}
      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-text-main flex items-center gap-2">
            <span>{activeSeason.emoji}</span>
            <span>{activeSeason.title}</span>
          </h2>
          <p className="text-xs text-text-muted leading-relaxed mt-2 max-w-4xl">
            {activeSeason.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
          {/* Action checklist */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-text-main text-base flex items-center gap-2 text-primary">
              <i className="fa-solid fa-clipboard-list"></i>
              <span>{activeSeason.season} Checklist Checks</span>
            </h3>
            <ul className="space-y-3 text-[11px] text-text-main">
              {activeSeason.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-bg p-3 rounded-xl border">
                  <span className="w-4 h-4 rounded bg-primary-light text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Tips */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-text-main text-base flex items-center gap-2 text-emerald-700">
              <i className="fa-solid fa-graduation-cap"></i>
              <span>Expert Management Tips</span>
            </h3>
            <div className="space-y-3">
              {activeSeason.tips.map((tip, idx) => (
                <div key={idx} className="bg-emerald-50/20 border border-emerald-500/10 rounded-xl p-4 space-y-1">
                  <strong className="block text-xs text-emerald-950 font-serif font-bold">{tip.title}</strong>
                  <p className="text-[11px] text-text-muted leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>

            {/* Related Tools */}
            <div className="border-t pt-4 space-y-2">
              <strong className="block text-[10px] uppercase font-bold text-text-muted">Recommended Tools for this season</strong>
              <div className="grid grid-cols-2 gap-2">
                {activeSeason.relatedCalculators.map((calc, idx) => (
                  <a
                    key={idx}
                    href={calc.path}
                    onClick={(e) => { e.preventDefault(); onNavigate(calc.path); }}
                    className="p-2 border rounded-lg text-[10px] font-bold text-primary hover:bg-primary-light/20 transition-all text-center block"
                  >
                    {calc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <TrustBadge />
      </div>
    </div>
  );
}

// ============================================================================
// 7. HORSE FEED DATABASE PAGE
// ============================================================================
export function FeedDatabasePage({ onNavigate }: HubPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Hay' | 'Grass' | 'Grain' | 'Supplement' | 'Mineral' | 'Electrolyte'>('All');

  const categories: ('All' | 'Hay' | 'Grass' | 'Grain' | 'Supplement' | 'Mineral' | 'Electrolyte')[] = ['All', 'Hay', 'Grass', 'Grain', 'Supplement', 'Mineral', 'Electrolyte'];

  const filteredFeed = FEED_DATABASE.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.nutritionalValue.toLowerCase().includes(search.toLowerCase()) ||
                          item.suitableFor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const breadcrumbs = [{ label: "Feed & Forage Encyclopedia", path: "/feed-database" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Equine Feed & Forage Encyclopedia"
          subtitle="Explore different types of hay, pasture grasses, energy grains, supplements, and minerals to construct balanced dietary rations."
          icon="fa-solid fa-carrot"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feed ingredients, nutritional values, suitable breeds..."
            className="w-full pl-10 text-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-text-muted text-sm"></i>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between border-b pb-2 mb-3">
                <h3 className="font-serif font-bold text-text-main text-lg">{item.name}</h3>
                <span className="text-[9px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  {item.category}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <strong className="block text-text-muted uppercase text-[9px] tracking-wider">Nutritional Matrix</strong>
                  <span className="text-text-main font-semibold">{item.nutritionalValue}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-2.5">
                  <div className="space-y-1">
                    <strong className="block text-emerald-700 uppercase text-[9px] tracking-wider font-bold">Pros / Benefits</strong>
                    <ul className="space-y-1 list-disc pl-4 text-text-muted text-[11px] font-normal">
                      {item.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-red-700 uppercase text-[9px] tracking-wider font-bold">Cons / Risks</strong>
                    <ul className="space-y-1 list-disc pl-4 text-text-muted text-[11px] font-normal">
                      {item.cons.length > 0 ? (
                        item.cons.map((c, i) => <li key={i}>{c}</li>)
                      ) : (
                        <li className="italic list-none pl-0">None identified</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-2.5 space-y-1 bg-bg/40 p-3 rounded-xl mt-3">
                  <strong className="block text-text-muted uppercase text-[9px] tracking-wider">Suitable For</strong>
                  <span className="text-text-main leading-tight font-semibold block">{item.suitableFor}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-3 mt-3 text-[11px] text-text-muted leading-relaxed">
              <strong className="text-primary block font-serif text-xs font-bold mb-0.5">Feeding Instructions</strong>
              {item.recommendations}
            </div>
          </div>
        ))}
      </div>

      {filteredFeed.length === 0 && (
        <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto">
          <i className="fa-solid fa-seedling text-3xl text-text-muted mb-2"></i>
          <h4 className="font-bold text-text-main">No Feed items Found</h4>
          <p className="text-xs text-text-muted">Try resetting filters to explore all feed components.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 8. INTERACTIVE TIMELINES PAGE
// ============================================================================
export function TimelinesPage({ onNavigate }: HubPageProps) {
  const [activeTimeline, setActiveTimeline] = useState<Timeline>(TIMELINES[0]);

  const breadcrumbs = [{ label: "Husbandry Timelines", path: "/timelines" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Equine Husbandry Timelines"
          subtitle="Explore standard timeline schedules, farrier rotation cycles, annual vaccination trackers, and breeding gestation milestones."
          icon="fa-solid fa-timeline"
        />
      </div>

      {/* Selector layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white border p-1.5 rounded-2xl shadow-sm">
        {TIMELINES.map((tl) => (
          <button
            key={tl.id}
            onClick={() => setActiveTimeline(tl)}
            className={`py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTimeline.id === tl.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-transparent text-text-muted hover:text-text-main hover:bg-bg/50'
            }`}
          >
            <span>{tl.emoji}</span>
            <span>{tl.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Timeline Sheet */}
      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2">
            <span>{activeTimeline.emoji}</span>
            <span>{activeTimeline.name}</span>
          </h2>
          <p className="text-xs text-text-muted leading-relaxed mt-1.5">
            {activeTimeline.description}
          </p>
        </div>

        {/* Timeline representation visual line */}
        <div className="relative border-l-2 border-primary-light/80 ml-4 pl-8 space-y-6 py-2 select-text">
          {activeTimeline.milestones.map((milestone, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline nodes */}
              <span className={`absolute -left-12 top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                milestone.isImportant
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-primary border-primary'
              }`}>
                {idx + 1}
              </span>

              <div className={`p-4 rounded-xl border transition-all ${
                milestone.isImportant
                  ? 'bg-accent-light/10 border-accent/30'
                  : 'bg-bg/20 hover:bg-bg/40 border-border-card/30'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b pb-1.5 mb-2">
                  <h4 className="font-bold text-text-main text-xs">{milestone.title}</h4>
                  <span className="font-mono text-[10px] text-primary font-black uppercase tracking-wider">{milestone.time}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <TrustBadge />
      </div>
    </div>
  );
}

// ============================================================================
// 9. SEARCH & DISCOVERY PAGE
// ============================================================================
export function SearchAndDiscoveryPage({ onNavigate }: HubPageProps) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Calculators' | 'Breeds' | 'Articles' | 'Health' | 'Feed'>('All');

  useEffect(() => {
    document.title = "Site-wide Search & Discovery | EquiToolkit";
  }, []);

  const results: { name: string; type: string; summary: string; path: string; emoji: string }[] = [];

  // 1. Gather Calculators
  TOOLS.forEach(t => {
    results.push({ name: t.title, type: 'Calculators', summary: t.shortDesc, path: t.path, emoji: t.emoji });
  });

  // 2. Gather Breeds
  BREEDS.forEach(b => {
    results.push({ name: b.name, type: 'Breeds', summary: b.overview, path: `/breeds`, emoji: '🐴' });
  });

  // 3. Gather Articles
  ARTICLES.forEach(a => {
    results.push({ name: a.title, type: 'Articles', summary: a.summary, path: `/article/${a.slug}`, emoji: '📖' });
  });

  // 4. Gather Health library
  HEALTH_CONDITIONS.forEach(h => {
    results.push({ name: h.name, type: 'Health', summary: h.summary, path: `/health-library`, emoji: '🩺' });
  });

  // 5. Gather Feed database
  FEED_DATABASE.forEach(f => {
    results.push({ name: f.name, type: 'Feed', summary: f.nutritionalValue, path: `/feed-database`, emoji: '🌾' });
  });

  const filteredResults = results.filter(r => {
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) || r.summary.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filterType === 'All' || r.type === filterType;
    return matchesQuery && matchesFilter;
  });

  const breadcrumbs = [{ label: "Site-wide Search", path: "/search" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-2xl">
        <SectionHeading
          title="Universal Search & Discovery"
          subtitle="Quickly scan all our 100% free calculators, vet articles, breed cards, health conditions, and nutrition databases in one place."
          icon="fa-solid fa-magnifying-glass"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type any keywords (e.g., deworming, colic, warmblood, protein, alfalfa)..."
            className="w-full pl-10 text-sm"
            autoFocus
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-text-muted text-sm"></i>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['All', 'Calculators', 'Breeds', 'Articles', 'Health', 'Feed'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-primary text-white border-primary'
                  : 'bg-bg hover:bg-white text-text-muted border-border-card/60'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif font-bold text-text-main text-lg border-b pb-2">Search Results ({filteredResults.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResults.map((res, idx) => (
            <a
              key={idx}
              href={res.path}
              onClick={(e) => { e.preventDefault(); onNavigate(res.path); }}
              className="bg-white border hover:border-primary/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <span className="text-2xl bg-bg p-2.5 rounded-xl shrink-0">{res.emoji}</span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-main text-sm">{res.name}</span>
                  <span className="text-[8px] font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded-full uppercase tracking-wider">{res.type}</span>
                </div>
                <p className="text-text-muted leading-relaxed line-clamp-2">{res.summary}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-16 bg-white border rounded-2xl max-w-md mx-auto">
            <i className="fa-solid fa-compass text-3xl text-text-muted mb-2"></i>
            <h4 className="font-bold text-text-main">No Match Found</h4>
            <p className="text-xs text-text-muted font-medium">Try checking your spelling or looking for simplified keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 10. TRUST, EXPERTISE & EDITORIAL POLICY CENTER
// ============================================================================
export function TrustCenterPage({ onNavigate }: HubPageProps) {
  useEffect(() => {
    document.title = "Trust & Scientific Editorial Policies | EquiToolkit";
  }, []);

  const breadcrumbs = [{ label: "Trust Center", path: "/trust" }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="text-center space-y-3">
        <span className="text-primary text-4xl inline-block"><i className="fa-solid fa-user-shield"></i></span>
        <h1 className="text-3xl md:text-4xl font-serif font-black text-text-main">EquiToolkit Editorial & Trust Policies</h1>
        <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed">
          Veterinary credibility is the foundation of our work. Learn about our meticulous review process, disclaimer rules, and strict contributor standards.
        </p>
      </div>

      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-8 select-text">
        {/* Section 1 */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-text-main text-lg border-b pb-1.5">1. Clinical Review Process</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            All physiological models, feed analyses, medication formulas, and deworming strategies published on EquiToolkit are cross-referenced with scientific, peer-reviewed studies published by major veterinary councils, notably:
          </p>
          <ul className="list-disc pl-5 text-xs text-text-muted space-y-1">
            <li>American Association of Equine Practitioners (AAEP) guidelines.</li>
            <li>United States National Research Council (NRC) Nutrient Requirements of Horses.</li>
            <li>UC Davis School of Veterinary Medicine Equine Research Center databases.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-text-main text-lg border-b pb-1.5">2. Medical Disclaimer (Critical Information)</h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-950 font-medium leading-relaxed">
            <strong>NOTICE:</strong> The calculations, estimators, and library articles provided on EquiToolkit are for educational and exploratory purposes only. They are NOT designed to substitute, override, or delay direct professional veterinary consultations, diagnostics, or treatments. In acute emergencies, such as suspected colic, high fevers, or severe non-weight-bearing hoof lameness, always contact your veterinarian immediately.
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-text-main text-lg border-b pb-1.5">3. Authorship & Contributor Standards</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Articles and health files are authored by qualified equine professionals, veterinary students, or experienced stable operations managers. Each module is subsequently peer-reviewed by an advisory veterinary surgeon board to guarantee factual clinical safety. No promotional, paid, or affiliate bias influences our educational directory.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 11. SITEMAP XML VIEWER & GENERATOR PAGE
// ============================================================================
export function SitemapPage({ onNavigate }: HubPageProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "XML Sitemap Directory | EquiToolkit";
  }, []);

  const staticUrls = [
    { loc: 'https://equitoolkit.com/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://equitoolkit.com/all-tools', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/breeds', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/colors', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/reference-tables', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/printable-resources', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/articles', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/about', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://equitoolkit.com/contact', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://equitoolkit.com/privacy', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://equitoolkit.com/terms', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://equitoolkit.com/disclaimer', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://equitoolkit.com/health-library', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/stable-hub', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/breed-comparison', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/growth-charts', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/equipment-guides', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/seasonal-care', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/feed-database', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/timelines', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/search', priority: '0.7', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/trust', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://equitoolkit.com/category/health', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/category/management', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/category/genetics', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://equitoolkit.com/category/training', priority: '0.8', changefreq: 'weekly' },
  ];

  const toolUrls = TOOLS.map(t => ({
    loc: `https://equitoolkit.com${t.path}`,
    priority: '0.9',
    changefreq: 'weekly'
  }));

  const articleUrls = ARTICLES.map(a => ({
    loc: `https://equitoolkit.com/article/${a.slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticUrls, ...toolUrls, ...articleUrls];

  const sitemapXmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemapXmlString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitemapXmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const breadcrumbs = [
    { label: "Sitemap Directory", path: "/sitemap.xml" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in no-print">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className="text-center space-y-3">
        <span className="text-primary text-4xl inline-block">🗺️</span>
        <h1 className="text-3xl md:text-4xl font-serif font-black text-text-main">Programmatic XML Sitemap Generator</h1>
        <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed">
          Dynamic client-side sitemap compiling all Articles, Breeds, Colors, Calculators, and Categories for search engine bots.
        </p>
      </div>

      <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-base font-bold text-text-main font-serif">Generated XML Output ({allUrls.length} URIs mapped)</h2>
            <p className="text-xs text-text-muted">Standards-compliant sitemap.xml representation for Google, Bing, and DuckDuckGo crawlers.</p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleCopy}
              className="bg-bg border text-text-main hover:bg-primary-light/50 hover:text-primary hover:border-primary/20 text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <i className={copied ? "fa-solid fa-check text-green-600" : "fa-solid fa-copy"}></i>
              <span>{copied ? "Copied XML!" : "Copy to Clipboard"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow"
            >
              <i className="fa-solid fa-download"></i>
              <span>Download sitemap.xml</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <pre className="text-[11px] font-mono leading-relaxed bg-bg rounded-2xl p-5 overflow-auto max-h-[500px] text-text-main border select-all">
            {sitemapXmlString}
          </pre>
        </div>
      </div>
    </div>
  );
}
