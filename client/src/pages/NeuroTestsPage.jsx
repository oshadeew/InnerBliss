import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const disorders = [
  {
    id: 'depression',
    name: 'Depression',
    emoji: '🌧️',
    color: 'from-blue-400 to-blue-600',
    description: 'Depression is a common mental disorder characterized by persistent sadness, loss of interest in activities, and difficulty performing daily tasks.',
  },
  {
    id: 'anxiety',
    name: 'Anxiety',
    emoji: '😰',
    color: 'from-yellow-400 to-orange-500',
    description: 'Anxiety disorders involve excessive worry, fear, or apprehension that interferes with daily functioning and quality of life.',
  },
  {
    id: 'ptsd',
    name: 'PTSD',
    emoji: '⚡',
    color: 'from-red-400 to-red-600',
    description: 'Post-Traumatic Stress Disorder develops after experiencing or witnessing a terrifying event, causing flashbacks and severe anxiety.',
  },
  {
    id: 'bipolar',
    name: 'Bipolar Disorder',
    emoji: '🎭',
    color: 'from-purple-400 to-indigo-600',
    description: 'Bipolar disorder causes extreme mood swings including emotional highs (mania) and lows (depression), affecting energy and behavior.',
  },
  {
    id: 'ocd',
    name: 'OCD',
    emoji: '🔄',
    color: 'from-teal-400 to-cyan-600',
    description: 'Obsessive-Compulsive Disorder features unwanted repetitive thoughts (obsessions) and behaviors (compulsions) that feel impossible to stop.',
  },
  {
    id: 'borderline',
    name: 'Borderline Personality',
    emoji: '💫',
    color: 'from-pink-400 to-rose-600',
    description: 'BPD affects the way you think and feel about yourself and others, causing problems with self-image, emotional regulation, and relationships.',
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    emoji: '🌙',
    color: 'from-indigo-400 to-violet-600',
    description: 'Insomnia is a sleep disorder that makes it difficult to fall asleep, stay asleep, or causes early waking, affecting daily functioning.',
  },
];

export default function NeuroTestsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">🧠 Neuro Tests</h1>
        <p className="text-gray-500 mt-2">Take a self-assessment to better understand your mental health</p>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-sm text-amber-700">
          ⚠️ <strong>Disclaimer:</strong> These tests are for self-awareness purposes only and do not provide medical diagnosis. Please consult a healthcare professional for proper evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disorders.map((disorder) => (
          <div key={disorder.id} className="glass-card overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className={`h-2 bg-gradient-to-r ${disorder.color}`} />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{disorder.emoji}</span>
                <h3 className="text-lg font-bold text-gray-800">{disorder.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{disorder.description}</p>
              <Link
                to={`/neuro-tests/${disorder.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 group-hover:gap-3 transition-all"
              >
                Take Test <FiArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { disorders };
