import { useState, useEffect } from 'react';
import { logMood, getMoods } from '../api/axios';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const moods = [
  { key: 'very_pleasant', emoji: '🌸', color: 'bg-orange-400', label: 'Very Pleasant', ring: 'ring-orange-400' },
  { key: 'pleasant', emoji: '🌷', color: 'bg-pink-300', label: 'Pleasant', ring: 'ring-pink-300' },
  { key: 'neutral', emoji: '🌼', color: 'bg-yellow-300', label: 'Neutral', ring: 'ring-yellow-300' },
  { key: 'unpleasant', emoji: '🌺', color: 'bg-purple-300', label: 'Unpleasant', ring: 'ring-purple-300' },
  { key: 'very_unpleasant', emoji: '💜', color: 'bg-purple-600', label: 'Very Unpleasant', ring: 'ring-purple-600' },
];

const getMoodEmoji = (key) => moods.find(m => m.key === key)?.emoji || '';

export default function MoodTracker() {
  const [todayMood, setTodayMood] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [monthMoods, setMonthMoods] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const now = new Date();
    getMoods(now.getFullYear(), now.getMonth() + 1)
      .then(res => {
        setMonthMoods(res.data);
        const todayLog = res.data.find(m => m.date === today);
        if (todayLog) setTodayMood(todayLog.mood);
      })
      .catch(() => {});
  }, []);

  const handleMoodSelect = async (moodKey) => {
    try {
      await logMood({ mood: moodKey, date: today });
      setTodayMood(moodKey);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMonth = (year, month) => {
    getMoods(year, month).then(res => setMonthMoods(res.data)).catch(() => {});
  };

  const navigateMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
    loadMonth(newDate.getFullYear(), newDate.getMonth() + 1);
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const calendarDays = () => {
    const days = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= days; i++) arr.push(i);
    return arr;
  };

  const getMoodForDay = (day) => {
    if (!day) return null;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return monthMoods.find(m => m.date === dateStr);
  };

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title text-lg">🌸 Mood Tracker</h3>
        <button
          onClick={() => { setShowCalendar(!showCalendar); if (!showCalendar) loadMonth(currentDate.getFullYear(), currentDate.getMonth() + 1); }}
          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <FiCalendar className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">How are you feeling today?</p>

      <div className="flex items-center justify-between gap-2">
        {moods.map((mood) => (
          <button
            key={mood.key}
            onClick={() => handleMoodSelect(mood.key)}
            className={`mood-flower ${todayMood === mood.key ? `ring-4 ${mood.ring} scale-110 shadow-lg` : ''}`}
            title={mood.label}
          >
            <span className="text-2xl">{mood.emoji}</span>
          </button>
        ))}
      </div>

      {todayMood && (
        <p className="text-center text-sm text-primary-600 mt-3 font-medium animate-fade-in">
          {moods.find(m => m.key === todayMood)?.label} ✨
        </p>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCalendar(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg"><FiChevronLeft /></button>
              <h4 className="font-semibold text-gray-700">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h4>
              <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg"><FiChevronRight /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays().map((day, i) => {
                const moodLog = getMoodForDay(day);
                return (
                  <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-xs ${day ? 'hover:bg-gray-50' : ''}`}>
                    {day && (
                      <div className="flex flex-col items-center">
                        {moodLog ? (
                          <span className="text-lg" title={moods.find(m => m.key === moodLog.mood)?.label}>{getMoodEmoji(moodLog.mood)}</span>
                        ) : (
                          <span className="text-gray-400">{day}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {moods.map(m => (
                <div key={m.key} className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{m.emoji}</span> {m.label}
                </div>
              ))}
            </div>

            <button onClick={() => setShowCalendar(false)} className="mt-4 w-full btn-secondary text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
