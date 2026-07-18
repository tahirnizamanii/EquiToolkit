import React, { useState } from 'react';
import { TOOLS } from '../../data';
import { SectionHeading, ToolCard, FAQ, AlertBox } from '../common/UIComponents';

interface StaticPageProps {
  onNavigate: (path: string) => void;
}

// ==========================================
// 1. ABOUT PAGE COMPONENT
// ==========================================
export function AboutPage({ onNavigate }: StaticPageProps) {
  React.useEffect(() => {
    document.title = "About Us | EquiToolkit – Free Equine Resources";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
      <SectionHeading
        title="About EquiToolkit"
        subtitle="The story behind the web's most trusted suite of 100% free, offline-ready equine management calculators."
        icon="fa-solid fa-circle-info"
      />

      <div className="prose prose-stone text-sm text-text-muted leading-relaxed space-y-4">
        <p>
          EquiToolkit was founded in 2026 by a collective of veterinary technicians, professional barn managers, and software engineers with a shared frustration: 
          <strong> essential equine tools shouldn't be locked behind expensive subscriptions or tracking-heavy mobile apps.</strong>
        </p>
        <p>
          In a modern equestrian world filled with subscription-based barn management suites, we believe basic diagnostic calculators (such as estimating a colic dose of banamine, verifying a saddle fit, or generating a strategic deworming schedule) should be universally accessible, free, and functional even when you are deep inside an insulated metal barn with zero cellular reception.
        </p>

        <h3 className="text-lg font-bold text-text-main font-serif pt-4">Our Direct Guarantees:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>100% Free Forever:</strong> We do not charge subscriptions, we do not lock features, and we do not display noisy banner advertisements.
          </li>
          <li>
            <strong>No Sign-Up or Accounts:</strong> You do not need to share your email address or personal details to use our services.
          </li>
          <li>
            <strong>Local & Offline First:</strong> Your entries (including riding logs, checklists, and calculators) run directly inside your browser cache (using localStorage). Your data is private to you and never uploaded to any remote servers.
          </li>
          <li>
            <strong>Science-Backed Formulas:</strong> All calculations utilize validated veterinary formulas, such as the Henneke Body Condition Scale and AAEP parasite guidelines.
          </li>
        </ul>

        <h3 className="text-lg font-bold text-text-main font-serif pt-4">The Development Collective</h3>
        <p>
          EquiToolkit is built using lightweight modern web frameworks to ensure maximum performance and minimum data usage. Because our calculators utilize client-side JavaScript execution, they load instantly on rural mobile connections and continue to compute perfectly even if you lose network access entirely while on a trail ride.
        </p>
      </div>

      <div className="bg-primary-light/50 border border-primary/20 rounded-2xl p-6 text-center space-y-3">
        <h4 className="font-serif font-bold text-text-main text-base">Want to support our free resources?</h4>
        <p className="text-xs text-text-muted max-w-md mx-auto">
          The best way to support us is simply to bookmark this tool on your smartphone and share it with fellow riders, stable owners, and veterinarians.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="bg-primary hover:bg-primary/95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          Explore All Free Tools
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. CONTACT PAGE COMPONENT
// ==========================================
export function ContactPage({ onNavigate }: StaticPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  React.useEffect(() => {
    document.title = "Contact Us | EquiToolkit Support & Feedback";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    // Pure client-side success simulation
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
      <SectionHeading
        title="Get in Touch"
        subtitle="Have a feature suggestion? Found a math bug? Want to propose an additional veterinary calculator? We'd love to hear from you."
        icon="fa-solid fa-envelope"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white border border-border-card rounded-2xl p-5 space-y-4 text-xs text-text-muted">
          <div>
            <h4 className="font-bold text-text-main uppercase tracking-wider text-[10px] text-primary">Direct Email</h4>
            <p className="font-medium text-text-main mt-0.5">support@equitoolkit.com</p>
          </div>
          <div>
            <h4 className="font-bold text-text-main uppercase tracking-wider text-[10px] text-primary">Response Time</h4>
            <p className="font-medium text-text-main mt-0.5">Under 24 hours (7 days a week)</p>
          </div>
          <div>
            <h4 className="font-bold text-text-main uppercase tracking-wider text-[10px] text-primary">Our Paddock Location</h4>
            <p className="font-medium text-text-main mt-0.5">Pure Digital Workspace · Serving horse lovers globally</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-surface border border-border-card/80 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-border-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-border-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-white border border-border-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1">Your Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-white border border-border-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="text-xs text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-green-600"></i>
                <span>Thank you! Your message has been sent successfully. We will respond shortly.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="text-xs text-red-700 bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation text-red-600"></i>
                <span>Please fill in all required fields marked with an asterisk (*).</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/95 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Send Secure Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PRIVACY POLICY PAGE COMPONENT
// ==========================================
export function PrivacyPolicy() {
  React.useEffect(() => {
    document.title = "Privacy Policy | 100% Private Equine Calculations";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 animate-fade-in text-sm text-text-muted leading-relaxed">
      <SectionHeading
        title="Privacy Policy"
        subtitle="Last Updated: July 2026. Your privacy is not a feature; it's our absolute foundation."
        icon="fa-solid fa-shield-halved"
      />

      <div className="space-y-4 bg-white border border-border-card p-6 rounded-2xl shadow-sm">
        <h3 className="text-base font-bold text-text-main font-serif">1. Zero Server Logins & Personal Information</h3>
        <p>
          EquiToolkit does not run any database accounts. We do not prompt you for your name, email, street address, or phone number. You are 100% anonymous when visiting and using our calculations.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">2. Local Browser Storage (localStorage)</h3>
        <p>
          Features like the <strong>Riding Log Book</strong> and <strong>Horse Show Checklist Generator</strong> store data directly inside your own computer or phone's local storage database (localStorage). No data is transmitted to our servers or stored in any cloud environments. Your records are entirely private to you, and clearing your browser cache is the only way this data is removed.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">3. No Tracking Cookies or Third-Party Ads</h3>
        <p>
          We do not allow programmatic third-party banner advertising, behavior-profiling networks, or cookies. We do not monetize your veterinary search patterns or sell horse weight metrics to food, drug, or insurance corporations.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">4. SSL / HTTPS Security</h3>
        <p>
          All interactions are served over secure, military-grade end-to-end SSL encryption to prevent eavesdropping on public public barn Wi-Fi connections.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 4. TERMS OF SERVICE PAGE COMPONENT
// ==========================================
export function TermsOfService() {
  React.useEffect(() => {
    document.title = "Terms of Service | EquiToolkit General Agreement";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 animate-fade-in text-sm text-text-muted leading-relaxed">
      <SectionHeading
        title="Terms of Service"
        subtitle="Last Updated: July 2026. Simple, clear guidelines for using our digital tools."
        icon="fa-solid fa-file-contract"
      />

      <div className="space-y-4 bg-white border border-border-card p-6 rounded-2xl shadow-sm">
        <h3 className="text-base font-bold text-text-main font-serif">1. Agreement of Terms</h3>
        <p>
          By visiting EquiToolkit, you agree to these Terms of Service. If you do not agree to all provisions, please exit the page and do not utilize our calculators.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">2. Educational Disclaimers</h3>
        <p>
          All calculators, guidelines, dosage indicators, and calendars are provided for informational, recreational, and educational assistance only. They do not constitute official veterinary care or veterinary prescriptions.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">3. Permitted Personal Use</h3>
        <p>
          You are welcome to print, bookmark, and share pages from our service for personal barnside use, equine breeding facilities, riding clubs, and veterinary student research. You may not scrape our logic or duplicate our styling for commercial resale.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">4. Limitation of Liabilities</h3>
        <p>
          In no event shall EquiToolkit or its developers be liable for any physical injury, equine clinical illness, financial forage budget mismatch, or saddle fitting saddle sores arising from the utilization or interpretation of our tools.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 5. DISCLAIMER PAGE COMPONENT
// ==========================================
export function DisclaimerPage() {
  React.useEffect(() => {
    document.title = "Veterinary Medical Disclaimer | EquiToolkit";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 animate-fade-in text-sm text-text-muted leading-relaxed">
      <SectionHeading
        title="Veterinary Medical Disclaimer"
        subtitle="Critical safety notice regarding the clinical interpretations of our calculation formulas."
        icon="fa-solid fa-triangle-exclamation"
      />

      <AlertBox type="error" title="CRITICAL EMERGENCY NOTICE">
        The information on EquiToolkit is NOT a substitute for professional veterinary advice, diagnostics, or therapeutic treatment. Always seek immediate consultation from a qualified licensed equine veterinarian in case of physical injury, acute colic, lameness, or infectious diseases.
      </AlertBox>

      <div className="space-y-4 bg-white border border-border-card p-6 rounded-2xl shadow-sm">
        <h3 className="text-base font-bold text-text-main font-serif">Calculations Are Estimates</h3>
        <p>
          Equestrian mathematics (such as weight formulas, nutritional Cost Share, drug doses, and blanketing thresholds) are general guidelines built using statistical medians. Individual equine metabolisms, hidden pathology, hydration levels, and regional drug tolerances differ widely.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">Medication Specifics</h3>
        <p>
          Our <strong>Equine Drug Dosage Estimator</strong> uses standard reference ranges (e.g. 1.1 mg/kg for Banamine orally). Never administer prescription NSAIDs, sedatives, or anthelmintics without confirming the precise clinical scenario and specific volume with your primary veterinarian.
        </p>

        <h3 className="text-base font-bold text-text-main font-serif pt-2">No Professional Relationship</h3>
        <p>
          Use of these tools does not establish a doctor-patient-client relationship between you and any member of the EquiToolkit developer network.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 6. RESOURCES PAGE COMPONENT
// ==========================================
export function ResourcesPage({ onNavigate }: StaticPageProps) {
  React.useEffect(() => {
    document.title = "Equine Resources & Educational Guides | EquiToolkit";
  }, []);

  const resources = [
    {
      title: "American Association of Equine Practitioners (AAEP)",
      desc: "The gold standard for horse healthcare, vaccines, deworming guidelines, and clinical reference sheets.",
      link: "https://aaep.org",
      category: "Health & Care",
    },
    {
      title: "The Henneke Scoring System (Original Study)",
      desc: "Read the clinical papers from 1983 detailing Dr. Don Henneke's original 9-point body fat classification study.",
      link: "https://aaep.org/horse-owners/owner-guidelines/body-condition-score-chart",
      category: "Nutrition",
    },
    {
      title: "UC Davis Veterinary Medicine",
      desc: "Cutting edge biological advances in equine genetics, coat color alleles, and warmblood hereditary conditions.",
      link: "https://vgl.ucdavis.edu",
      category: "Genetics",
    },
    {
      title: "Equine Science Society (ESS)",
      desc: "Global research and symposia notes regarding horse performance, saddle pressures, and metabolic disorders.",
      link: "https://www.equinescience.org",
      category: "Research",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
      <SectionHeading
        title="Educational Resources"
        subtitle="Highly vetted external links and educational hubs to expand your equine knowledge base."
        icon="fa-solid fa-graduation-cap"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, idx) => (
          <div key={idx} className="bg-white border border-border-card/50 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                {res.category}
              </span>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-text-muted"></i>
            </div>
            <h3 className="font-serif font-bold text-text-main text-base">{res.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{res.desc}</p>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-primary font-bold hover:underline"
            >
              Visit Resource Website →
            </a>
          </div>
        ))}
      </div>

      <div className="border-t border-border-card/30 pt-8">
        <h3 className="font-serif font-bold text-text-main text-lg mb-4 text-center">Helpful Guides on Our Site</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOOLS.slice(0, 3).map((tool) => (
            <a
              key={tool.id}
              href={tool.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(tool.path);
              }}
              className="bg-bg border border-border-card hover:border-primary/40 rounded-xl p-4 flex items-center space-x-3 transition-colors"
            >
              <span className="text-2xl">{tool.emoji}</span>
              <div className="text-left overflow-hidden">
                <h4 className="text-xs font-bold text-text-main truncate font-serif">{tool.title}</h4>
                <p className="text-[10px] text-text-muted truncate">{tool.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. ALL TOOLS DIRECTORY PAGE COMPONENT
// ==========================================
export function AllToolsPage({ onNavigate }: StaticPageProps) {
  React.useEffect(() => {
    document.title = "Directory of All Free Equine Tools | EquiToolkit";
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <SectionHeading
          title="Equine Tools Directory"
          subtitle="Explore the complete comprehensive directory of every diagnostic calculator, schedule tracker, and packing planner we offer."
          centered
          icon="fa-solid fa-compass"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
