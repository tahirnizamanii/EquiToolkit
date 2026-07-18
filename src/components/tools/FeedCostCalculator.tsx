import React, { useState, useEffect } from 'react';

export default function FeedCostCalculator() {
  const [hayBalePrice, setHayBalePrice] = useState<string>('12.00');
  const [hayBaleWeight, setHayBaleWeight] = useState<string>('50'); // lbs
  const [hayFedPerDay, setHayFedPerDay] = useState<string>('15'); // lbs
  
  const [grainBagPrice, setGrainBagPrice] = useState<string>('24.50');
  const [grainBagWeight, setGrainBagWeight] = useState<string>('50'); // lbs
  const [grainFedPerDay, setGrainFedPerDay] = useState<string>('4'); // lbs

  const [supplementMonthly, setSupplementMonthly] = useState<string>('35.00');

  const [dailyHay, setDailyHay] = useState<number>(0);
  const [dailyGrain, setDailyGrain] = useState<number>(0);
  const [dailySupp, setDailySupp] = useState<number>(0);

  const [totalDaily, setTotalDaily] = useState<number>(0);
  const [totalMonthly, setTotalMonthly] = useState<number>(0);
  const [totalYearly, setTotalYearly] = useState<number>(0);

  useEffect(() => {
    calculateCosts();
  }, [hayBalePrice, hayBaleWeight, hayFedPerDay, grainBagPrice, grainBagWeight, grainFedPerDay, supplementMonthly]);

  const calculateCosts = () => {
    const hayP = parseFloat(hayBalePrice) || 0;
    const hayW = parseFloat(hayBaleWeight) || 1; // prevent div 0
    const hayF = parseFloat(hayFedPerDay) || 0;

    const grainP = parseFloat(grainBagPrice) || 0;
    const grainW = parseFloat(grainBagWeight) || 1;
    const grainF = parseFloat(grainFedPerDay) || 0;

    const suppM = parseFloat(supplementMonthly) || 0;

    const hCost = (hayF / hayW) * hayP;
    const gCost = (grainF / grainW) * grainP;
    const sCost = suppM / 30.4;

    setDailyHay(hCost);
    setDailyGrain(gCost);
    setDailySupp(sCost);

    const dTotal = hCost + gCost + sCost;
    setTotalDaily(dTotal);
    setTotalMonthly(dTotal * 30.4);
    setTotalYearly(dTotal * 365);
  };

  const getPercent = (cost: number) => {
    if (totalDaily === 0) return 0;
    return Math.round((cost / totalDaily) * 100);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-4xl mx-auto" id="tool-feed-cost">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-dollar-sign text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Equine Feed & Hay Budget Planner</h3>
          <p className="text-xs text-text-muted">Calculates daily, monthly, and annual feed costs with budget share indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cost Inputs Form */}
        <div className="space-y-5">
          {/* Hay section */}
          <div className="bg-bg p-4 rounded-xl border border-border-card/40 space-y-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <span>🌾</span> Hay (Forage) Costs
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-text-muted mb-1">Price / Bale ($)</label>
                <input
                  type="number"
                  value={hayBalePrice}
                  onChange={(e) => setHayBalePrice(e.target.value)}
                  className="w-full text-sm py-1.5 px-2.5"
                  id="feed-hay-price"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-muted mb-1">Bale Wt (lbs)</label>
                <input
                  type="number"
                  value={hayBaleWeight}
                  onChange={(e) => setHayBaleWeight(e.target.value)}
                  className="w-full text-sm py-1.5 px-2.5"
                  id="feed-hay-weight"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-muted mb-1">Fed / Day (lbs)</label>
                <input
                  type="number"
                  value={hayFedPerDay}
                  onChange={(e) => setHayFedPerDay(e.target.value)}
                  className="w-full text-sm py-1.5 px-2.5"
                  id="feed-hay-daily"
                />
              </div>
            </div>
          </div>

          {/* Concentrate/Grain section */}
          <div className="bg-bg p-4 rounded-xl border border-border-card/40 space-y-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <span>🫘</span> Concentrate (Grain/Pellets)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-text-muted mb-1">Price / Bag ($)</label>
                <input
                  type="number"
                  value={grainBagPrice}
                  onChange={(e) => setGrainBagPrice(e.target.value)}
                  className="w-full text-sm py-1.5 px-2.5"
                  id="feed-grain-price"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-muted mb-1">Bag Wt (lbs)</label>
                <input
                  type="number"
                  value={grainBagWeight}
                  onChange={(e) => setGrainBagWeight(e.target.value)}
                  className="w-full text-sm py-1.5 px-2.5"
                  id="feed-grain-weight"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-muted mb-1">Fed / Day (lbs)</label>
                <input
                  type="number"
                  value={grainFedPerDay}
                  onChange={(e) => setGrainFedPerDay(e.target.value)}
                  className="w-full text-sm py-1.5 px-2.5"
                  id="feed-grain-daily"
                />
              </div>
            </div>
          </div>

          {/* Supplements section */}
          <div className="bg-bg p-4 rounded-xl border border-border-card/40 space-y-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <span>💊</span> Supplements & Additives
            </h4>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Total Monthly Supplements Cost ($)</label>
              <input
                type="number"
                value={supplementMonthly}
                onChange={(e) => setSupplementMonthly(e.target.value)}
                className="w-full text-sm py-1.5 px-2.5"
                id="feed-supp-price"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Cost Report */}
        <div className="space-y-6">
          <div className="bg-primary-light/50 border border-primary/20 rounded-2xl p-6 text-center space-y-5 shadow-sm">
            <span className="text-xs font-bold text-primary bg-white border border-primary/25 px-3 py-1 rounded-full uppercase tracking-wider">
              Expense Summary
            </span>

            <div className="grid grid-cols-3 gap-2 divide-x divide-primary/20">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-text-muted uppercase">Daily Cost</p>
                <p className="text-lg md:text-xl font-extrabold text-primary" id="cost-result-daily">${totalDaily.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-text-muted uppercase">Monthly Cost</p>
                <p className="text-lg md:text-xl font-extrabold text-primary" id="cost-result-monthly">${totalMonthly.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-text-muted uppercase">Annual Cost</p>
                <p className="text-lg md:text-xl font-extrabold text-primary animate-pulse" id="cost-result-yearly">${totalYearly.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Cost Allocation Proportions */}
          <div className="bg-bg border border-border-card/40 rounded-xl p-5 space-y-4">
            <h5 className="text-xs font-bold text-text-main uppercase tracking-widest flex items-center gap-1.5">
              <i className="fa-solid fa-chart-line text-primary text-xs"></i>
              Feed Share Allocations
            </h5>

            <div className="space-y-3" id="feed-cost-allocations">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-text-main">🌾 Hay (Forage)</span>
                  <span className="text-text-muted">${dailyHay.toFixed(2)}/day ({getPercent(dailyHay)}%)</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300" style={{ width: `${getPercent(dailyHay)}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-text-main">🫘 Grains (Concentrates)</span>
                  <span className="text-text-muted">${dailyGrain.toFixed(2)}/day ({getPercent(dailyGrain)}%)</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-accent h-full transition-all duration-300" style={{ width: `${getPercent(dailyGrain)}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-text-main">💊 Supplements</span>
                  <span className="text-text-muted">${dailySupp.toFixed(2)}/day ({getPercent(dailySupp)}%)</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-800 h-full transition-all duration-300" style={{ width: `${getPercent(dailySupp)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
