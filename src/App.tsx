import React, { useState, useEffect } from 'react';
import { TOOLS } from './data';
import { Tool, ToolId } from './types';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ToolWrapper from './components/ToolWrapper';

// Import Static Pages & Reusable UI elements
import { AboutPage, ContactPage, PrivacyPolicy, TermsOfService, DisclaimerPage, ResourcesPage, AllToolsPage } from './components/pages/StaticPages';
import { FAQ, CTABanner, ToolCard } from './components/common/UIComponents';

// Import Interactive Tools
import WeightCalculator from './components/tools/WeightCalculator';
import BlanketingGuide from './components/tools/BlanketingGuide';
import FoalColorPredictor from './components/tools/FoalColorPredictor';
import DewormingSchedule from './components/tools/DewormingSchedule';
import MareGestationCalculator from './components/tools/MareGestationCalculator';
import FeedCostCalculator from './components/tools/FeedCostCalculator';
import RidingLog from './components/tools/RidingLog';
import ShowChecklist from './components/tools/ShowChecklist';
import BodyConditionScorer from './components/tools/BodyConditionScorer';
import AgeConverter from './components/tools/AgeConverter';
import MedicationDosage from './components/tools/MedicationDosage';
import SaddleFitGuide from './components/tools/SaddleFitGuide';
import HeightConverter from './components/tools/HeightConverter';
import WaterIntake from './components/tools/WaterIntake';
import BoardingCost from './components/tools/BoardingCost';
import PastureSize from './components/tools/PastureSize';

// Import Hubs, Breeds, Colors, References, and Article Pages
import {
  CategoryHubPage,
  BreedDatabasePage,
  CoatColorDatabasePage,
  ReferenceTablesPage,
  PrintableResourcesPage,
  ArticlesHubPage
} from './components/pages/HubPages';

// Import newly created authority modules
import {
  HealthLibraryPage,
  StableHubPage,
  BreedComparisonPage,
  GrowthChartsPage,
  EquipmentGuidesPage,
  SeasonalCarePage,
  FeedDatabasePage,
  TimelinesPage,
  SearchAndDiscoveryPage,
  TrustCenterPage,
  SitemapPage
} from './components/pages/AdditionalHubPages';

// Global static SEO schema templates
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'EquiToolkit',
  'url': 'https://equitoolkit.com',
  'logo': 'https://equitoolkit.com/icon.png',
  'sameAs': [
    'https://github.com/equitoolkit'
  ]
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'EquiToolkit',
  'url': 'https://equitoolkit.com',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': 'https://equitoolkit.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'EquiToolkit Equine Calculator Suite',
  'url': 'https://equitoolkit.com',
  'applicationCategory': 'BusinessApplication, HealthApplication',
  'operatingSystem': 'All',
  'browserRequirements': 'Requires HTML5, Javascript, CSS3',
  'offers': {
    '@type': 'Offer',
    'price': '0.00',
    'priceCurrency': 'USD'
  }
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Read the starting pathname or fallback to hash-based path if any
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    return hash || path || '/';
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [homeSearchQuery, setHomeSearchQuery] = useState<string>('');

  // Handle routing events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || path || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept global link clicks to keep SPA speed and prevent full refreshes
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href')?.startsWith('/')) {
        const href = anchor.getAttribute('href') || '/';
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    // Support standard pushState AND fallback hash in state so user sees URL changes
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Find active tool based on path
  const activeTool = TOOLS.find((tool) => tool.path === currentPath);

  // Render individual active tool component
  const renderActiveToolComponent = (id: ToolId) => {
    switch (id) {
      case 'weight-calculator':
        return <WeightCalculator />;
      case 'blanketing-guide':
        return <BlanketingGuide />;
      case 'foal-color':
        return <FoalColorPredictor />;
      case 'deworming':
        return <DewormingSchedule />;
      case 'mare-gestation':
        return <MareGestationCalculator />;
      case 'feed-cost':
        return <FeedCostCalculator />;
      case 'riding-log':
        return <RidingLog />;
      case 'show-checklist':
        return <ShowChecklist />;
      case 'body-condition':
        return <BodyConditionScorer />;
      case 'age-converter':
        return <AgeConverter />;
      case 'medication-dosage':
        return <MedicationDosage />;
      case 'saddle-fit':
        return <SaddleFitGuide />;
      case 'height-converter':
        return <HeightConverter />;
      case 'water-intake':
        return <WaterIntake />;
      case 'boarding-cost':
        return <BoardingCost />;
      case 'pasture-size':
        return <PastureSize />;
      default:
        return (
          <div className="text-center py-16 bg-white border rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-text-main mb-2">Tool Not Found</h2>
            <p className="text-xs text-text-muted mb-4">The selected equestrian tool is currently being configured or does not exist.</p>
            <button onClick={handleBackToHome} className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl">
              Back to Home
            </button>
          </div>
        );
    }
  };

  // Homepage Render
  const renderHomepage = () => {
    // Set dynamic metadata for homepage
    document.title = "EquiToolkit | Free Online Horse & Equestrian Calculators";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Access EquiToolkit – a professional collection of free online equine weight calculators, blanketing charts, foal color predictors, dosage calculators, and stable logs.');
    }

    // Filters and Search
    const categories = ['All', 'Health & Care', 'Management', 'Genetics', 'Training & Prep'];
    const filteredTools = TOOLS.filter((tool) => {
      const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchSearch = tool.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) || 
                          tool.shortDesc.toLowerCase().includes(homeSearchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    const featuredTools = TOOLS.filter((t) => 
      t.id === 'weight-calculator' || t.id === 'blanketing-guide' || t.id === 'medication-dosage'
    );

    const faqItems = [
      {
        q: "Are the equine weight calculator formulas scientifically accurate?",
        a: "Yes. Our calculations are built upon the standard veterinary bodyweight formula: (Heart Girth² × Body Length) / 330. This mathematical standard is validated by major agricultural extensions (like Texas A&M and Minnesota Extension) and is proven to estimate body weight within 3-5% of a heavy digital livestock scale."
      },
      {
        q: "Do you store any information about my horses or stable logs?",
        a: "Absolutely not. EquiToolkit runs entirely on client-side vanilla JavaScript inside your own device. We do not maintain any remote databases, we do not use trackers, and we do not require accounts. All logs and checklists utilize your browser's secure localStorage – meaning your data remains 100% private and under your absolute control."
      },
      {
        q: "What is the Henneke Body Condition Scoring System?",
        a: "The Henneke Scale is a standard 9-point rating chart developed by Dr. Don Henneke in 1983. It is the universal standard used by veterinarians, law enforcement, and researchers to assess a horse's fatty tissue reserves across six key physical areas: the neck, shoulder, withers, ribs, loin, and tailhead."
      },
      {
        q: "Will these calculators work inside steel barns with poor cellular reception?",
        a: "Yes! Because all interactive logic and calculations execute client-side inside your browser, once you have loaded the page on your smartphone, you can use every single calculator, checklist generator, and conversion tool offline without requiring a cell signal or active internet connection."
      }
    ];

    return (
      <div className="space-y-16 md:space-y-24 pb-16 animate-fade-in">
        {/* HERO SECTION */}
        <header className="relative overflow-hidden bg-white border-b border-border-card/30 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 md:space-y-8 relative z-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-primary-light border border-primary/20 text-primary rounded-full text-[11px] font-bold shadow-sm tracking-wide">
              <span>🐴</span>
              <span>100% Free · No Registration · No Ads</span>
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-main tracking-tight font-serif max-w-3xl mx-auto leading-tight">
              Professional Equine Tools <br className="hidden sm:inline" />
              Directly in Your Pocket
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              EquiToolkit offers scientifically-backed, browser-native equine calculators, trackers, and diagnostic reference charts. Built using accepted veterinary guidelines to optimize your daily barn management.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
              <a
                href="#tools-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto text-center bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm text-xs cursor-pointer"
              >
                Launch Calculators
              </a>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about');
                }}
                className="w-full sm:w-auto text-center bg-white hover:bg-bg border border-border-card text-text-main font-bold px-6 py-3 rounded-xl transition-colors text-xs"
              >
                Our Quality Guarantee →
              </a>
            </div>
          </div>

          {/* Decorative faint background shapes */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-light/20 rounded-full filter blur-3xl opacity-60 -z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-light/30 rounded-full filter blur-3xl opacity-50 -z-0" />
        </header>

        {/* TRUST INDICATORS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-border-card/40 rounded-2xl p-6 shadow-sm divide-y md:divide-y-0 md:divide-x divide-border-card/30">
            <div className="flex items-center space-x-3 justify-center md:pb-0 pb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-text-main leading-tight">100% Private</h4>
                <p className="text-[10px] text-text-muted mt-0.5 font-medium">No accounts, completely local</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center md:pb-0 pb-3 pt-3 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-text-main leading-tight">Client-Side</h4>
                <p className="text-[10px] text-text-muted mt-0.5 font-medium">No data sent to servers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center pt-3 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-text-main leading-tight">Barn-Optimized</h4>
                <p className="text-[10px] text-text-muted mt-0.5 font-medium">Offline-ready for rural stables</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center pt-3 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                <i className="fa-solid fa-earth-americas"></i>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-text-main leading-tight">Dual Units</h4>
                <p className="text-[10px] text-text-muted mt-0.5 font-medium">Metric & Imperial formulas</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED TOOLS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-lg md:text-xl font-bold text-text-main font-serif">Featured Equestrian Tools</h2>
            <p className="text-xs text-text-muted">Our most visited, highly referenced daily utility calculators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onNavigate={navigate} />
            ))}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="bg-white border-y border-border-card/40 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-text-main font-serif">How EquiToolkit Works</h2>
              <p className="text-xs text-text-muted font-medium">Get immediate, accurate veterinary metrics and charts in three simple steps.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center space-y-3 relative group">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-base font-bold mx-auto shadow-sm">
                  1
                </div>
                <h3 className="font-serif font-bold text-text-main text-sm sm:text-base">Select Your Utility</h3>
                <p className="text-xs text-text-muted leading-relaxed max-w-xs mx-auto font-medium">
                  Browse through our categorized list of calculators including feeding costs, gestation timelines, and drug estimates.
                </p>
                <div className="hidden sm:block absolute top-6 left-[60%] right-[-40%] h-[1px] bg-border-card/50" />
              </div>

              <div className="text-center space-y-3 relative group">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-base font-bold mx-auto shadow-sm">
                  2
                </div>
                <h3 className="font-serif font-bold text-text-main text-sm sm:text-base">Input Measurements</h3>
                <p className="text-xs text-text-muted leading-relaxed max-w-xs mx-auto font-medium">
                  Enter heart-girth length, breed, blanketing temperatures, or gestation dates in either Imperial or Metric units.
                </p>
                <div className="hidden sm:block absolute top-6 left-[60%] right-[-40%] h-[1px] bg-border-card/50" />
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-base font-bold mx-auto shadow-sm">
                  3
                </div>
                <h3 className="font-serif font-bold text-text-main text-sm sm:text-base">Obtain Results</h3>
                <p className="text-xs text-text-muted leading-relaxed max-w-xs mx-auto font-medium">
                  View instant veterinary estimates and shareable figures alongside highly detailed educational reference guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN TOOLS COLLECTION GRID (SEARCH & FILTERS) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20" id="tools-section">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border-card/30 pb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-text-main font-serif flex items-center gap-2">
                <i className="fa-solid fa-bolt text-accent text-lg"></i> Complete Interactive Collection
              </h2>
              <p className="text-xs text-text-muted">Launch any of our calculators to get started side-by-side with equine science guides.</p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80 no-print">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                placeholder="Search tools (e.g. weight, dosage, feed)..."
                value={homeSearchQuery}
                onChange={(e) => setHomeSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-border-card/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 scrollbar-thin no-print">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? TOOLS.length 
                : TOOLS.filter(t => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-white shadow-sm font-semibold'
                      : 'border-border-card bg-white text-text-muted hover:border-text-muted'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat ? 'bg-white/20 text-white' : 'bg-bg text-text-muted'
                  }`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="tools-grid-box">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onNavigate={navigate} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-text-muted">
                <p className="text-sm font-semibold">No tools found matching "{homeSearchQuery}"</p>
                <button
                  onClick={() => {
                    setHomeSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-3 text-xs bg-primary-light text-primary font-bold px-4 py-2 rounded-full border border-primary/20 cursor-pointer"
                >
                  Reset search & filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* WHY EQUITOOLKIT SECTION (BENTO GRID) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-text-main font-serif">Why Equestrians Trust EquiToolkit</h2>
            <p className="text-xs text-text-muted font-medium">We design calculations with meticulous attention to accuracy, privacy, and scientific credibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-border-card/40 rounded-2xl p-6 space-y-3 shadow-sm md:col-span-1">
              <span className="text-2xl">⚡</span>
              <h3 className="font-serif font-bold text-text-main text-sm sm:text-base">Scientific Integrity</h3>
              <p className="text-xs text-text-muted leading-relaxed font-medium">
                We use mathematical models from peer-reviewed studies – such as Henneke BCS body condition parameters and the Gestational timeline of 340 days. No guesswork.
              </p>
            </div>
            <div className="bg-white border border-border-card/40 rounded-2xl p-6 space-y-3 shadow-sm md:col-span-1">
              <span className="text-2xl">🔒</span>
              <h3 className="font-serif font-bold text-text-main text-sm sm:text-base">100% Privacy & Anonymity</h3>
              <p className="text-xs text-text-muted leading-relaxed font-medium">
                We never record clinical metrics, breeding folders, or drug estimates. Everything compiles on client-side state machine. Private and secure.
              </p>
            </div>
            <div className="bg-white border border-border-card/40 rounded-2xl p-6 space-y-3 shadow-sm md:col-span-1">
              <span className="text-2xl">📱</span>
              <h3 className="font-serif font-bold text-text-main text-sm sm:text-base">No Connection? No Problem.</h3>
              <p className="text-xs text-text-muted leading-relaxed font-medium">
                EquiToolkit is built as a single progressive responsive unit. Once cached, all calculators execute flawlessly deep in steel barns without reception.
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-text-main font-serif">Clinical & Calculation FAQs</h2>
            <p className="text-xs text-text-muted font-medium">Clear answers regarding equine metrics, mathematical models, and privacy safeguards.</p>
          </div>
          <FAQ items={faqItems} />
        </section>

        {/* DYNAMIC FOOTER CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTABanner
            title="All Tools. Always Free. Forever."
            description="We believe premium equine tools should be accessible to every single rider, stable worker, and veterinary technician. Add this to your mobile home-screen for instant barnside assistance."
            buttonText="Launch Weight Calculator ⚖️"
            onButtonClick={() => navigate('/horse-weight-calculator')}
            secondaryButtonText="Learn About Our Team"
            onSecondaryButtonClick={() => navigate('/about')}
          />
        </section>
      </div>
    );
  };

  // 404 Render
  const render404 = () => {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <span className="text-6xl">⚠️</span>
        <h1 className="text-3xl font-black text-text-main">Page Not Found</h1>
        <p className="text-sm text-text-muted">
          We couldn't locate the equine reference page you requested. It might have migrated to a different paddock.
        </p>
        <button
          onClick={handleBackToHome}
          className="bg-primary text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow cursor-pointer"
        >
          Return to EquiToolkit Home 🐴
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Global Structured SEO Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webApplicationSchema)}
      </script>

      {/* Translucent navigation header */}
      <Nav currentPath={currentPath} onNavigate={navigate} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentPath === '/' ? (
          renderHomepage()
        ) : activeTool ? (
          <ToolWrapper tool={activeTool} onBack={handleBackToHome} onNavigate={navigate}>
            {renderActiveToolComponent(activeTool.id)}
          </ToolWrapper>
        ) : currentPath === '/about' ? (
          <AboutPage onNavigate={navigate} />
        ) : currentPath === '/contact' ? (
          <ContactPage onNavigate={navigate} />
        ) : currentPath === '/privacy' ? (
          <PrivacyPolicy />
        ) : currentPath === '/terms' ? (
          <TermsOfService />
        ) : currentPath === '/disclaimer' ? (
          <DisclaimerPage />
        ) : currentPath === '/resources' ? (
          <ResourcesPage onNavigate={navigate} />
        ) : currentPath === '/all-tools' ? (
          <AllToolsPage onNavigate={navigate} />
        ) : currentPath.startsWith('/category/') ? (
          <CategoryHubPage currentPath={currentPath} onNavigate={navigate} />
        ) : currentPath === '/breeds' ? (
          <BreedDatabasePage onNavigate={navigate} />
        ) : currentPath === '/colors' ? (
          <CoatColorDatabasePage onNavigate={navigate} />
        ) : currentPath === '/reference-tables' ? (
          <ReferenceTablesPage onNavigate={navigate} />
        ) : currentPath === '/printable-resources' ? (
          <PrintableResourcesPage onNavigate={navigate} />
        ) : (currentPath === '/articles' || currentPath.startsWith('/article/')) ? (
          <ArticlesHubPage currentPath={currentPath} onNavigate={navigate} />
        ) : currentPath === '/health-library' ? (
          <HealthLibraryPage onNavigate={navigate} />
        ) : currentPath === '/stable-hub' ? (
          <StableHubPage onNavigate={navigate} />
        ) : currentPath === '/breed-comparison' ? (
          <BreedComparisonPage onNavigate={navigate} />
        ) : currentPath === '/growth-charts' ? (
          <GrowthChartsPage onNavigate={navigate} />
        ) : currentPath === '/equipment-guides' ? (
          <EquipmentGuidesPage onNavigate={navigate} />
        ) : currentPath === '/seasonal-care' ? (
          <SeasonalCarePage onNavigate={navigate} />
        ) : currentPath === '/feed-database' ? (
          <FeedDatabasePage onNavigate={navigate} />
        ) : currentPath === '/timelines' ? (
          <TimelinesPage onNavigate={navigate} />
        ) : currentPath === '/search' ? (
          <SearchAndDiscoveryPage onNavigate={navigate} />
        ) : currentPath === '/trust' ? (
          <TrustCenterPage onNavigate={navigate} />
        ) : currentPath === '/sitemap.xml' ? (
          <SitemapPage onNavigate={navigate} />
        ) : (
          render404()
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Back to Top Sticky Button */}
      <ScrollToTopButton />
    </div>
  );
}

// A fast, robust scroll-to-top component
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/95 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer no-print"
      title="Scroll back to top"
      aria-label="Scroll back to top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
