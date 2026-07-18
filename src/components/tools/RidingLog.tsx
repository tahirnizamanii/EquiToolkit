import React, { useState, useEffect } from 'react';
import { RideEntry } from '../../types';

export default function RidingLog() {
  const [rides, setRides] = useState<RideEntry[]>([]);
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState<string>('45');
  const [discipline, setDiscipline] = useState<string>('Dressage');
  const [horseName, setHorseName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Loaded from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('equitoolkit_riding_logs');
    if (stored) {
      try {
        setRides(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse logs', err);
      }
    }
  }, []);

  const saveRides = (updatedRides: RideEntry[]) => {
    setRides(updatedRides);
    localStorage.setItem('equitoolkit_riding_logs', JSON.stringify(updatedRides));
  };

  const handleAddRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!horseName.trim()) return;

    const newRide: RideEntry = {
      id: Math.random().toString(36).substring(2, 9),
      date,
      duration: parseInt(duration) || 30,
      discipline,
      horseName: horseName.trim(),
      notes: notes.trim(),
    };

    const updated = [newRide, ...rides].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    saveRides(updated);

    // Reset some inputs
    setNotes('');
    setHorseName('');
  };

  const handleDeleteRide = (id: string) => {
    const updated = rides.filter((r) => r.id !== id);
    saveRides(updated);
  };

  // Stats calculation
  const totalHours = rides.reduce((acc, r) => acc + r.duration, 0) / 60;
  
  // Weekly hours
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  const weeklyHours = rides
    .filter((r) => new Date(r.date) >= oneWeekAgo)
    .reduce((acc, r) => acc + r.duration, 0) / 60;

  // Training streak (consecutive days logged)
  const getStreak = () => {
    if (rides.length === 0) return 0;
    const rawDates: string[] = rides.map((r) => r.date);
    const uniqueDates: string[] = rawDates
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const latestDateStr = uniqueDates[0];
    if (!latestDateStr) return 0;

    let currentExpected = new Date(latestDateStr);
    currentExpected.setHours(0, 0, 0, 0);

    // If the latest ride isn't today or yesterday, streak is broken
    const diffTime = Math.abs(today.getTime() - currentExpected.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) return 0;

    for (let i = 0; i < uniqueDates.length; i++) {
      const dateStr = uniqueDates[i];
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);

      if (i === 0) {
        streak = 1;
        continue;
      }

      const prevDateStr = uniqueDates[i - 1];
      const prevD = new Date(prevDateStr);
      prevD.setHours(0, 0, 0, 0);

      const dayDiff = Math.round((prevD.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (dayDiff === 1) {
        streak++;
      } else if (dayDiff > 1) {
        break; // streak ended
      }
    }
    return streak;
  };

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-5xl mx-auto" id="tool-riding-log">
      <div className="flex items-center space-x-3 border-b border-border-card/30 pb-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <i className="fa-solid fa-book-open text-lg"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">Equestrian Riding Log & Training Journal</h3>
          <p className="text-xs text-text-muted">Track your rides locally in your browser. All logs are entirely private.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-bg border border-border-card/40 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
            <i className="fa-solid fa-clock text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase">Total Logged Hours</p>
            <p className="text-lg font-extrabold text-primary" id="log-total-hours">{totalHours.toFixed(1)} hrs</p>
          </div>
        </div>

        <div className="bg-bg border border-border-card/40 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-accent">
            <i className="fa-solid fa-calendar-week text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase">Past 7 Days</p>
            <p className="text-lg font-extrabold text-text-main" id="log-weekly-hours">{weeklyHours.toFixed(1)} hrs</p>
          </div>
        </div>

        <div className="bg-bg border border-border-card/40 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
            <i className="fa-solid fa-fire text-orange-600 text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase">Training Streak</p>
            <p className="text-lg font-extrabold text-text-main" id="log-streak">{getStreak()} consecutive days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ride Addition Form */}
        <div className="lg:col-span-1 bg-bg border border-border-card/40 p-5 rounded-xl space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 border-b border-border-card/25 pb-2 mb-2">
            <i className="fa-solid fa-plus text-xs"></i>
            Add a Session
          </h4>

          <form onSubmit={handleAddRide} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Session Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm py-1.5 px-3"
                required
                id="log-input-date"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Horse Name</label>
              <input
                type="text"
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}
                placeholder="e.g. Bella"
                className="w-full text-sm py-1.5 px-3"
                required
                id="log-input-horse"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1">Duration (Min)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="45"
                  className="w-full text-sm py-1.5 px-3"
                  min="5"
                  required
                  id="log-input-duration"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted mb-1">Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full text-sm py-1.5 px-2"
                  id="log-input-discipline"
                >
                  <option value="Dressage">Dressage 🐴</option>
                  <option value="Jumping">Jumping 🏆</option>
                  <option value="Western">Western 🤠</option>
                  <option value="Trail Riding">Trail Riding 🌲</option>
                  <option value="Groundwork">Groundwork ⭕</option>
                  <option value="Lunging">Lunging 🐎</option>
                  <option value="Hacking">Hacking 🌾</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Training Notes / Milestones</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Worked on collection, lateral yields. Felt relaxed..."
                className="w-full text-sm py-1.5 px-3 h-20 resize-none"
                id="log-input-notes"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/95 text-white font-semibold py-2 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5 text-sm cursor-pointer"
              id="log-submit-btn"
            >
              <i className="fa-solid fa-trophy text-xs"></i>
              <span>Log Training Session</span>
            </button>
          </form>
        </div>

        {/* Display Logs Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-border-card/40 rounded-xl overflow-hidden shadow-inner">
            <div className="bg-primary/5 px-4 py-3 border-b border-border-card/40 flex justify-between items-center">
              <span className="text-xs font-bold text-primary tracking-wider uppercase">
                Activity Logs List
              </span>
              <span className="text-[10px] bg-white border border-border-card/30 px-2.5 py-0.5 rounded text-text-muted font-bold font-mono">
                {rides.length} Entries
              </span>
            </div>

            <div className="divide-y divide-border-card/25 max-h-[480px] overflow-y-auto" id="riding-log-list">
              {rides.length > 0 ? (
                rides.map((ride) => (
                  <div key={ride.id} className="p-4 hover:bg-bg/40 transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold bg-primary-light text-primary px-2 py-0.5 rounded-full font-mono">
                          {ride.date}
                        </span>
                        <span className="text-xs font-semibold text-text-main bg-gray-100 border px-2 py-0.5 rounded-full">
                          🏇 {ride.horseName}
                        </span>
                        <span className="text-xs font-semibold text-accent bg-accent-light px-2 py-0.5 rounded-full">
                          {ride.discipline}
                        </span>
                        <span className="text-xs text-text-muted font-bold font-mono">
                          ⏱️ {ride.duration} min
                        </span>
                      </div>
                      {ride.notes && (
                        <p className="text-xs text-text-muted italic leading-relaxed border-l-2 border-border-card/60 pl-2.5 mt-1">
                          "{ride.notes}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteRide(ride.id)}
                      className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer self-start"
                      title="Delete log"
                    >
                      <i className="fa-regular fa-trash-can text-xs"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-text-muted space-y-2">
                  <i className="fa-solid fa-book-open text-3xl text-border-card mx-auto"></i>
                  <p className="text-sm font-semibold">Your log book is currently empty.</p>
                  <p className="text-xs text-text-muted max-w-xs mx-auto">Add your first ride using the panel on the left. All logs are stored securely in your browser cache.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
