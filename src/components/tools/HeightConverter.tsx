import React, { useState, useEffect } from 'react';

export default function HeightConverter() {
  const [handsStr, setHandsStr] = useState<string>('15.2');
  const [inchesStr, setInchesStr] = useState<string>('62');
  const [cmStr, setCmStr] = useState<string>('157.5');
  const [activeInput, setActiveInput] = useState<'hands' | 'inches' | 'cm'>('hands');

  // Convert hands (e.g., 15.2 hh) to total inches
  const handsToInches = (hh: number): number => {
    const wholeHands = Math.floor(hh);
    const fraction = hh - wholeHands;
    const inchesFraction = Math.round(fraction * 10); // e.g. 0.2 -> 2 inches
    return (wholeHands * 4) + inchesFraction;
  };

  // Convert total inches back to hands notation (e.g., 62 in -> 15.2 hh)
  const inchesToHands = (totalInches: number): string => {
    const hands = Math.floor(totalInches / 4);
    const inches = Math.round(totalInches % 4);
    return `${hands}.${inches}`;
  };

  useEffect(() => {
    if (activeInput === 'hands') {
      const hh = parseFloat(handsStr);
      if (isNaN(hh) || hh < 0) return;
      
      const inches = handsToInches(hh);
      const cm = inches * 2.54;
      
      setInchesStr(inches.toString());
      setCmStr(cm.toFixed(1));
    }
  }, [handsStr]);

  useEffect(() => {
    if (activeInput === 'inches') {
      const inches = parseFloat(inchesStr);
      if (isNaN(inches) || inches < 0) return;
      
      const hands = inchesToHands(inches);
      const cm = inches * 2.54;
      
      setHandsStr(hands);
      setCmStr(cm.toFixed(1));
    }
  }, [inchesStr]);

  useEffect(() => {
    if (activeInput === 'cm') {
      const cm = parseFloat(cmStr);
      if (isNaN(cm) || cm < 0) return;
      
      const inches = cm / 2.54;
      const hands = inchesToHands(inches);
      
      setHandsStr(hands);
      setInchesStr(inches.toFixed(1));
    }
  }, [cmStr]);

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto animate-fade-in" id="tool-height-converter">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-ruler text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Equine Height Converter</h3>
          <p className="text-xs text-text-muted">Supports traditional Hands (hh), inches, and metric centimeters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hands input */}
        <div className="space-y-2 bg-bg p-4 rounded-xl border border-border-card/40">
          <label className="block text-xs font-bold text-text-main uppercase tracking-wider">
            Hands (hh)
          </label>
          <div className="relative">
            <input
              type="text"
              value={handsStr}
              onChange={(e) => {
                setActiveInput('hands');
                setHandsStr(e.target.value);
              }}
              placeholder="e.g. 15.2"
              className="w-full text-xl font-bold pr-12"
              id="input-hh"
            />
            <span className="absolute right-3.5 top-3.5 text-xs text-text-muted font-mono uppercase">hh</span>
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            1 hand = 4 inches. The decimal portion represents individual inches (e.g. 15.2 hh is 15 hands, 2 inches). Valid decimals are .0, .1, .2, and .3.
          </p>
        </div>

        {/* Inches input */}
        <div className="space-y-2 bg-bg p-4 rounded-xl border border-border-card/40">
          <label className="block text-xs font-bold text-text-main uppercase tracking-wider">
            Total Inches
          </label>
          <div className="relative">
            <input
              type="number"
              value={inchesStr}
              onChange={(e) => {
                setActiveInput('inches');
                setInchesStr(e.target.value);
              }}
              placeholder="e.g. 62"
              className="w-full text-xl font-bold pr-12"
              id="input-inches"
            />
            <span className="absolute right-3.5 top-3.5 text-xs text-text-muted font-mono uppercase">in</span>
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Total height from the ground to the top of the withers measured directly in inches.
          </p>
        </div>

        {/* Centimeters input */}
        <div className="space-y-2 bg-bg p-4 rounded-xl border border-border-card/40">
          <label className="block text-xs font-bold text-text-main uppercase tracking-wider">
            Centimeters
          </label>
          <div className="relative">
            <input
              type="number"
              value={cmStr}
              onChange={(e) => {
                setActiveInput('cm');
                setCmStr(e.target.value);
              }}
              placeholder="e.g. 157.5"
              className="w-full text-xl font-bold pr-12"
              id="input-cm"
            />
            <span className="absolute right-3.5 top-3.5 text-xs text-text-muted font-mono uppercase">cm</span>
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Standard international metric height representation. Excellent for comparison across European breeds.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-primary-light/40 border border-primary/10 rounded-2xl p-6 text-center">
        <h4 className="font-serif font-bold text-text-main text-base mb-2">💡 Quick Conversion Guide</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-2 border rounded-lg bg-white/50">
            <span className="block font-bold text-primary">Pony Threshold</span>
            <span className="text-[10px] text-text-muted">Under 14.2 hh</span>
            <span className="block font-mono text-[10px] text-text-main mt-0.5">&lt; 58 inches / 147.3 cm</span>
          </div>
          <div className="p-2 border rounded-lg bg-white/50">
            <span className="block font-bold text-primary">Average Riding</span>
            <span className="text-[10px] text-text-muted">15.0 - 16.0 hh</span>
            <span className="block font-mono text-[10px] text-text-main mt-0.5">60 - 64 in / 152.4 - 162.6 cm</span>
          </div>
          <div className="p-2 border rounded-lg bg-white/50">
            <span className="block font-bold text-primary">Sport Warmblood</span>
            <span className="text-[10px] text-text-muted">16.1 - 17.1 hh</span>
            <span className="block font-mono text-[10px] text-text-main mt-0.5">65 - 69 in / 165.1 - 175.3 cm</span>
          </div>
          <div className="p-2 border rounded-lg bg-white/50">
            <span className="block font-bold text-primary">Draft Giant</span>
            <span className="text-[10px] text-text-muted">17.2 hh +</span>
            <span className="block font-mono text-[10px] text-text-main mt-0.5">70 in + / 177.8 cm +</span>
          </div>
        </div>
      </div>
    </div>
  );
}
