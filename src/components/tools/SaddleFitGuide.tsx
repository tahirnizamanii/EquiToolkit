import React, { useState } from 'react';
import { SADDLE_FIT_QUESTIONS, diagnoseSaddleFit } from '../../data';

export default function SaddleFitGuide() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, val: string) => {
    const updatedAnswers = { ...answers, [questionId]: val };
    setAnswers(updatedAnswers);

    if (step < SADDLE_FIT_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Evaluate results
      const results = diagnoseSaddleFit(updatedAnswers);
      setDiagnoses(results);
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setDiagnoses([]);
    setIsCompleted(false);
  };

  const currentQuestion = SADDLE_FIT_QUESTIONS[step];

  return (
    <div className="bg-surface rounded-2xl border border-border-card/80 shadow-normal p-6 md:p-8 max-w-3xl mx-auto" id="tool-saddle-fit">
      <div className="flex items-center justify-between border-b border-border-card/30 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
            <i className="fa-solid fa-compass text-lg"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">Saddle Fit Diagnostics</h3>
            <p className="text-xs text-text-muted">Interactive troubleshooter for horse comfort and balance</p>
          </div>
        </div>

        {(isCompleted || step > 0) && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-xs font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-full"
            id="saddle-reset-btn"
          >
            <i className="fa-solid fa-rotate text-xs"></i>
            <span>Start Over</span>
          </button>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-text-muted">
              <span>Step {step + 1} of {SADDLE_FIT_QUESTIONS.length}</span>
              <span>{Math.round(((step + 1) / SADDLE_FIT_QUESTIONS.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((step + 1) / SADDLE_FIT_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question display */}
          {currentQuestion && (
            <div className="space-y-4 animate-fade-in" id="saddle-question-box">
              <h4 className="text-base font-bold text-text-main flex items-start gap-2.5">
                <i className="fa-solid fa-circle-question text-primary shrink-0 text-base mt-1"></i>
                <span>{currentQuestion.question}</span>
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                    className="w-full text-left p-4 rounded-xl border border-border-card/60 bg-white hover:bg-primary-light/40 hover:border-primary text-xs font-semibold text-text-main transition-all flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <i className="fa-solid fa-chevron-right text-text-muted group-hover:text-primary text-xs transition-colors"></i>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results / Diagnosis */
        <div className="space-y-5 animate-fade-in" id="saddle-results-box">
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-white border px-2.5 py-0.5 rounded-full inline-block">
              Troubleshooter Assessment
            </span>
            <p className="text-xs text-text-muted mt-2 max-w-md mx-auto leading-relaxed">
              Based on the sweat patterns, behaviors, and clearances reported, here are potential saddle tree or panel issues:
            </p>
          </div>

          <div className="space-y-3.5" id="saddle-diagnoses-list">
            {diagnoses.map((diag, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs leading-relaxed font-semibold ${
                  diag.startsWith('✅')
                    ? 'bg-green-50/50 border-green-200 text-green-950'
                    : 'bg-amber-50/60 border-amber-200 text-amber-950'
                }`}
              >
                {diag}
              </div>
            ))}
          </div>

          <div className="bg-bg border p-4 rounded-xl text-xs text-text-muted space-y-1.5 leading-relaxed">
            <p className="font-bold text-text-main">📌 Professional Recommendation:</p>
            <p>
              An ill-fitting saddle can cause chronic muscle atrophy, kissing spine symptoms, or permanent behavioral resistances. We strongly recommend having a certified SMS (Society of Master Saddlers) fitter check your saddle flocking and tree angles under rider weight.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
