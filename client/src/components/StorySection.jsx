import { useState, useEffect } from 'react';
import { getStories } from '../api/axios';
import { FiBookOpen, FiArrowLeft } from 'react-icons/fi';

const categoryMeta = {
  motivation: { emoji: '🔥', color: 'from-orange-400 to-red-400' },
  calm: { emoji: '🌊', color: 'from-blue-400 to-cyan-400' },
  healing: { emoji: '💚', color: 'from-green-400 to-emerald-400' },
  gratitude: { emoji: '🙏', color: 'from-yellow-400 to-amber-400' },
  resilience: { emoji: '💪', color: 'from-purple-400 to-indigo-400' },
};

export default function StorySection() {
  const [stories, setStories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      getStories(selectedCategory).then(res => setStories(res.data)).catch(() => {});
    }
  }, [selectedCategory]);

  if (selectedStory) {
    return (
      <div className="widget-card">
        <button onClick={() => setSelectedStory(null)} className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm mb-4">
          <FiArrowLeft /> Back to stories
        </button>
        {selectedStory.imageUrl && (
          <img src={selectedStory.imageUrl} alt={selectedStory.title} className="w-full h-48 object-cover rounded-xl mb-4" />
        )}
        <h4 className="text-xl font-bold text-gray-800 mb-3">{selectedStory.title}</h4>
        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{selectedStory.content}</div>
      </div>
    );
  }

  if (selectedCategory) {
    const meta = categoryMeta[selectedCategory];
    return (
      <div className="widget-card">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { setSelectedCategory(null); setStories([]); }} className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm">
            <FiArrowLeft /> Back
          </button>
          <span className="text-sm font-medium text-gray-500 capitalize">{meta.emoji} {selectedCategory}</span>
        </div>
        {stories.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No stories in this category yet.</p>
        ) : (
          <div className="space-y-3">
            {stories.map(story => (
              <div
                key={story._id}
                onClick={() => setSelectedStory(story)}
                className="flex gap-3 p-3 bg-gray-50 hover:bg-primary-50 rounded-xl cursor-pointer transition-colors group"
              >
                {story.imageUrl && (
                  <img src={story.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-700 group-hover:text-primary-700 text-sm">{story.title}</h5>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{story.content.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="widget-card">
      <h3 className="section-title text-lg mb-4">📖 Stories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(categoryMeta).map(([key, { emoji, color }]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`p-4 bg-gradient-to-br ${color} rounded-xl text-white text-center hover:scale-105 transition-transform shadow-lg`}
          >
            <span className="text-2xl block mb-1">{emoji}</span>
            <span className="text-xs font-semibold capitalize">{key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
