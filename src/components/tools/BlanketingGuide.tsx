import React, { useState, useEffect } from 'react';

export default function BlanketingGuide() {
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [temp, setTemp] = useState<string>('32');
  const [wind, setWind] = useState<'none' | 'moderate' | 'strong'>('none');
  const [precip, setPrecip] = useState<'none' | 'light' | 'heavy'>('none');
  const [coat, setCoat] = useState<'unclipped' | 'clipped'>('unclipped');
  
  const [recommendation, setRecommendation] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    calculateBlanket();
  }, [temp, tempUnit, wind, precip, coat]);

  const calculateBlanket = () => {
    const rawTemp = parseFloat(temp);
    if (isNaN(rawTemp)) {
      setRecommendation('Invalid Temperature');
      setReason('Please enter a valid numeric temperature.');
      return;
    }

    // Convert to Fahrenheit for uniform evaluation logic
    let tempF = rawTemp;
    if (tempUnit === 'C') {
      tempF = (rawTemp * 9) / 5 + 32;
    }

    // Adjust temperature for weather modifiers to compute "Feels Like" temperature
    let feelsLike = tempF;
    if (wind === 'moderate') feelsLike -= 5;
    if (wind === 'strong') feelsLike -= 15;
    if (precip === 'light') feelsLike -= 5;
    if (precip === 'heavy') feelsLike -= 15;

    let rec = '';
    let explanation = '';

    if (coat === 'clipped') {
      // Clipped horse is much more sensitive to cold
      if (feelsLike >= 60) {
        rec = 'No Blanket Needed 🚫🧥';
        explanation = 'The weather is mild. A clipped horse is completely comfortable with no blanket at this range.';
      } else if (feelsLike >= 50) {
        rec = 'Light Sheet / Rain Sheet (No Fill) 🧥';
        explanation = 'Provide a light turnout sheet or windbreaker to protect against moderate chill or dampness without causing overheating.';
      } else if (feelsLike >= 40) {
        rec = 'Light to Medium Weight Blanket (100g - 150g fill) 🧥';
        explanation = 'A light-to-medium blanket is necessary. The clipped coat lacks natural loft to trap body heat below 50°F.';
      } else if (feelsLike >= 25) {
        rec = 'Heavy Weight Blanket (250g - 300g fill) ❄️🧥';
        explanation = 'A thick heavy weight blanket with neck cover options. Keep close tabs on chest and shoulder rub areas.';
      } else {
        rec = 'Heavy Weight Blanket + Under-Layer Sheet (400g+ total) 🥶🧥';
        explanation = 'Extremely cold. Layer a heavy stable sheet under a heavy turnout blanket. Check water buckets aren\'t frozen.';
      }
    } else {
      // Unclipped horse has a thick natural winter coat
      if (feelsLike >= 45) {
        rec = 'No Blanket Needed 🚫';
        explanation = 'An unclipped horse has natural hair loft that stands up to insulate them. Blanketing now can flatten the hair and actually make them colder or sweaty.';
      } else if (feelsLike >= 35) {
        if (precip !== 'none') {
          rec = 'Waterproof Rain Sheet (No Fill) 🌧️';
          explanation = 'The temperature is cold but manageable. However, rain/dampness flatlines the natural hair coat loft. A dry waterproof sheet is required.';
        } else {
          rec = 'No Blanket Needed 🚫';
          explanation = 'Clean, dry hair coat provides excellent natural protection down to freezing temperatures. Keep forage/hay available.';
        }
      } else if (feelsLike >= 20) {
        rec = 'Medium Weight Turnout (150g - 200g fill) 🧥';
        explanation = 'A medium weight blanket helps supplement their body heat, as dry temperatures drop below freezing and natural windbreaks might be limited.';
      } else {
        rec = 'Heavy Weight Turnout Blanket (300g fill) ❄️🧥';
        explanation = 'Severe winter chill. Their natural thermoregulation is reaching its threshold. A heavy turnout blanket ensures they don\'t shiver or lose weight.';
      }
    }

    setRecommendation(rec);
    setReason(explanation);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-blanketing-guide">
      <div className="flex items-center justify-between border-b border-border-card/30 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
            <i className="fa-solid fa-shield text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">Interactive Blanketing Chart</h3>
            <p className="text-xs text-text-muted">Smart rules adapted from equine shelter studies</p>
          </div>
        </div>
        <div className="flex bg-bg rounded-lg p-0.5 border border-border-card/40">
          <button
            onClick={() => setTempUnit('F')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${tempUnit === 'F' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-text-main'}`}
          >
            °F
          </button>
          <button
            onClick={() => setTempUnit('C')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${tempUnit === 'C' ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-text-main'}`}
          >
            °C
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-temperature-half text-primary text-sm w-4 text-center"></i>
              Current Temperature ({tempUnit === 'F' ? '°F' : '°C'})
            </label>
            <input
              type="number"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              placeholder={tempUnit === 'F' ? '32' : '0'}
              className="w-full text-base font-medium"
              id="blanket-temp"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-wind text-primary text-sm w-4 text-center"></i>
              Wind Conditions
            </label>
            <select
              value={wind}
              onChange={(e: any) => setWind(e.target.value)}
              className="w-full"
              id="blanket-wind"
            >
              <option value="none">Calm / Light Breeze</option>
              <option value="moderate">Moderate Wind (Gently shaking tree branches)</option>
              <option value="strong">Gale / Strong Wind (Gusts, cold drafts)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-cloud-showers-heavy text-primary text-sm w-4 text-center"></i>
              Precipitation
            </label>
            <select
              value={precip}
              onChange={(e: any) => setPrecip(e.target.value)}
              className="w-full"
              id="blanket-precip"
            >
              <option value="none">None / Dry</option>
              <option value="light">Drizzle / Light Rain or Snow</option>
              <option value="heavy">Heavy Rain / Sleet / Blizzard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-scissors text-primary text-sm w-4 text-center"></i>
              Coat Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCoat('unclipped')}
                className={`py-2 px-3 border rounded-xl text-sm font-semibold transition-all ${
                  coat === 'unclipped'
                    ? 'bg-primary-light border-primary text-primary shadow-sm'
                    : 'border-border-card/60 bg-white text-text-muted hover:border-text-muted'
                }`}
              >
                🌾 Unclipped (Natural)
              </button>
              <button
                type="button"
                onClick={() => setCoat('clipped')}
                className={`py-2 px-3 border rounded-xl text-sm font-semibold transition-all ${
                  coat === 'clipped'
                    ? 'bg-primary-light border-primary text-primary shadow-sm'
                    : 'border-border-card/60 bg-white text-text-muted hover:border-text-muted'
                }`}
              >
                ✂️ Clipped (Shaved)
              </button>
            </div>
          </div>
        </div>

        {/* Display Output */}
        <div className="bg-bg rounded-xl border border-border-card/40 p-5 flex flex-col justify-center text-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-accent bg-accent-light px-3 py-1 rounded-full uppercase tracking-wider">
              Recommendation
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-primary px-2" id="blanket-rec-text">
              {recommendation}
            </div>
            <p className="text-sm text-text-muted leading-relaxed px-4" id="blanket-rec-desc">
              {reason}
            </p>

            <div className="border-t border-border-card/25 pt-4 mt-2 text-left text-xs text-text-muted space-y-1.5 bg-white p-3.5 rounded-lg border">
              <p className="font-semibold text-text-main">💡 Pro tips:</p>
              <p>• If your horse is shivering, blanket immediately regardless of what charts say.</p>
              <p>• Place your hand under the blanket: if they feel clammy/wet from sweat, they are too hot. Reduce layers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
