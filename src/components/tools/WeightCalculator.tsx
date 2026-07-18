import React, { useState, useEffect } from 'react';

export default function WeightCalculator() {
  const [isMetric, setIsMetric] = useState(false);
  const [girth, setGirth] = useState<string>('70'); // Default inches
  const [length, setLength] = useState<string>('66'); // Default inches
  const [resultLbs, setResultLbs] = useState<number | null>(null);
  const [resultKgs, setResultKgs] = useState<number | null>(null);

  useEffect(() => {
    calculateWeight();
  }, [girth, length, isMetric]);

  const handleToggleUnit = () => {
    const currentG = parseFloat(girth);
    const currentL = parseFloat(length);

    if (isMetric) {
      // Converting metric inputs (cm) to imperial (inches) for the display
      if (!isNaN(currentG) && !isNaN(currentL)) {
        setGirth((currentG / 2.54).toFixed(1));
        setLength((currentL / 2.54).toFixed(1));
      }
    } else {
      // Converting imperial (inches) to metric (cm)
      if (!isNaN(currentG) && !isNaN(currentL)) {
        setGirth((currentG * 2.54).toFixed(1));
        setLength((currentL * 2.54).toFixed(1));
      }
    }
    setIsMetric(!isMetric);
  };

  const calculateWeight = () => {
    const g = parseFloat(girth);
    const l = parseFloat(length);

    if (isNaN(g) || isNaN(l) || g <= 0 || l <= 0) {
      setResultLbs(null);
      setResultKgs(null);
      return;
    }

    if (isMetric) {
      // Metric formula: Weight (kg) = (Girth (cm)^2 * Length (cm)) / 11877
      const kg = (Math.pow(g, 2) * l) / 11877;
      setResultKgs(Math.round(kg));
      setResultLbs(Math.round(kg * 2.20462));
    } else {
      // Imperial formula: Weight (lbs) = (Girth (in)^2 * Length (in)) / 330
      const lbs = (Math.pow(g, 2) * l) / 330;
      setResultLbs(Math.round(lbs));
      setResultKgs(Math.round(lbs * 0.453592));
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-weight-calculator">
      <div className="flex items-center justify-between border-b border-border-card/30 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
            <i className="fa-solid fa-weight-scale text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">Equine Weight Estimator</h3>
            <p className="text-xs text-text-muted">Uses the standard AAEP morphometric equation</p>
          </div>
        </div>
        <button
          onClick={handleToggleUnit}
          className="flex items-center space-x-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-primary-light/80 px-3 py-1.5 rounded-full transition-colors"
          id="btn-unit-toggle"
        >
          <i className="fa-solid fa-rotate text-xs"></i>
          <span>Switch to {isMetric ? 'Imperial (in/lbs)' : 'Metric (cm/kg)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Heart Girth ({isMetric ? 'centimeters' : 'inches'})
            </label>
            <div className="relative">
              <input
                type="number"
                value={girth}
                onChange={(e) => setGirth(e.target.value)}
                placeholder={isMetric ? 'e.g. 178' : 'e.g. 70'}
                className="w-full text-lg pr-12 font-medium"
                min="1"
                id="input-girth"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-text-muted font-mono uppercase">
                {isMetric ? 'cm' : 'in'}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1">Measure all the way around the widest part of the barrel, just behind the elbows.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Body Length ({isMetric ? 'centimeters' : 'inches'})
            </label>
            <div className="relative">
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder={isMetric ? 'e.g. 168' : 'e.g. 66'}
                className="w-full text-lg pr-12 font-medium"
                min="1"
                id="input-length"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-text-muted font-mono uppercase">
                {isMetric ? 'cm' : 'in'}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1">Measure from the point of the shoulder, straight back along the side, to the point of the buttock.</p>
          </div>
        </div>

        {/* Results Block */}
        <div className="bg-bg rounded-xl border border-border-card/40 p-5 flex flex-col justify-center min-h-[220px] text-center">
          {resultLbs !== null && resultKgs !== null ? (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest">Estimated Weight</p>
              
              <div>
                <span className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight" id="weight-result-lbs">
                  {resultLbs.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-text-muted ml-1">lbs</span>
              </div>

              <div className="inline-flex items-center justify-center space-x-1 px-3 py-1 bg-white border border-border-card/30 rounded-full text-xs font-medium text-text-muted">
                <span>Equivalent to</span>
                <strong className="text-text-main font-semibold" id="weight-result-kgs">{resultKgs} kg</strong>
              </div>

              <div className="border-t border-border-card/20 pt-4 mt-2">
                <p className="text-xs text-text-muted flex items-center justify-center gap-1">
                  <i className="fa-solid fa-check text-green-600 text-[10px]"></i>
                  Accuracy is usually within 3-5% of a scale weight.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-text-muted flex flex-col items-center py-6">
              <i className="fa-solid fa-circle-info text-border-card text-3xl mb-2"></i>
              <p className="text-sm font-medium">Please enter valid positive measurements to calculate the horse's weight.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
