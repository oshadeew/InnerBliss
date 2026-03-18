import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveNeuroResult } from '../api/axios';
import { FiSave, FiSkipForward, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';

const getResultData = (percentage) => {
  if (percentage <= 35) {
    return {
      flower: '🌸',
      flowerColor: 'from-green-400 to-emerald-500',
      title: 'You are doing great!',
      message: 'Your mental health seems to be in a good place. Keep nurturing your well-being with positive habits and self-care.',
      quote: '"The greatest wealth is health." — Virgil',
      severity: 'low',
    };
  } else if (percentage <= 65) {
    return {
      flower: '🌼',
      flowerColor: 'from-yellow-400 to-amber-500',
      title: 'You are doing okay',
      message: 'You might be going through some challenges. Consider practicing mindfulness, talking to someone you trust, or trying our breathing exercises.',
      quote: '"It\'s okay to not be okay, as long as you don\'t give up." — Karen Salmansohn',
      severity: 'medium',
    };
  } else if (percentage <= 90) {
    return {
      flower: '🌺',
      flowerColor: 'from-orange-400 to-red-500',
      title: 'Take care of your feelings',
      message: 'Your responses suggest you may be struggling. Please consider reaching out to a mental health professional or trusted person in your life.',
      quote: '"You don\'t have to control your thoughts. You just have to stop letting them control you." — Dan Millman',
      severity: 'high',
    };
  } else {
    return {
      flower: '💜',
      flowerColor: 'from-red-500 to-red-700',
      title: 'Please consult a professional',
      message: 'Your responses indicate significant distress. We strongly recommend speaking with a healthcare professional as soon as possible. You are not alone.',
      quote: '"Asking for help is never a sign of weakness. It\'s one of the bravest things you can do." — Lily Collins',
      severity: 'critical',
    };
  }
};

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!state) {
    navigate('/neuro-tests');
    return null;
  }

  const { percentage, score, totalQuestions, disorder } = state;
  const result = getResultData(percentage);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveNeuroResult({ disorder, score, percentage, totalQuestions });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button onClick={() => navigate('/neuro-tests')} className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm mb-6">
        <FiArrowLeft /> Back to Tests
      </button>

      <div className="glass-card p-8 text-center">
        {/* Score Circle */}
        <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.flowerColor} flex items-center justify-center shadow-xl`}>
          <div className="text-center">
            <span className="text-4xl block">{result.flower}</span>
          </div>
        </div>

        {/* Percentage */}
        <div className="mb-4">
          <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">
            {percentage}%
          </span>
        </div>

        {/* Result */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.title}</h2>
        <p className="text-gray-500 mb-4 leading-relaxed">{result.message}</p>
        <p className="text-sm italic text-primary-600 mb-6">"{result.quote.replace(/"/g, '')}"</p>

        {/* Score details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl inline-block">
          <p className="text-sm text-gray-500">
            Score: <strong>{score}</strong> / {totalQuestions * 3} • Questions: {totalQuestions}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!saved ? (
            <>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center justify-center gap-2">
                <FiSave /> {saving ? 'Saving...' : 'Save Result'}
              </button>
              <button onClick={() => navigate('/neuro-tests')} className="btn-secondary flex items-center justify-center gap-2">
                <FiSkipForward /> Skip
              </button>
            </>
          ) : (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm animate-fade-in">
              ✅ Result saved successfully!
            </div>
          )}
        </div>

        {/* Consult Doctor */}
        {percentage > 90 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slide-up">
            <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
              <FiAlertTriangle className="w-5 h-5" />
              <strong>Immediate Support Recommended</strong>
            </div>
            <p className="text-sm text-red-500 mb-3">Your results suggest you should speak with a professional.</p>
            <button
              onClick={() => navigate('/doctors')}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
            >
              👨‍⚕️ Consult a Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
