import React, { useState, useEffect } from 'react';

export default function AgeConverter() {
  const [horseAge, setHorseAge] = useState<string>('8');
  const [breedGroup, setBreedGroup] = useState<'light' | 'draft' | 'pony'>('light');
  const [humanAge, setHumanAge] = useState<number | null>(null);

  useEffect(() => {
    calculateHumanAge();
  }, [horseAge, breedGroup]);

  const calculateHumanAge = () => {
    const age = parseFloat(horseAge);
    if (isNaN(age) || age < 0) {
      setHumanAge(null);
      return;
    }

    let hAge = 0;
    if (age <= 2) {
      // First 2 years = 6.5 human years each
      hAge = age * 6.5;
    } else {
      // First 2 years = 13 human years total
      hAge = 13;
      const remainingYears = age - 2;

      // Rate depends on breed size
      if (breedGroup === 'light') {
        hAge += remainingYears * 2.5;
      } else if (breedGroup === 'draft') {
        hAge += remainingYears * 3.0; // Draft horses mature slower but age slightly faster in later years
      } else if (breedGroup === 'pony') {
        hAge += remainingYears * 2.0; // Ponies are notoriously long-lived
      }
    }

    setHumanAge(Math.round(hAge));
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-age-converter">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-hourglass-half text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Equine to Human Age Converter</h3>
          <p className="text-xs text-text-muted">Uses size-adjusted metabolic senescence indices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Horse's Age (Years)
            </label>
            <input
              type="number"
              value={horseAge}
              onChange={(e) => setHorseAge(e.target.value)}
              placeholder="e.g. 8"
              className="w-full text-base font-medium"
              min="0"
              max="50"
              id="age-input-years"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Breed Type & Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBreedGroup('light')}
                className={`py-2 px-1 border rounded-xl text-xs font-semibold transition-all text-center ${
                  breedGroup === 'light'
                    ? 'bg-primary-light border-primary text-primary shadow-sm'
                    : 'border-border-card/60 bg-white text-text-muted hover:border-text-muted'
                }`}
              >
                🏇 Light Horse
              </button>
              <button
                type="button"
                onClick={() => setBreedGroup('draft')}
                className={`py-2 px-1 border rounded-xl text-xs font-semibold transition-all text-center ${
                  breedGroup === 'draft'
                    ? 'bg-primary-light border-primary text-primary shadow-sm'
                    : 'border-border-card/60 bg-white text-text-muted hover:border-text-muted'
                }`}
              >
                🚜 Draft (Heavy)
              </button>
              <button
                type="button"
                onClick={() => setBreedGroup('pony')}
                className={`py-2 px-1 border rounded-xl text-xs font-semibold transition-all text-center ${
                  breedGroup === 'pony'
                    ? 'bg-primary-light border-primary text-primary shadow-sm'
                    : 'border-border-card/60 bg-white text-text-muted hover:border-text-muted'
                }`}
              >
                🦄 Pony
              </button>
            </div>
          </div>

          <div className="bg-bg border border-border-card/40 p-3.5 rounded-xl text-xs text-text-muted space-y-1.5">
            <p className="font-semibold text-text-main flex items-center gap-1.5">
              <i className="fa-solid fa-circle-info text-primary text-xs"></i>
              Aging Factors
            </p>
            <p className="leading-relaxed">
              Equine maturation is extremely rapid in the first two years (equivalent to human adolescence), after which it plateaus to a steady state. Ponies age slower and frequently live past 30 years.
            </p>
          </div>
        </div>

        {/* Output */}
        <div className="bg-bg rounded-xl border border-border-card/40 p-5 flex flex-col justify-center text-center">
          {humanAge !== null ? (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-bold text-accent bg-accent-light px-3 py-1 rounded-full uppercase tracking-wider">
                Human Age Equivalent
              </span>

              <div>
                <span className="text-5xl font-extrabold text-primary tracking-tight" id="age-result-human">
                  {humanAge}
                </span>
                <span className="text-xl font-bold text-text-muted ml-1">years old</span>
              </div>

              <div className="border-t border-border-card/25 pt-4 mt-2">
                <p className="text-xs text-text-muted">
                  At {horseAge} years, your horse is physically comparable to a {humanAge}-year-old human adult.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">Enter a valid age above to compute equivalents.</p>
          )}
        </div>
      </div>
    </div>
  );
}
