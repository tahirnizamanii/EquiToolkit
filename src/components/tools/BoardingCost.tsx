import React, { useState, useEffect } from 'react';

export default function BoardingCost() {
  const [boardType, setBoardType] = useState<'full' | 'partial' | 'pasture'>('full');
  const [baseBoardCost, setBaseBoardCost] = useState<string>('650');
  
  // Extra monthly costs
  const [supplements, setSupplements] = useState<string>('80');
  const [lessons, setLessons] = useState<string>('150');
  const [insurance, setInsurance] = useState<string>('0');
  const [miscMonthly, setMiscMonthly] = useState<string>('50');

  // Annual costs
  const [farrierAnnual, setFarrierAnnual] = useState<string>('720'); // e.g. 6-week shoeing/trim cycle
  const [vetAnnual, setVetAnnual] = useState<string>('400');
  const [dentalAnnual, setDentalAnnual] = useState<string>('200');
  const [dewormingAnnual, setDewormingAnnual] = useState<string>('60');

  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [annualTotal, setAnnualTotal] = useState<number>(0);

  useEffect(() => {
    // Preset base board defaults when switching types
    if (boardType === 'full') setBaseBoardCost('650');
    if (boardType === 'partial') setBaseBoardCost('350');
    if (boardType === 'pasture') setBaseBoardCost('250');
  }, [boardType]);

  useEffect(() => {
    calculateCosts();
  }, [boardType, baseBoardCost, supplements, lessons, insurance, miscMonthly, farrierAnnual, vetAnnual, dentalAnnual, dewormingAnnual]);

  const calculateCosts = () => {
    const baseBoard = parseFloat(baseBoardCost) || 0;
    const supp = parseFloat(supplements) || 0;
    const les = parseFloat(lessons) || 0;
    const ins = parseFloat(insurance) || 0;
    const misc = parseFloat(miscMonthly) || 0;

    const farrier = parseFloat(farrierAnnual) || 0;
    const vet = parseFloat(vetAnnual) || 0;
    const dental = parseFloat(dentalAnnual) || 0;
    const deworm = parseFloat(dewormingAnnual) || 0;

    const totalMonthlyExtras = supp + les + ins + misc;
    const totalMonthlyBoardAndExtras = baseBoard + totalMonthlyExtras;

    const totalAnnualRecurring = farrier + vet + dental + deworm;
    const grandAnnualCost = (totalMonthlyBoardAndExtras * 12) + totalAnnualRecurring;

    setMonthlyTotal(Math.round(grandAnnualCost / 12));
    setAnnualTotal(Math.round(grandAnnualCost));
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-4xl mx-auto animate-fade-in" id="tool-boarding-cost">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-house-chimney text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Horse Boarding Cost Estimator</h3>
          <p className="text-xs text-text-muted">Compare different boarding configurations and forecast overall ownership costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Input Parameters - Left Column 1 & 2 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Board Option Buttons */}
          <div>
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider mb-2">
              Select Boarding Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'full', label: 'Full Board', desc: 'All care provided' },
                { id: 'partial', label: 'Partial Board', desc: 'Stall only, self-feed' },
                { id: 'pasture', label: 'Pasture Board', desc: 'Outdoor paddock only' }
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBoardType(b.id as 'full' | 'partial' | 'pasture')}
                  className={`p-3 rounded-xl border text-left transition-colors flex flex-col justify-between cursor-pointer ${
                    boardType === b.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-border-card hover:bg-bg'
                  }`}
                >
                  <span className="font-bold text-sm block">{b.label}</span>
                  <span className={`text-[10px] block mt-1 ${boardType === b.id ? 'text-white/85' : 'text-text-muted'}`}>{b.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-bg p-5 rounded-2xl border border-border-card/30">
            {/* Monthly Inputs */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-text-main uppercase tracking-wider border-b pb-1">Monthly Expenses ($)</h4>
              <div>
                <label className="block text-xs text-text-muted mb-1">Base Board Price</label>
                <input
                  type="number"
                  value={baseBoardCost}
                  onChange={(e) => setBaseBoardCost(e.target.value)}
                  className="w-full text-sm py-1.5"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Grains & Supplements</label>
                <input
                  type="number"
                  value={supplements}
                  onChange={(e) => setSupplements(e.target.value)}
                  className="w-full text-sm py-1.5"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Lessons & Training</label>
                <input
                  type="number"
                  value={lessons}
                  onChange={(e) => setLessons(e.target.value)}
                  className="w-full text-sm py-1.5"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Insurance & Misc</label>
                <input
                  type="number"
                  value={miscMonthly}
                  onChange={(e) => setMiscMonthly(e.target.value)}
                  className="w-full text-sm py-1.5"
                />
              </div>
            </div>

            {/* Annual Inputs */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-text-main uppercase tracking-wider border-b pb-1">Annual Care Costs ($)</h4>
              <div>
                <label className="block text-xs text-text-muted mb-1">Farrier Services (Annual)</label>
                <input
                  type="number"
                  value={farrierAnnual}
                  onChange={(e) => setFarrierAnnual(e.target.value)}
                  className="w-full text-sm py-1.5"
                  placeholder="e.g. 720"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Veterinarian Fees (Annual)</label>
                <input
                  type="number"
                  value={vetAnnual}
                  onChange={(e) => setVetAnnual(e.target.value)}
                  className="w-full text-sm py-1.5"
                  placeholder="e.g. 400"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Equine Dentistry (Annual)</label>
                <input
                  type="number"
                  value={dentalAnnual}
                  onChange={(e) => setDentalAnnual(e.target.value)}
                  className="w-full text-sm py-1.5"
                  placeholder="e.g. 200"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Dewormers & Fecals (Annual)</label>
                <input
                  type="number"
                  value={dewormingAnnual}
                  onChange={(e) => setDewormingAnnual(e.target.value)}
                  className="w-full text-sm py-1.5"
                  placeholder="e.g. 60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Display - Right Column */}
        <div className="bg-primary-light/30 border border-primary/10 rounded-2xl p-6 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Budget Forecast</span>

          <div className="space-y-4 py-4">
            <div>
              <span className="block text-4xl font-extrabold text-primary font-mono">${monthlyTotal}</span>
              <span className="block text-[11px] font-bold text-text-muted uppercase">Average Monthly Cost</span>
            </div>

            <div className="border-t border-primary/10 pt-4">
              <span className="block text-3xl font-extrabold text-text-main font-mono">${annualTotal}</span>
              <span className="block text-[11px] font-bold text-text-muted uppercase">Grand Annual Cost</span>
            </div>
          </div>

          <div className="text-left space-y-3.5 text-xs text-text-muted border-t border-primary/10 pt-5">
            <h4 className="font-bold text-text-main text-center">💸 Budgeting Advice:</h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li><strong>Emergency Fund:</strong> Always set aside an extra $1,500–$2,000 for unexpected veterinary emergencies (e.g., colic clinic visits or laceration repairs).</li>
              <li><strong>Farrier cycle:</strong> Neglecting farrier cycles (average 6 weeks) causes tendon strains and increased long-term lameness vet costs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
