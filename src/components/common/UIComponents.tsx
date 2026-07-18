import React, { useState } from 'react';
import { Tool } from '../../types';

// ==========================================
// 1. BREADCRUMBS COMPONENT
// ==========================================
interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  // Generates JSON-LD BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.label,
      'item': item.path ? `https://equitoolkit.com${item.path}` : undefined,
    })),
  };

  return (
    <nav className="flex mb-6 text-xs text-text-muted select-none no-print" aria-label="Breadcrumb">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <ol className="flex items-center space-x-2">
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
          >
            <i className="fa-solid fa-house text-[10px]"></i>
            <span>Home</span>
          </a>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-[10px] text-border-card/80">/</span>
              {isLast || !item.path ? (
                <span className="text-text-main font-semibold truncate max-w-[150px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path!);
                  }}
                  className="hover:text-primary transition-colors font-semibold truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ==========================================
// 2. TOOL CARD COMPONENT
// ==========================================
interface ToolCardProps {
  key?: any;
  tool: Tool;
  onNavigate: (path: string) => void;
}

export function ToolCard({ tool, onNavigate }: ToolCardProps) {
  return (
    <a
      href={tool.path}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(tool.path);
      }}
      className="bg-white border border-border-card/50 hover:border-primary/50 hover:shadow-lg rounded-2xl p-5 md:p-6 transition-all flex flex-col justify-between group h-full relative overflow-hidden"
      id={`card-${tool.id}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-block">
            {tool.emoji}
          </span>
          <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
            {tool.category}
          </span>
        </div>
        <div className="space-y-1.5">
          <h3 className="font-bold text-text-main text-base font-serif group-hover:text-primary transition-colors">
            {tool.title}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed">
            {tool.shortDesc}
          </p>
        </div>
      </div>
      <div className="mt-5 pt-3 border-t border-border-card/30 flex items-center justify-between text-xs font-semibold text-primary/80 group-hover:text-primary">
        <span>Launch Tool</span>
        <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
      </div>
    </a>
  );
}

// ==========================================
// 3. CALCULATOR CARD COMPONENT
// ==========================================
interface CalculatorCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

export function CalculatorCard({ title, icon, children, headerActions }: CalculatorCardProps) {
  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-5 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-card/30 pb-4 mb-6 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
            <i className={`${icon} text-lg`}></i>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-main font-serif">{title}</h3>
          </div>
        </div>
        {headerActions && <div className="flex items-center">{headerActions}</div>}
      </div>
      {children}
    </div>
  );
}

// ==========================================
// 4. FAQ ACCORDION COMPONENT
// ==========================================
interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema (JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a,
      },
    })),
  };

  return (
    <div className="space-y-4">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="divide-y divide-border-card/30 bg-white border border-border-card/40 rounded-2xl overflow-hidden shadow-sm">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between font-serif font-semibold text-text-main text-sm sm:text-base hover:bg-bg/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="pr-4 leading-snug">{item.q}</span>
                <i
                  className={`fa-solid fa-chevron-down text-xs text-text-muted transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`}
                ></i>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-[500px] border-t border-border-card/10' : 'max-h-0'
                }`}
              >
                <div className="px-5 py-4 text-xs sm:text-sm text-text-muted leading-relaxed bg-bg/20">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 5. CTA BANNER COMPONENT
// ==========================================
interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
}

export function CTABanner({
  title,
  description,
  buttonText,
  onButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
}: CTABannerProps) {
  return (
    <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg">
      <div className="space-y-5 relative z-10 max-w-xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold font-serif tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-primary-light leading-relaxed max-w-lg mx-auto">
          {description}
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onButtonClick}
            className="w-full sm:w-auto bg-white text-primary hover:bg-bg transition-colors font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm cursor-pointer"
          >
            {buttonText}
          </button>
          {secondaryButtonText && onSecondaryButtonClick && (
            <button
              onClick={onSecondaryButtonClick}
              className="w-full sm:w-auto bg-primary border border-primary-light/40 hover:bg-primary-light/10 text-white transition-colors font-bold text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer"
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>

      {/* Decorative ambient blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
    </div>
  );
}

// ==========================================
// 6. ACCESSIBLE INPUT FIELD COMPONENT
// ==========================================
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  icon?: string;
  exampleValue?: string;
  error?: string;
  suffix?: string;
}

export function InputField({
  label,
  icon,
  exampleValue,
  error,
  suffix,
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block text-xs sm:text-sm font-semibold text-text-main flex items-center gap-1.5">
        {icon && <i className={`${icon} text-primary text-xs w-4 text-center`}></i>}
        <span>{label}</span>
      </label>
      <div className="relative rounded-xl shadow-sm">
        <input
          id={id}
          className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border-card/80 focus:border-primary'
          } ${suffix ? 'pr-16' : ''}`}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-semibold text-text-muted">
            {suffix}
          </div>
        )}
      </div>
      <div className="flex justify-between items-start gap-1">
        {error ? (
          <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
            <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
            {error}
          </span>
        ) : exampleValue ? (
          <span className="text-[10px] text-text-muted">
            e.g. {exampleValue}
          </span>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. RESULT CARD COMPONENT
// ==========================================
interface ResultCardProps {
  title: string;
  value: string;
  unit?: string;
  description?: string;
  children?: React.ReactNode;
  onReset?: () => void;
  shareTitle?: string;
  shareText?: string;
}

export function ResultCard({
  title,
  value,
  unit,
  description,
  children,
  onReset,
  shareTitle = 'EquiToolkit Calculator Result',
  shareText = 'I got an amazing calculation using EquiToolkit!',
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = `${title}: ${value} ${unit || ''}\n${description || ''}\nCalculated at EquiToolkit.com`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShare = async () => {
    const fullText = `${title}: ${value} ${unit || ''}\n${description || ''}`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: fullText,
          url: url,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.log('Web share cancelled or failed', err);
      }
    } else {
      // Fallback: Copy to clipboard and alert
      try {
        await navigator.clipboard.writeText(`${fullText}\nShared from ${url}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error('Share fallback failed', err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-light/80 to-bg border border-primary/25 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
      <div className="space-y-4 relative z-10">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-3xl sm:text-4xl font-extrabold text-text-main font-serif tracking-tight" id="calc-result-val">
            {value}
          </span>
          {unit && <span className="text-base sm:text-lg font-bold text-text-main">{unit}</span>}
        </div>
        {description && <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">{description}</p>}

        {children}

        {/* Dynamic action buttons */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-border-card/20 no-print">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 text-xs font-semibold text-text-main bg-white hover:bg-bg border border-border-card/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Copy results to clipboard"
          >
            {copied ? (
              <>
                <i className="fa-solid fa-check text-green-600"></i>
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <i className="fa-regular fa-copy text-text-muted"></i>
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 text-xs font-semibold text-text-main bg-white hover:bg-bg border border-border-card/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Share results via Web Share API or copy link"
          >
            {shared ? (
              <>
                <i className="fa-solid fa-check text-green-600"></i>
                <span className="text-green-600">Link Copied!</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-share-nodes text-text-muted"></i>
                <span>Share</span>
              </>
            )}
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 text-xs font-semibold text-text-muted hover:text-red-600 bg-white hover:bg-red-50 border border-border-card/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Reset input fields"
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. ALERT BOX (DISCLAIMERS, INFORMATION)
// ==========================================
interface AlertBoxProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

export function AlertBox({ type = 'info', title, children }: AlertBoxProps) {
  const styles = {
    info: {
      bg: 'bg-primary-light/40 text-primary-dark border-primary/20',
      icon: 'fa-solid fa-circle-info text-primary',
    },
    warning: {
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      icon: 'fa-solid fa-triangle-exclamation text-amber-700',
    },
    error: {
      bg: 'bg-red-50 text-red-950 border-red-200',
      icon: 'fa-solid fa-circle-exclamation text-red-600',
    },
    success: {
      bg: 'bg-green-50 text-green-950 border-green-200',
      icon: 'fa-solid fa-circle-check text-green-600',
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`border rounded-xl p-4 flex items-start space-x-3 text-xs leading-relaxed ${currentStyle.bg}`}>
      <i className={`${currentStyle.icon} shrink-0 text-base mt-0.5`}></i>
      <div className="space-y-1">
        {title && <strong className="block font-bold text-text-main">{title}</strong>}
        <div className="text-text-muted font-medium">{children}</div>
      </div>
    </div>
  );
}

// ==========================================
// 9. SECTION HEADING COMPONENT
// ==========================================
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, icon, centered = false }: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-xl sm:text-2xl font-bold text-text-main font-serif flex items-center gap-2 ${centered ? 'justify-center' : 'justify-start'}`}>
        {icon && <i className={`${icon} text-primary`}></i>}
        <span>{title}</span>
      </h2>
      {subtitle && <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

// ==========================================
// 10. RELATED TOOLS LINKS COMPONENT
// ==========================================
interface RelatedToolsProps {
  currentToolId: string;
  allTools: Tool[];
  onNavigate: (path: string) => void;
}

export function RelatedTools({ currentToolId, allTools, onNavigate }: RelatedToolsProps) {
  // Find related tools (same category or next ones, up to 3-6)
  const currentTool = allTools.find(t => t.id === currentToolId);
  const related = allTools
    .filter(t => t.id !== currentToolId)
    .sort((a, b) => {
      if (currentTool && a.category === currentTool.category && b.category !== currentTool.category) return -1;
      if (currentTool && b.category === currentTool.category && a.category !== currentTool.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <div className="mt-12 pt-8 border-t border-border-card/40 no-print">
      <SectionHeading title="Related Equestrian Tools" subtitle="Continue exploring other useful calculators and charts for your barn." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {related.map(tool => (
          <a
            key={tool.id}
            href={tool.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(tool.path);
            }}
            className="bg-white border border-border-card/40 hover:border-primary/40 rounded-xl p-4 flex items-center space-x-3 transition-all hover:shadow-sm"
          >
            <span className="text-2xl">{tool.emoji}</span>
            <div className="text-left overflow-hidden">
              <h4 className="text-xs font-bold text-text-main truncate font-serif">{tool.title}</h4>
              <p className="text-[10px] text-text-muted truncate">{tool.shortDesc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
