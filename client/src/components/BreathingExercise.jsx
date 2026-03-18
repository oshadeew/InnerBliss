import { useState, useEffect, useRef } from 'react';

const phases = [
  { label: 'Inhale', duration: 4000, instruction: 'Breathe in slowly...', scale: 1.4 },
  { label: 'Hold', duration: 4000, instruction: 'Hold your breath...', scale: 1.4 },
  { label: 'Exhale', duration: 4000, instruction: 'Breathe out gently...', scale: 1 },
  { label: 'Rest', duration: 2000, instruction: 'Rest...', scale: 1 },
];

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  const startExercise = () => {
    setIsActive(true);
    setCycles(0);
    setPhaseIndex(0);
    runPhase(0, 0);
  };

  const stopExercise = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    clearTimeout(timerRef.current);
    setPhaseIndex(0);
    setProgress(0);
  };

  const runPhase = (pIdx, cycleCount) => {
    const phase = phases[pIdx];
    const startTime = Date.now();
    setPhaseIndex(pIdx);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed / phase.duration, 1));
    }, 30);

    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setProgress(0);
      const nextIdx = (pIdx + 1) % phases.length;
      const newCycles = nextIdx === 0 ? cycleCount + 1 : cycleCount;
      if (nextIdx === 0) setCycles(newCycles);
      runPhase(nextIdx, newCycles);
    }, phase.duration);
  };

  const currentPhase = phases[phaseIndex];

  return (
    <div className="widget-card text-center">
      <h3 className="section-title text-lg mb-4">🌬️ Breathing Exercise</h3>

      <div className="relative w-40 h-40 mx-auto mb-4">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="url(#breathGradient)" strokeWidth="4"
            strokeDasharray={`${progress * 289} 289`} strokeLinecap="round" />
          <defs>
            <linearGradient id="breathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b4fff" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        {/* Inner breathing circle */}
        <div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-200 to-pink-200 flex items-center justify-center transition-transform"
          style={{
            transform: isActive ? `scale(${1 + (currentPhase.scale - 1) * (phaseIndex < 2 ? progress : 1 - progress)})` : 'scale(1)',
            transitionDuration: '300ms',
          }}
        >
          <span className="text-3xl"> {isActive ? (phaseIndex === 0 ? '🌬️' : phaseIndex === 1 ? '✨' : phaseIndex === 2 ? '🍃' : '😌') : '🧘'}</span>
        </div>
      </div>

      {isActive ? (
        <>
          <p className="text-lg font-semibold text-primary-700">{currentPhase.label}</p>
          <p className="text-sm text-gray-500 mt-1">{currentPhase.instruction}</p>
          {cycles > 0 && <p className="text-xs text-gray-400 mt-2">Cycles completed: {cycles}</p>}
          <button onClick={stopExercise} className="btn-secondary text-sm mt-4">Stop</button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">4-4-4-2 breathing pattern</p>
          <button onClick={startExercise} className="btn-primary text-sm">Start Breathing</button>
        </>
      )}
    </div>
  );
}
