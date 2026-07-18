import React, { useState, useEffect } from 'react';
import { SHOW_CHECKLISTS } from '../../data';

export default function ShowChecklist() {
  const [discipline, setDiscipline] = useState<'Dressage' | 'Show Jumping' | 'Western Pleasure' | 'Trail'>('Dressage');
  const [days, setDays] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Reset checks on discipline/day shift
    setCheckedItems({});
  }, [discipline, days]);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const activeChecklist = SHOW_CHECKLISTS[discipline] || [];

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-4xl mx-auto" id="tool-show-checklist">
      <div className="flex items-center justify-between border-b border-border-card/30 pb-4 mb-6 no-print">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
            <i className="fa-solid fa-clipboard-list text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">Equine Competition Packing Checklist</h3>
            <p className="text-xs text-text-muted">Customized show checklist optimized for print formats</p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 text-xs font-bold text-white bg-primary hover:bg-primary/95 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
          id="checklist-print-btn"
        >
          <i className="fa-solid fa-print text-xs"></i>
          <span>Print Packing List</span>
        </button>
      </div>

      {/* Print Header ONLY */}
      <div className="hidden print-only text-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">🐴 EquiToolkit Competition Checklist</h2>
        <p className="text-xs text-gray-500">Customized for {discipline} Show · Duration: {days} {days === 1 ? 'Day' : 'Days'}</p>
        <p className="text-xs text-gray-400 mt-1">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 no-print">
        <div>
          <label className="block text-xs font-bold text-text-muted mb-1">Select Discipline</label>
          <select
            value={discipline}
            onChange={(e: any) => setDiscipline(e.target.value)}
            className="w-full text-sm font-semibold"
            id="checklist-discipline"
          >
            <option value="Dressage">Dressage English Show</option>
            <option value="Show Jumping">Show Jumping English Show</option>
            <option value="Western Pleasure">Western Pleasure Breed Show</option>
            <option value="Trail">Adventure Trail Riding / Endurance</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-muted mb-1">Show Duration (Days)</label>
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-full text-sm font-semibold"
            id="checklist-days"
          >
            <option value="1">1 Day (Local / Out and back)</option>
            <option value="2">2 Days (Overnight)</option>
            <option value="3">3 Days (Weekend stay)</option>
            <option value="5">5 Days (Full Championship)</option>
          </select>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="checklist-render-area">
        {activeChecklist.map((cat, idx) => (
          <div key={idx} className="bg-bg border border-border-card/40 rounded-xl p-4 md:p-5 print-card">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-border-card/25 pb-2 mb-3">
              {cat.category}
            </h4>

            <ul className="space-y-2.5">
              {cat.items.map((item, itemIdx) => {
                // Modify items based on multi-day multipliers if applicable
                let displayItem = item;
                if (days > 1) {
                  if (item.toLowerCase().includes('feed') || item.toLowerCase().includes('water') || item.toLowerCase().includes('hay') || item.toLowerCase().includes('breeches') || item.toLowerCase().includes('shirt') || item.toLowerCase().includes('saddle pad')) {
                    displayItem = `${item} (bring enough for ${days} days)`;
                  }
                }

                const isChecked = checkedItems[displayItem] || false;

                return (
                  <li
                    key={itemIdx}
                    onClick={() => toggleCheck(displayItem)}
                    className="flex items-start space-x-2.5 text-xs text-text-main cursor-pointer hover:opacity-85 select-none"
                  >
                    <span className="text-primary mt-0.5 shrink-0">
                      {isChecked ? (
                        <i className="fa-regular fa-square-check text-primary text-base"></i>
                      ) : (
                        <i className="fa-regular fa-square text-border-card text-base"></i>
                      )}
                    </span>
                    <span className={`${isChecked ? 'line-through text-text-muted opacity-60' : 'font-medium'}`}>
                      {displayItem}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-text-muted border-t border-border-card/25 pt-4 no-print">
        <p>💡 Tip: Packing lists are saved during your browser session. Tap <strong>Print Packing List</strong> above to convert to PDF or send to a local printer.</p>
      </div>
    </div>
  );
}
