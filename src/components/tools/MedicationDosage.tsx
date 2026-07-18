import React, { useState, useEffect } from 'react';
import { MEDICATIONS } from '../../data';

export default function MedicationDosage() {
  const [weight, setWeight] = useState<string>('1000');
  const [isMetric, setIsMetric] = useState<boolean>(false);
  const [selectedDrugIndex, setSelectedDrugIndex] = useState<number>(0);
  
  const [result, setResult] = useState<{ dose: string; form: string; warning: string } | null>(null);

  useEffect(() => {
    calculateDose();
  }, [weight, isMetric, selectedDrugIndex]);

  const calculateDose = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      setResult(null);
      return;
    }

    // Convert weight to lbs for internal calculator formulas
    const weightLbs = isMetric ? w * 2.20462 : w;
    const drug = MEDICATIONS[selectedDrugIndex];
    if (drug) {
      setResult(drug.calculator(weightLbs));
    }
  };

  const selectedDrug = MEDICATIONS[selectedDrugIndex];

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-medication-dosage">
      {/* Alert Header - Critical */}
      <div className="bg-red-50 text-red-900 border border-red-200 rounded-xl p-4 mb-6 flex items-start space-x-3 text-xs leading-relaxed">
        <i className="fa-solid fa-triangle-exclamation text-red-600 shrink-0 text-lg mt-0.5"></i>
        <div>
          <strong className="text-red-800 font-bold">CRITICAL EMERGENCY DISCLAIMER:</strong> This tool is provided solely for educational reference. Weight-based calculations are estimates. Dosages vary widely based on clinical condition, hydration, breed, and organ function. <strong className="font-bold underline">NEVER administer any medication or NSAID without explicit instructions from a licensed veterinarian.</strong>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border-card/30 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <i className="fa-solid fa-pills text-base"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">Equine Drug Dosage Estimator</h3>
            <p className="text-xs text-text-muted">Emergency veterinary reference lookup</p>
          </div>
        </div>

        <button
          onClick={() => {
            const currentW = parseFloat(weight);
            if (!isNaN(currentW)) {
              if (isMetric) {
                setWeight((currentW * 2.20462).toFixed(0));
              } else {
                setWeight((currentW / 2.20462).toFixed(0));
              }
            }
            setIsMetric(!isMetric);
          }}
          className="text-xs font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-full"
          id="dosage-unit-btn"
        >
          {isMetric ? 'Switch to lbs' : 'Switch to kg'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Horse's Body Weight
            </label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={isMetric ? '450' : '1000'}
                className="w-full text-base font-semibold pr-12"
                id="dosage-input-weight"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-text-muted font-mono uppercase">
                {isMetric ? 'kg' : 'lbs'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Select Medication
            </label>
            <select
              value={selectedDrugIndex}
              onChange={(e) => setSelectedDrugIndex(parseInt(e.target.value))}
              className="w-full text-sm font-semibold"
              id="dosage-input-drug"
            >
              {MEDICATIONS.map((med, idx) => (
                <option key={idx} value={idx}>
                  {med.name}
                </option>
              ))}
            </select>
          </div>

          {selectedDrug && (
            <div className="bg-bg p-3.5 border border-border-card/40 rounded-xl text-xs space-y-1">
              <p className="font-bold text-text-main">🔬 Primary Indication:</p>
              <p className="text-text-muted">{selectedDrug.indication}</p>
              <p className="font-bold text-text-main mt-1.5">🩺 Standard Reference Rate:</p>
              <p className="text-text-muted">{selectedDrug.standardDoseRate}</p>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="bg-bg rounded-xl border border-border-card/40 p-5 flex flex-col justify-center min-h-[220px]">
          {result !== null ? (
            <div className="space-y-4 animate-fade-in text-center">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-100/50 px-2.5 py-1 rounded-full inline-block">
                Calculated Reference Range
              </p>

              <div>
                <p className="text-xl md:text-2xl font-extrabold text-primary" id="dosage-result-amt">
                  {result.dose}
                </p>
                <p className="text-xs text-text-muted mt-1 font-semibold">{result.form}</p>
              </div>

              <div className="bg-white border border-red-200 rounded-xl p-3 text-left text-[11px] text-red-700 font-medium" id="dosage-result-warning">
                {result.warning}
              </div>

              <div className="text-[10px] text-text-muted italic flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-circle-check text-green-600 text-[10px]"></i>
                Dose is safety-filtered for a {weight} {isMetric ? 'kg' : 'lbs'} horse.
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center font-medium">Please enter a valid body weight to view emergency dosage calculations.</p>
          )}
        </div>
      </div>
    </div>
  );
}
