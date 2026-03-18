import { useState, useEffect, useRef } from 'react';
import { FiHeart, FiActivity } from 'react-icons/fi';

export default function PulseMate() {
  const [heartRate, setHeartRate] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [history, setHistory] = useState([]);
  const animRef = useRef(null);

  const simulateHeartRate = () => {
    setIsChecking(true);
    setHeartRate(null);
    
    // Simulate a 3-second "measurement"
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count < 10) {
        // Show fluctuating values during measurement
        setHeartRate(Math.floor(60 + Math.random() * 40));
      }
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      // Final "result" between 60-100 bpm (normal range)
      const finalRate = Math.floor(65 + Math.random() * 30);
      setHeartRate(finalRate);
      setIsChecking(false);
      setHistory(prev => [{ rate: finalRate, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
    }, 3000);
  };

  const getHeartRateStatus = (rate) => {
    if (rate < 60) return { text: 'Low', color: 'text-blue-500' };
    if (rate <= 100) return { text: 'Normal', color: 'text-green-500' };
    return { text: 'Elevated', color: 'text-orange-500' };
  };

  return (
    <div className="widget-card text-center">
      <h3 className="section-title text-lg mb-4">❤️ PulseMate</h3>

      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className={`w-full h-full rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center ${isChecking ? 'animate-heartbeat' : ''}`}>
          <div className="text-center">
            {heartRate ? (
              <>
                <span className="text-3xl font-bold text-red-500">{heartRate}</span>
                <span className="text-xs text-gray-500 block">BPM</span>
              </>
            ) : (
              <FiHeart className="w-10 h-10 text-red-400" />
            )}
          </div>
        </div>
        {isChecking && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-30" />
        )}
      </div>

      {heartRate && !isChecking && (
        <p className={`text-sm font-medium mb-3 animate-fade-in ${getHeartRateStatus(heartRate).color}`}>
          {getHeartRateStatus(heartRate).text} Heart Rate
        </p>
      )}

      <button
        onClick={simulateHeartRate}
        disabled={isChecking}
        className={`btn-primary text-sm ${isChecking ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isChecking ? 'Measuring...' : 'Check Pulse'}
      </button>

      {history.length > 0 && (
        <div className="mt-4 space-y-1">
          <p className="text-xs text-gray-400 font-medium">Recent Readings</p>
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between text-xs text-gray-500 px-2">
              <span>{h.time}</span>
              <span className="font-medium">{h.rate} BPM</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
