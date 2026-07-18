import React, { useState, useEffect } from 'react';
import { DEWORMING_SCHEDULES } from '../../data';

export default function DewormingSchedule() {
  const [ageGroup, setAgeGroup] = useState<'foal' | 'adult' | 'senior'>('adult');
  const [risk, setRisk] = useState<'low' | 'moderate' | 'high'>('low');
  const [fec, setFec] = useState<string>('none');
  const [schedule, setSchedule] = useState<{ month: string; chemical: string; target: string; notes: string }[]>([]);

  useEffect(() => {
    generatePlan();
  }, [ageGroup, risk, fec]);

  const generatePlan = () => {
    if (ageGroup === 'foal') {
      setSchedule(DEWORMING_SCHEDULES.foal);
    } else if (ageGroup === 'senior') {
      setSchedule(DEWORMING_SCHEDULES.senior);
    } else {
      // Adult schedules based on Risk Level and Fecal Egg Count results
      // If Fecal is high (>500), force high risk protocols
      if (fec === '>500' || risk === 'high') {
        setSchedule(DEWORMING_SCHEDULES.adult_high);
      } else if (fec === '200-500' || risk === 'moderate') {
        setSchedule(DEWORMING_SCHEDULES.adult_moderate);
      } else {
        setSchedule(DEWORMING_SCHEDULES.adult_low);
      }
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-4xl mx-auto" id="tool-deworming">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-calendar-days text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Strategic Deworming Calendar</h3>
          <p className="text-xs text-text-muted">AAEP-approved vet schedule targeting parasite resistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Form Controls */}
        <div className="md:col-span-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Age Classification
            </label>
            <select
              value={ageGroup}
              onChange={(e: any) => setAgeGroup(e.target.value)}
              className="w-full"
              id="deworm-age"
            >
              <option value="foal">Foal / Weanling (Under 1 year)</option>
              <option value="adult">Adult Horse (1 - 19 years)</option>
              <option value="senior">Senior Horse (20+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5 flex items-center gap-1">
              Shedder Risk Profile
              <span className="text-[10px] bg-primary-light text-primary px-1.5 py-0.5 rounded-full font-bold">INFO</span>
            </label>
            <select
              value={risk}
              disabled={ageGroup === 'foal'}
              onChange={(e: any) => setRisk(e.target.value)}
              className="w-full disabled:opacity-50"
              id="deworm-risk"
            >
              <option value="low">Low Risk (Dry lot, isolated, low stocking)</option>
              <option value="moderate">Moderate Risk (Shared pastures, normal turnout)</option>
              <option value="high">High Risk (High horse rotation, boarding stables)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Fecal Egg Count (EPG) Result
            </label>
            <select
              value={fec}
              disabled={ageGroup === 'foal'}
              onChange={(e) => setFec(e.target.value)}
              className="w-full disabled:opacity-50"
              id="deworm-fec"
            >
              <option value="none">No current test (Use risk level)</option>
              <option value="<200">Under 200 EPG (Low Shedder)</option>
              <option value="200-500">200 - 500 EPG (Moderate Shedder)</option>
              <option value=">500">Over 500 EPG (High Shedder)</option>
            </select>
          </div>

          <div className="bg-amber-50 text-amber-900 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-triangle-exclamation text-amber-700 text-sm"></i>
              Veterinary Statement
            </p>
            <p className="leading-relaxed">
              Dewormer resistance is a critical global issue. Routine "blanket deworming" every 60 days is no longer medically recommended. Perform fecal egg counts annually.
            </p>
          </div>
        </div>

        {/* Results Table */}
        <div className="md:col-span-2">
          <div className="bg-bg border border-border-card/40 rounded-xl overflow-hidden shadow-inner">
            <div className="bg-primary/5 px-4 py-3 border-b border-border-card/40 flex items-center justify-between">
              <span className="text-xs font-bold text-primary tracking-wider uppercase">
                Recommended Deworming Protocol
              </span>
              <span className="text-[10px] font-mono bg-primary text-white px-2 py-0.5 rounded-md font-bold uppercase">
                {ageGroup} Plan
              </span>
            </div>

            <div className="divide-y divide-border-card/30" id="deworming-schedule-list">
              {schedule.map((item, idx) => (
                <div key={idx} className="p-4 bg-white hover:bg-primary-light/10 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-primary">{item.month}</span>
                    <span className="text-xs font-semibold bg-gray-100 text-text-main px-2.5 py-0.5 rounded-full border border-border-card/40 font-mono">
                      {item.chemical}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-text-main mb-1.5 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                    Target: <span className="text-text-muted font-normal">{item.target}</span>
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed italic bg-bg/50 p-2 rounded border border-border-card/20">
                    💡 {item.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
