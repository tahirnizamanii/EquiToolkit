import React, { useState, useEffect } from 'react';

export default function WaterIntake() {
  const [weightLbs, setWeightLbs] = useState<string>('1000');
  const [tempRange, setTempRange] = useState<string>('moderate'); // 'cold' | 'moderate' | 'warm' | 'hot'
  const [dietType, setDietType] = useState<string>('mixed'); // 'hay' | 'mixed' | 'pasture'
  const [workload, setWorkload] = useState<string>('light'); // 'idle' | 'light' | 'moderate' | 'heavy'
  const [isLactating, setIsLactating] = useState<boolean>(false);

  const [gallonsMin, setGallonsMin] = useState<number>(8);
  const [gallonsMax, setGallonsMax] = useState<number>(12);

  useEffect(() => {
    calculateWaterIntake();
  }, [weightLbs, tempRange, dietType, workload, isLactating]);

  const calculateWaterIntake = () => {
    const weight = parseFloat(weightLbs);
    if (isNaN(weight) || weight <= 0) return;

    // Base water intake is roughly 5 to 8 gallons per 1,000 lbs of body weight
    const baseMin = (weight / 1000) * 5;
    const baseMax = (weight / 1000) * 8;

    let multiplier = 1.0;
    
    // Temperature adjustment
    if (tempRange === 'cold') multiplier *= 0.9;
    if (tempRange === 'warm') multiplier *= 1.3;
    if (tempRange === 'hot') multiplier *= 1.8;

    // Workload adjustment additions (gallons)
    let workAddMin = 0;
    let workAddMax = 0;
    if (workload === 'light') {
      workAddMin = 1.5;
      workAddMax = 3;
    } else if (workload === 'moderate') {
      workAddMin = 3;
      workAddMax = 6;
    } else if (workload === 'heavy') {
      workAddMin = 6;
      workAddMax = 12;
    }

    // Diet adjustment (Pasture is 80% water, reducing direct drinking; dry hay requires more water)
    let dietMultiplier = 1.0;
    if (dietType === 'pasture') dietMultiplier = 0.6; // reduces drinking
    if (dietType === 'hay') dietMultiplier = 1.25; // increases drinking

    // Lactation adjustment (doubles base water needs for milk production)
    const lactationMultiplier = isLactating ? 1.8 : 1.0;

    let finalMin = (baseMin * multiplier * dietMultiplier * lactationMultiplier) + workAddMin;
    let finalMax = (baseMax * multiplier * dietMultiplier * lactationMultiplier) + workAddMax;

    setGallonsMin(parseFloat(finalMin.toFixed(1)));
    setGallonsMax(parseFloat(finalMax.toFixed(1)));
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto animate-fade-in" id="tool-water-intake">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-droplet text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Equine Water Intake Estimator</h3>
          <p className="text-xs text-text-muted">Calculates recommended daily drinking volume for horses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column: Inputs */}
        <div className="space-y-5">
          {/* Weight */}
          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
              Horse Weight (lbs)
            </label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full text-base font-medium"
              id="input-water-weight"
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
              Ambient Temperature
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { id: 'cold', label: 'Cold (<40°F)' },
                { id: 'moderate', label: 'Mild (40-70°F)' },
                { id: 'warm', label: 'Warm (70-90°F)' },
                { id: 'hot', label: 'Hot (>90°F)' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTempRange(t.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition-colors font-semibold ${
                    tempRange === t.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-border-card hover:bg-bg text-text-muted'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Diet */}
          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
              Feeding Program Diet
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'pasture', label: 'Lush Pasture' },
                { id: 'mixed', label: 'Mixed Hay/Grass' },
                { id: 'hay', label: 'Dry Hay Only' }
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDietType(d.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition-colors font-semibold ${
                    dietType === d.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-border-card hover:bg-bg text-text-muted'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workload */}
          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-1.5">
              Daily Training Workload
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { id: 'idle', label: 'Idle / Rest' },
                { id: 'light', label: 'Light' },
                { id: 'moderate', label: 'Moderate' },
                { id: 'heavy', label: 'Intense' }
              ].map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWorkload(w.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition-colors font-semibold ${
                    workload === w.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-border-card hover:bg-bg text-text-muted'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lactation Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-bg border rounded-xl">
            <div>
              <span className="block text-xs font-bold text-text-main">Is this a lactating mare?</span>
              <span className="block text-[10px] text-text-muted">Nursing mares need significantly more water to produce milk.</span>
            </div>
            <input
              type="checkbox"
              checked={isLactating}
              onChange={(e) => setIsLactating(e.target.checked)}
              className="w-5 h-5 rounded text-primary border-border-card focus:ring-primary"
            />
          </div>
        </div>

        {/* Right column: Results display */}
        <div className="bg-primary-light/30 border border-primary/10 rounded-2xl p-6 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Daily Water Goal Range</span>
          
          <div className="space-y-1">
            <span className="block text-5xl font-extrabold text-primary font-mono tracking-tight">
              {gallonsMin} - {gallonsMax}
            </span>
            <span className="block text-sm font-bold text-text-main">Gallons per Day</span>
            <span className="block text-xs text-text-muted font-mono">
              ({Math.round(gallonsMin * 3.785)} - {Math.round(gallonsMax * 3.785)} Liters)
            </span>
          </div>

          <div className="text-left space-y-3.5 text-xs text-text-muted border-t border-primary/10 pt-5">
            <h4 className="font-bold text-text-main text-center">💧 Important Feeding Tips:</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Dehydration:</strong> A horse deprived of water can develop fatal impaction colic within 48 hours.</li>
              <li><strong>Winter Warning:</strong> Horses drink less if water is freezing. Ideal bucket temp is 45°F - 65°F. Install bucket heaters to keep water appealing.</li>
              <li><strong>Pasture factor:</strong> Pastured horses get moisture from grass and may drink less from tanks, which is natural.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
