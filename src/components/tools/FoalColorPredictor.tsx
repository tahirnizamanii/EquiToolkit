import React, { useState, useEffect } from 'react';
import { predictFoalColor, HORSE_COLORS, FoalProbability } from '../../data';

export default function FoalColorPredictor() {
  const [sire, setSire] = useState<string>('Bay');
  const [dam, setDam] = useState<string>('Chestnut');
  const [predictions, setPredictions] = useState<FoalProbability[]>([]);

  useEffect(() => {
    const results = predictFoalColor(sire, dam);
    // Sort descending by probability
    results.sort((a, b) => b.probability - a.probability);
    setPredictions(results);
  }, [sire, dam]);

  // Visual background color matcher for horse coat colors
  const getColorBadgeClass = (colorName: string): string => {
    const norm = colorName.toLowerCase();
    if (norm.includes('chestnut')) return 'bg-amber-800 text-white';
    if (norm.includes('black')) return 'bg-gray-900 text-white';
    if (norm.includes('bay')) return 'bg-yellow-900 text-white';
    if (norm.includes('grey') || norm.includes('gray')) return 'bg-gray-200 text-gray-800 border';
    if (norm.includes('palomino')) return 'bg-yellow-200 text-yellow-800 border border-yellow-300';
    if (norm.includes('buckskin')) return 'bg-yellow-600 text-white';
    if (norm.includes('cremello') || norm.includes('perlino') || norm.includes('smoky')) return 'bg-amber-50 text-amber-900 border';
    if (norm.includes('roan')) return 'bg-rose-100 text-rose-800 border';
    if (norm.includes('dun')) return 'bg-amber-600 text-white';
    return 'bg-amber-100 text-amber-800';
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-foal-color">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-dna text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Foal Coat Color Predictor</h3>
          <p className="text-xs text-text-muted">Calculates genetic allele frequencies and modifier variables</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sire and Dam Pickers */}
        <div className="space-y-4">
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <label className="block text-sm font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5">
              <span>🧬</span> Sire (Stallion) Color
            </label>
            <select
              value={sire}
              onChange={(e) => setSire(e.target.value)}
              className="w-full bg-white border-blue-200 text-blue-950 focus:ring-blue-500"
              id="select-sire"
            >
              {HORSE_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
            <label className="block text-sm font-semibold text-rose-900 mb-1.5 flex items-center gap-1.5">
              <span>🧬</span> Dam (Mare) Color
            </label>
            <select
              value={dam}
              onChange={(e) => setDam(e.target.value)}
              className="w-full bg-white border-rose-200 text-rose-950 focus:ring-rose-500"
              id="select-dam"
            >
              {HORSE_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-text-muted bg-bg p-3 rounded-lg border border-border-card/40">
            <p className="font-semibold text-text-main mb-1">🧬 Simplified Genetic Engine</p>
            <p>
              Calculates likelihoods based on primary extension gene (E/e), agouti locus (A/a), and dominant dilutes (Cream, Dun, Roan, Grey).
            </p>
          </div>
        </div>

        {/* Output Probability List */}
        <div className="bg-bg rounded-xl border border-border-card/40 p-5">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <i className="fa-solid fa-wand-magic-sparkles text-primary text-xs"></i>
            Coat Color Probabilities
          </h4>

          <div className="space-y-3.5" id="color-prediction-results">
            {predictions.map((p) => (
              <div key={p.color} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getColorBadgeClass(p.color)}`}>
                    {p.color}
                  </span>
                  <span className="font-mono font-bold text-text-main">{p.probability}%</span>
                </div>
                {/* Custom Percentage bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border-card/25 pt-4 mt-6 text-[11px] text-text-muted">
            <p>⚠️ <em>Note:</em> Equine coat genetics are complex. Environmental factors, unexpressed recessive genes, or white pattern mutations (Sabo, Tobiano) can modify actual phenotypes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
