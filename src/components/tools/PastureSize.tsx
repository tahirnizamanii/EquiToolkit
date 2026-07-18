import React, { useState, useEffect } from 'react';

export default function PastureSize() {
  const [numHorses, setNumHorses] = useState<string>('2');
  const [avgWeight, setAvgWeight] = useState<string>('1000');
  const [grazingHours, setGrazingHours] = useState<string>('8');
  const [pastureQuality, setPastureQuality] = useState<string>('average'); // 'poor' | 'average' | 'excellent'
  const [isRotational, setIsRotational] = useState<boolean>(true);

  const [recommendedAcres, setRecommendedAcres] = useState<number>(4);
  const [stockingRate, setStockingRate] = useState<number>(0.5); // horses per acre

  useEffect(() => {
    calculatePastureRequirements();
  }, [numHorses, avgWeight, grazingHours, pastureQuality, isRotational]);

  const calculatePastureRequirements = () => {
    const horses = parseFloat(numHorses);
    const weight = parseFloat(avgWeight);
    const hours = parseFloat(grazingHours);

    if (isNaN(horses) || horses <= 0 || isNaN(weight) || weight <= 0) return;

    // Standard rule: 1 horse (1,000 lbs) continuously grazing 24 hours/day needs roughly 2.0 acres of average pasture.
    // Base required acres per 1,000 lbs of weight
    let baseAcresPerHorse = 2.0;

    // Adjust based on pasture quality
    if (pastureQuality === 'poor') baseAcresPerHorse = 4.0;
    if (pastureQuality === 'excellent') baseAcresPerHorse = 1.0;

    // Weight factor scaling
    const weightFactor = weight / 1000;

    // Grazing hours factor (if they are stalled half the day, they eat less pasture)
    const hoursFactor = hours / 24;

    // Rotational grazing increases pasture carrying efficiency by ~30% (reducing acreage needed)
    const managementFactor = isRotational ? 0.75 : 1.0;

    let totalAcres = horses * baseAcresPerHorse * weightFactor * hoursFactor * managementFactor;
    
    // Set a logical minimum floor of 0.5 acres for welfare reasons
    if (totalAcres < 0.5) totalAcres = 0.5;

    setRecommendedAcres(parseFloat(totalAcres.toFixed(1)));
    setStockingRate(parseFloat((horses / totalAcres).toFixed(2)));
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto animate-fade-in" id="tool-pasture-size">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-leaf text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Pasture Size & Stocking Calculator</h3>
          <p className="text-xs text-text-muted">Analyze acreage needs and optimize grazing carrying capacity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1">
                Number of Horses
              </label>
              <input
                type="number"
                value={numHorses}
                onChange={(e) => setNumHorses(e.target.value)}
                placeholder="e.g. 2"
                className="w-full text-sm font-medium"
                min="1"
                id="input-pasture-horses"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1">
                Avg Weight (lbs)
              </label>
              <input
                type="number"
                value={avgWeight}
                onChange={(e) => setAvgWeight(e.target.value)}
                placeholder="e.g. 1000"
                className="w-full text-sm font-medium"
                min="100"
                id="input-pasture-weight"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
              Daily Grazing Hours per Horse
            </label>
            <div className="relative">
              <input
                type="number"
                value={grazingHours}
                onChange={(e) => setGrazingHours(e.target.value)}
                placeholder="e.g. 8"
                className="w-full pr-12 text-sm font-medium"
                min="1"
                max="24"
                id="input-pasture-hours"
              />
              <span className="absolute right-3 top-3.5 text-[10px] text-text-muted font-mono">HRS/DAY</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
              Forage & Pasture Quality
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'poor', label: 'Poor / Sparse' },
                { id: 'average', label: 'Average' },
                { id: 'excellent', label: 'Lush / Premium' }
              ].map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setPastureQuality(q.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition-colors font-semibold ${
                    pastureQuality === q.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-border-card hover:bg-bg text-text-muted'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rotational Grazing Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-bg border rounded-xl">
            <div>
              <span className="block text-xs font-bold text-text-main">Using Rotational Grazing?</span>
              <span className="block text-[10px] text-text-muted">Rotating horses between multiple fields improves grass recovery by 30%.</span>
            </div>
            <input
              type="checkbox"
              checked={isRotational}
              onChange={(e) => setIsRotational(e.target.checked)}
              className="w-5 h-5 rounded text-primary border-border-card focus:ring-primary"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-primary-light/30 border border-primary/10 rounded-2xl p-6 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Acreage Recommendation</span>

          <div className="space-y-4">
            <div>
              <span className="block text-5xl font-extrabold text-primary font-mono">{recommendedAcres}</span>
              <span className="block text-[11px] font-bold text-text-muted uppercase">Recommended Acres</span>
            </div>

            <div className="border-t border-primary/10 pt-4">
              <span className="block text-2xl font-extrabold text-text-main font-mono">{stockingRate}</span>
              <span className="block text-[11px] font-bold text-text-muted uppercase">Stocking Rate (Horses/Acre)</span>
            </div>
          </div>

          <div className="text-left space-y-3.5 text-xs text-text-muted border-t border-primary/10 pt-5">
            <h4 className="font-bold text-text-main text-center">🌱 Sustainable Grazing Rules:</h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li><strong>The 3-Inch Rule:</strong> Never let horses graze grass lower than 3 inches. Eating grass down to the roots destroys the pasture and promotes weed growth.</li>
              <li><strong>Rest Periods:</strong> Rotational paddocks require at least 21 to 30 days of rest before regrazing to allow optimal growth.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
