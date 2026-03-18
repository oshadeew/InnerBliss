import { useAuth } from '../context/AuthContext';
import MoodTracker from '../components/MoodTracker';
import BreathingExercise from '../components/BreathingExercise';
import Affirmations from '../components/Affirmations';
import StorySection from '../components/StorySection';
import PulseMate from '../components/PulseMate';
import PrioritySorter from '../components/PrioritySorter';
import MusicPlayer from '../components/MusicPlayer';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-xl shadow-primary-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 🌸</h1>
            <p className="text-white/80 mt-1">How are you feeling today? Take a moment for yourself.</p>
          </div>
          <div className="hidden md:block text-6xl animate-float">🧘</div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Mood Tracker - Full width on mobile */}
        <div className="md:col-span-2 xl:col-span-2">
          <MoodTracker />
        </div>

        {/* Breathing Exercise */}
        <div>
          <BreathingExercise />
        </div>

        {/* Affirmations */}
        <div>
          <Affirmations />
        </div>

        {/* PulseMate */}
        <div>
          <PulseMate />
        </div>

        {/* Priority Sorter */}
        <div>
          <PrioritySorter />
        </div>

        {/* Story Section */}
        <div className="md:col-span-2">
          <StorySection />
        </div>

        {/* Music Player */}
        <div>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}
