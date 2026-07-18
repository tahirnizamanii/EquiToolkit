import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-white border-t border-border-card/60 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-primary font-bold text-lg">
              <span><i className="fa-solid fa-horse text-primary"></i></span>
              <span className="font-serif">EquiToolkit</span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed">
              The premier online destination for 100% free, browser-native equine calculators, health estimators, and equestrian planning tools. No registrations, no advertisements, no tracking.
            </p>
          </div>

          {/* Popular Tools Col */}
          <div>
            <h4 className="text-text-main font-bold text-[11px] uppercase tracking-wider mb-4 text-primary">Popular Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/horse-weight-calculator"
                  onClick={(e) => handleLinkClick('/horse-weight-calculator', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Weight Calculator ⚖️
                </a>
              </li>
              <li>
                <a
                  href="/blanketing-guide"
                  onClick={(e) => handleLinkClick('/blanketing-guide', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Blanketing Temperature Chart 🧥
                </a>
              </li>
              <li>
                <a
                  href="/foal-color-predictor"
                  onClick={(e) => handleLinkClick('/foal-color-predictor', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Foal Color Genetics 🐴
                </a>
              </li>
              <li>
                <a
                  href="/riding-log"
                  onClick={(e) => handleLinkClick('/riding-log', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Riding Log & Journal 📝
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-text-main font-bold text-[11px] uppercase tracking-wider mb-4 text-primary">Equine Knowledge Hub</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/breeds"
                  onClick={(e) => handleLinkClick('/breeds', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Breed Care Database 🐴
                </a>
              </li>
              <li>
                <a
                  href="/colors"
                  onClick={(e) => handleLinkClick('/colors', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Coat Color Encyclopedia 🎨
                </a>
              </li>
              <li>
                <a
                  href="/reference-tables"
                  onClick={(e) => handleLinkClick('/reference-tables', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Equine Reference Tables 📊
                </a>
              </li>
              <li>
                <a
                  href="/health-library"
                  onClick={(e) => handleLinkClick('/health-library', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Horse Health Library 🩺
                </a>
              </li>
              <li>
                <a
                  href="/feed-database"
                  onClick={(e) => handleLinkClick('/feed-database', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Feed & Forage Database 🌾
                </a>
              </li>
              <li>
                <a
                  href="/equipment-guides"
                  onClick={(e) => handleLinkClick('/equipment-guides', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Tack & Equipment Guides 🏇
                </a>
              </li>
            </ul>
          </div>

          {/* Stable Operations Col */}
          <div>
            <h4 className="text-text-main font-bold text-[11px] uppercase tracking-wider mb-4 text-primary">Stable & Breeding</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/stable-hub"
                  onClick={(e) => handleLinkClick('/stable-hub', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Stable Operations Hub 🏠
                </a>
              </li>
              <li>
                <a
                  href="/breed-comparison"
                  onClick={(e) => handleLinkClick('/breed-comparison', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Breed Comparison Tool 📊
                </a>
              </li>
              <li>
                <a
                  href="/growth-charts"
                  onClick={(e) => handleLinkClick('/growth-charts', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Interactive Growth Charts 📈
                </a>
              </li>
              <li>
                <a
                  href="/timelines"
                  onClick={(e) => handleLinkClick('/timelines', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Husbandry Timelines ⏳
                </a>
              </li>
              <li>
                <a
                  href="/seasonal-care"
                  onClick={(e) => handleLinkClick('/seasonal-care', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Seasonal Care Guides 📅
                </a>
              </li>
              <li>
                <a
                  href="/trust"
                  onClick={(e) => handleLinkClick('/trust', e)}
                  className="text-text-muted hover:text-primary transition-colors font-semibold"
                >
                  Editorial & Trust Policy 🛡️
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-card/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted">
          <p className="flex items-center gap-1">
            © 2026 EquiToolkit. Made with <i className="fa-solid fa-heart text-red-500"></i> for the worldwide equestrian community.
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0 font-semibold">
            <a
              href="/privacy"
              onClick={(e) => handleLinkClick('/privacy', e)}
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href="/terms"
              onClick={(e) => handleLinkClick('/terms', e)}
              className="hover:text-primary transition-colors"
            >
              Terms of Use
            </a>
            <span>·</span>
            <a
              href="/disclaimer"
              onClick={(e) => handleLinkClick('/disclaimer', e)}
              className="hover:text-primary transition-colors text-red-600 hover:text-red-700"
            >
              Medical Disclaimer
            </a>
            <span>·</span>
            <a
              href="/sitemap.xml"
              onClick={(e) => handleLinkClick('/sitemap.xml', e)}
              className="hover:text-primary transition-colors"
            >
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
