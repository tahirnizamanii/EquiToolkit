import React, { useState } from 'react';
import { TOOLS } from '../data';

interface NavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Nav({ currentPath, onNavigate }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHubsDropdownOpen, setIsHubsDropdownOpen] = useState(false);

  const filteredTools = TOOLS.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsHubsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-card/60 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => handleLinkClick('/', e)}
              className="flex items-center space-x-2 text-xl font-bold text-primary tracking-tight hover:opacity-90"
              id="nav-logo"
            >
              <span className="text-2xl"><i className="fa-solid fa-horse"></i></span>
              <span className="font-serif font-bold text-primary">EquiToolkit</span>
            </a>
          </div>

          {/* Desktop Search & Links */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
            {/* Search Bar */}
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-bg border border-border-card/80 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <div className="absolute top-full right-0 left-0 mt-2 bg-white border border-border-card rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                  {filteredTools.length > 0 ? (
                    filteredTools.map((tool) => (
                      <a
                        key={tool.id}
                        href={tool.path}
                        onClick={(e) => handleLinkClick(tool.path, e)}
                        className="flex items-center px-4 py-2.5 hover:bg-primary-light/50 text-sm text-text-main transition-colors border-b border-border-card/30 last:border-0"
                      >
                        <span className="mr-2 text-base">{tool.emoji}</span>
                        <div className="text-left">
                          <p className="font-medium">{tool.title}</p>
                          <p className="text-xs text-text-muted">{tool.category}</p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="p-3 text-xs text-text-muted text-center">No tools found</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick Navigation Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1.5 text-text-muted hover:text-primary font-medium text-sm transition-colors py-2"
                id="nav-tools-dropdown"
              >
                <i className="fa-solid fa-compass text-sm text-text-muted"></i>
                <span>Equestrian Tools</span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-border-card rounded-2xl shadow-xl z-50 py-2 grid grid-cols-1 gap-1">
                  <div className="px-4 py-1 text-xs font-semibold text-text-muted tracking-wider uppercase border-b border-border-card/30 mb-1">
                    Select a Tool
                  </div>
                  {TOOLS.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.path}
                      onClick={(e) => handleLinkClick(tool.path, e)}
                      className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                        currentPath === tool.path ? 'bg-primary-light text-primary font-medium' : ''
                      }`}
                    >
                      <span className="mr-2.5 text-base">{tool.emoji}</span>
                      <span>{tool.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Libraries & Hubs Dropdown */}
            <div className="relative text-left">
              <button
                onClick={() => setIsHubsDropdownOpen(!isHubsDropdownOpen)}
                className="flex items-center space-x-1.5 text-text-muted hover:text-primary font-medium text-sm transition-colors py-2"
                id="nav-hubs-dropdown"
              >
                <i className="fa-solid fa-layer-group text-sm text-text-muted"></i>
                <span>Libraries & Hubs</span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isHubsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isHubsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-border-card rounded-2xl shadow-xl z-50 py-3 grid grid-cols-1 gap-1">
                  <div className="px-4 py-1 text-xs font-semibold text-text-muted tracking-wider uppercase border-b border-border-card/30 mb-1 flex items-center justify-between">
                    <span>Equestrian Resources</span>
                    <span className="text-[10px] text-primary bg-primary-light px-1.5 py-0.5 rounded">NEW</span>
                  </div>
                  <a
                    href="/health-library"
                    onClick={(e) => handleLinkClick('/health-library', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/health-library' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">🩺</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Horse Health Library</p>
                      <p className="text-[10px] text-text-muted">Searchable medical knowledge base</p>
                    </div>
                  </a>
                  <a
                    href="/stable-hub"
                    onClick={(e) => handleLinkClick('/stable-hub', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/stable-hub' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">🏠</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Stable Operations Hub</p>
                      <p className="text-[10px] text-text-muted">Trackers, cleaning & task checklists</p>
                    </div>
                  </a>
                  <a
                    href="/feed-database"
                    onClick={(e) => handleLinkClick('/feed-database', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/feed-database' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">🌾</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Feed & Forage Database</p>
                      <p className="text-[10px] text-text-muted">Hay & feed nutrient encyclopedia</p>
                    </div>
                  </a>
                  <a
                    href="/breed-comparison"
                    onClick={(e) => handleLinkClick('/breed-comparison', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/breed-comparison' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">📊</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Breed Comparison Tool</p>
                      <p className="text-[10px] text-text-muted">Compare size, temperament & needs</p>
                    </div>
                  </a>
                  <a
                    href="/growth-charts"
                    onClick={(e) => handleLinkClick('/growth-charts', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/growth-charts' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">📈</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Interactive Growth Charts</p>
                      <p className="text-[10px] text-text-muted">Interactive weight & height projections</p>
                    </div>
                  </a>
                  <a
                    href="/timelines"
                    onClick={(e) => handleLinkClick('/timelines', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/timelines' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">⏳</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Husbandry Timelines</p>
                      <p className="text-[10px] text-text-muted">Deworming, vaccine & gestation tracker</p>
                    </div>
                  </a>
                  <a
                    href="/seasonal-care"
                    onClick={(e) => handleLinkClick('/seasonal-care', e)}
                    className={`flex items-center px-4 py-2 text-sm text-text-main hover:bg-primary-light/60 transition-colors ${
                      currentPath === '/seasonal-care' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">📅</span>
                    <div className="text-left">
                      <p className="font-medium text-xs text-text-main">Seasonal Care Guides</p>
                      <p className="text-[10px] text-text-muted">Spring, summer, autumn, winter regimens</p>
                    </div>
                  </a>
                  <a
                    href="/search"
                    onClick={(e) => handleLinkClick('/search', e)}
                    className={`flex items-center px-4 py-2.5 text-sm text-text-main hover:bg-primary-light/60 border-t border-border-card/30 mt-1 pt-1.5 transition-colors ${
                      currentPath === '/search' ? 'bg-primary-light text-primary font-medium' : ''
                    }`}
                  >
                    <span className="mr-3 text-base">🔍</span>
                    <div className="text-left">
                      <p className="font-semibold text-xs text-primary">Advanced Search</p>
                      <p className="text-[10px] text-text-muted">Query entire database instantly</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a
              href="/breeds"
              onClick={(e) => handleLinkClick('/breeds', e)}
              className={`hover:text-primary font-medium text-sm transition-colors ${currentPath === '/breeds' ? 'text-primary font-semibold' : 'text-text-muted'}`}
            >
              Breeds
            </a>

            <a
              href="/colors"
              onClick={(e) => handleLinkClick('/colors', e)}
              className={`hover:text-primary font-medium text-sm transition-colors ${currentPath === '/colors' ? 'text-primary font-semibold' : 'text-text-muted'}`}
            >
              Colors
            </a>

            <a
              href="/reference-tables"
              onClick={(e) => handleLinkClick('/reference-tables', e)}
              className={`hover:text-primary font-medium text-sm transition-colors ${currentPath === '/reference-tables' ? 'text-primary font-semibold' : 'text-text-muted'}`}
            >
              References
            </a>

            <a
              href="/printable-resources"
              onClick={(e) => handleLinkClick('/printable-resources', e)}
              className={`hover:text-primary font-medium text-sm transition-colors ${currentPath === '/printable-resources' ? 'text-primary font-semibold' : 'text-text-muted'}`}
            >
              Printables
            </a>

            <a
              href="/articles"
              onClick={(e) => handleLinkClick('/articles', e)}
              className={`hover:text-primary font-medium text-sm transition-colors ${currentPath === '/articles' || currentPath.startsWith('/article/') ? 'text-primary font-semibold' : 'text-text-muted'}`}
            >
              Guides
            </a>

            <button
              onClick={(e) => handleLinkClick('/horse-weight-calculator', e)}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-semibold px-4.5 py-2 rounded-full transition-all flex items-center space-x-1 shadow-sm cursor-pointer"
              id="nav-cta-weight"
            >
              <i className="fa-solid fa-weight-hanging text-xs mr-1"></i>
              <span>Weight Calculator</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-bg transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <i className="fa-solid fa-xmark text-lg"></i> : <i className="fa-solid fa-bars text-lg"></i>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border-card/40 bg-white/95 px-4 pt-3 pb-6 space-y-4 shadow-inner">
          {/* Mobile Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input
              type="text"
              placeholder="Search equine tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-bg border border-border-card/80 rounded-xl focus:bg-white"
            />
            {searchQuery && (
              <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-border-card rounded-xl shadow-lg max-h-48 overflow-y-auto z-50">
                {filteredTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.path}
                    onClick={(e) => handleLinkClick(tool.path, e)}
                    className="flex items-center px-3 py-2 hover:bg-primary-light/50 text-xs"
                  >
                    <span className="mr-2">{tool.emoji}</span>
                    <span>{tool.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 py-1 border-b border-border-card/30">
              Knowledge Hub
            </p>
            <a
              href="/breeds"
              onClick={(e) => handleLinkClick('/breeds', e)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm text-text-main hover:bg-primary-light/50 transition-colors ${
                currentPath === '/breeds' ? 'bg-primary-light/80 text-primary font-semibold' : ''
              }`}
            >
              <span className="mr-3">🐴</span>
              <span>Breed Care Database</span>
            </a>
            <a
              href="/colors"
              onClick={(e) => handleLinkClick('/colors', e)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm text-text-main hover:bg-primary-light/50 transition-colors ${
                currentPath === '/colors' ? 'bg-primary-light/80 text-primary font-semibold' : ''
              }`}
            >
              <span className="mr-3">🎨</span>
              <span>Coat Colors</span>
            </a>
            <a
              href="/reference-tables"
              onClick={(e) => handleLinkClick('/reference-tables', e)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm text-text-main hover:bg-primary-light/50 transition-colors ${
                currentPath === '/reference-tables' ? 'bg-primary-light/80 text-primary font-semibold' : ''
              }`}
            >
              <span className="mr-3">📊</span>
              <span>Reference Tables</span>
            </a>
            <a
              href="/printable-resources"
              onClick={(e) => handleLinkClick('/printable-resources', e)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm text-text-main hover:bg-primary-light/50 transition-colors ${
                currentPath === '/printable-resources' ? 'bg-primary-light/80 text-primary font-semibold' : ''
              }`}
            >
              <span className="mr-3">📝</span>
              <span>Printable Templates</span>
            </a>
            <a
              href="/articles"
              onClick={(e) => handleLinkClick('/articles', e)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm text-text-main hover:bg-primary-light/50 transition-colors ${
                currentPath === '/articles' || currentPath.startsWith('/article/') ? 'bg-primary-light/80 text-primary font-semibold' : ''
              }`}
            >
              <span className="mr-3">📖</span>
              <span>Educational Guides</span>
            </a>

            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 py-1 border-b border-border-card/30 pt-3">
              Free Calculators
            </p>
            {TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={tool.path}
                onClick={(e) => handleLinkClick(tool.path, e)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm text-text-main hover:bg-primary-light/50 transition-colors ${
                  currentPath === tool.path ? 'bg-primary-light/80 text-primary font-semibold' : ''
                }`}
              >
                <span className="mr-3">{tool.emoji}</span>
                <span>{tool.title}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-border-card/30">
            <button
              onClick={(e) => handleLinkClick('/horse-weight-calculator', e)}
              className="w-full text-center bg-primary hover:bg-primary/95 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm cursor-pointer"
            >
              Start With Weight Calculator ⚖️
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
