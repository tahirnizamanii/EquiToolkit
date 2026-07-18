import React, { useState, useEffect } from 'react';

export default function MareGestationCalculator() {
  const [breedingDate, setBreedingDate] = useState<string>(() => {
    // Default to today
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  
  const [foalingDate, setFoalingDate] = useState<string>('');
  const [milestones, setMilestones] = useState<{ day: number; label: string; desc: string; dateStr: string }[]>([]);

  useEffect(() => {
    calculateGestation();
  }, [breedingDate]);

  const calculateGestation = () => {
    const breed = new Date(breedingDate);
    if (isNaN(breed.getTime())) return;

    // Standard mare gestation is roughly 340 days
    const due = new Date(breed);
    due.setDate(breed.getDate() + 340);
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    setFoalingDate(due.toLocaleDateString('en-US', options));

    // Calculate Milestones
    const list = [
      {
        day: 14,
        label: 'First Pregnancy Check',
        desc: 'Perform a transrectal ultrasound to confirm pregnancy and check for twins (which must be pinched/resolved early).'
      },
      {
        day: 30,
        label: 'Heartbeat Detection',
        desc: 'Perform secondary ultrasound to verify fetal viability, heartbeat, and single pregnancy status.'
      },
      {
        day: 45,
        label: 'End of Critical Embryonic Loss Phase',
        desc: 'The attachment is highly secure. Risk of early embryonic death drops significantly.'
      },
      {
        day: 150,
        label: 'Middle Gestation dietary adjustments',
        desc: 'Begin slowly increasing high-quality protein and trace mineral intake. Avoid fattening the mare excessively.'
      },
      {
        day: 300,
        label: 'EHV-1 Vaccination (Pneumabort-K)',
        desc: 'Crucial vaccine booster to prevent abortion from equine herpesvirus-1. Also boost tetanus, sleeping sickness, and West Nile.'
      },
      {
        day: 320,
        label: 'Set Up Foaling Stall / Monitor Udder',
        desc: 'Move mare to a large, clean, well-strawed foaling box. Watch for bag enlargement (waxing).'
      },
      {
        day: 340,
        label: 'Estimated Foaling Date (340 days)',
        desc: 'Expected delivery date. Normal gestation ranges widely from 320 to 365 days. Keep cameras on!'
      }
    ];

    const computedMilestones = list.map((m) => {
      const milestoneDate = new Date(breed);
      milestoneDate.setDate(breed.getDate() + m.day);
      return {
        ...m,
        dateStr: milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    });

    setMilestones(computedMilestones);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-mare-gestation">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-heart text-primary text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Mare Gestation & Due Date Estimator</h3>
          <p className="text-xs text-text-muted">Calculates critical developmental checkpoints based on a 340-day average</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Breeding Date Input */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-bg p-5 rounded-xl border border-border-card/40">
            <label className="block text-sm font-bold text-text-main mb-2">
              📅 Select Breeding Date
            </label>
            <input
              type="date"
              value={breedingDate}
              onChange={(e) => setBreedingDate(e.target.value)}
              className="w-full text-base font-semibold"
              id="gestation-breed-date"
            />
          </div>

          <div className="bg-primary/5 p-5 rounded-xl border border-primary/20 text-center space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Estimated Due Date
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-primary" id="gestation-due-date">
              {foalingDate || 'Calculating...'}
            </div>
            <p className="text-xs text-text-muted">
              Note: Healthy foals can arrive safely anytime between Day 320 and Day 360.
            </p>
          </div>
        </div>

        {/* Development Timeline */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
            <i className="fa-solid fa-map-pin text-primary text-xs"></i>
            Important Gestational Milestones
          </h4>

          <div className="relative border-l border-primary/20 ml-3.5 pl-5 space-y-5" id="gestation-timeline">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Dot */}
                <span className="absolute -left-[27px] top-1.5 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white border-2 border-primary z-10" />
                
                <div className="bg-white border border-border-card/40 rounded-xl p-3.5 shadow-sm hover:border-primary transition-colors">
                  <div className="flex flex-wrap justify-between items-center gap-1.5 mb-1">
                    <span className="text-xs font-bold text-primary">Day {m.day}</span>
                    <span className="text-xs font-semibold font-mono text-text-muted bg-bg px-2 py-0.5 rounded border border-border-card/30">
                      {m.dateStr}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-text-main mb-1">{m.label}</h5>
                  <p className="text-xs text-text-muted leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
