import React, { useState } from 'react';
import { HENNEKE_SCALE } from '../../data';

export default function BodyConditionScorer() {
  const [score, setScore] = useState<number>(5);

  const activeStage = HENNEKE_SCALE.find((s) => s.score === score) || HENNEKE_SCALE[4];

  // Map scores to status colors
  const getScoreColor = (s: number) => {
    if (s <= 3) return 'bg-red-500 text-white';
    if (s === 4) return 'bg-yellow-500 text-text-main';
    if (s === 5 || s === 6) return 'bg-green-600 text-white';
    if (s === 7) return 'bg-yellow-500 text-text-main';
    return 'bg-red-500 text-white';
  };

  const getScoreTitleColor = (s: number) => {
    if (s <= 3) return 'text-red-600';
    if (s === 4) return 'text-yellow-600';
    if (s === 5 || s === 6) return 'text-green-700';
    if (s === 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (s: number) => {
    if (s <= 3) return 'Underweight ⚠️';
    if (s === 4) return 'Moderately Thin';
    if (s === 5) return 'Ideal Score 🏆';
    if (s === 6) return 'Ideal / Moderately Fleshy';
    if (s === 7) return 'Overweight ⚠️';
    return 'Obese / Danger Zone 🚨';
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-body-condition">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-eye text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Henneke Body Condition Score (BCS)</h3>
          <p className="text-xs text-text-muted">Standard 1 to 9 visual assessment system for nutritional evaluation</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Interactive Slider */}
        <div className="bg-bg border border-border-card/40 rounded-xl p-5 md:p-6 text-center space-y-4">
          <label className="block text-sm font-bold text-text-main">
            Slide to adjust Henneke Score: <span className={`inline-block ml-1.5 px-3 py-1 rounded-full text-sm font-extrabold font-mono ${getScoreColor(score)}`} id="bcs-score-badge">{score}</span>
          </label>
          
          <div className="relative pt-1 max-w-xl mx-auto">
            <input
              type="range"
              min="1"
              max="9"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              id="bcs-slider"
            />
            {/* Custom Labels below slider */}
            <div className="flex justify-between text-[10px] font-bold text-text-muted mt-1 px-1 font-mono">
              <span>1 (Poor)</span>
              <span>3</span>
              <span>5 (Ideal)</span>
              <span>7</span>
              <span>9 (Obese)</span>
            </div>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="bg-white border border-border-card/40 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border-card/30" id="bcs-interpretation-box">
          <div className="md:col-span-2 p-5 bg-primary-light/10 flex flex-col justify-center text-center space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Classification</span>
            <div className={`text-xl font-extrabold ${getScoreTitleColor(score)}`} id="bcs-classification">
              {getScoreBadge(score)}
            </div>
            <p className="text-xs text-text-muted px-4 leading-relaxed font-semibold">
              Selected: Henneke Level {score}
            </p>
          </div>

          <div className="md:col-span-3 p-5 md:p-6 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <i className="fa-solid fa-eye text-xs text-primary"></i>
                Physical Description
              </h4>
              <p className="text-xs text-text-main leading-relaxed font-medium" id="bcs-description">
                {activeStage.description}
              </p>
            </div>

            <div className="border-t border-border-card/25 pt-3">
              <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <i className="fa-solid fa-shield text-xs text-accent"></i>
                Health Interpretation
              </h4>
              <p className="text-xs text-text-muted leading-relaxed italic font-medium" id="bcs-interpretation">
                {activeStage.interpretation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
