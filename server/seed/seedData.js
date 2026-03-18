import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from '../models/Story.js';

dotenv.config();

const stories = [
  // Motivation
  {
    title: 'The Mountain Climber',
    content: 'A young woman set out to climb the tallest mountain in her region. Everyone told her it was impossible, that she was too small, too inexperienced. But every morning she woke up and took one more step upward. She didn\'t focus on the summit — she focused on the next step.\n\nMonths later, she stood at the peak, looking down at the world below. The secret wasn\'t strength or talent. It was showing up, every single day, and refusing to quit. Your journey is the same — one step at a time.',
    category: 'motivation',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
  },
  {
    title: 'Seeds of Persistence',
    content: 'A farmer planted seeds in barren soil. His neighbors laughed. "Nothing grows there," they said. But the farmer watered the soil daily, pulled weeds, and waited patiently. For months, nothing happened.\n\nThen one morning, a tiny green sprout appeared. Then another. Within a year, his field was the most lush in the village. The soil wasn\'t barren — it just needed someone who believed in it enough to keep trying.',
    category: 'motivation',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
  },
  // Calm
  {
    title: 'The Still Lake',
    content: 'In a hidden valley, there was a lake so still that it perfectly reflected the sky above. Animals came to drink from its waters, and travelers would sit by its edge for hours, feeling their worries dissolve.\n\nThe lake\'s secret was simple: it didn\'t try to be anything other than what it was. It didn\'t rush, didn\'t force, didn\'t compete. It simply existed, peacefully, and in doing so became the most beautiful place in the valley.',
    category: 'calm',
    imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
  },
  {
    title: 'Breathing with the Ocean',
    content: 'An anxious child asked her grandmother how to stop worrying. The grandmother took her to the seashore. "Watch the waves," she said. "They come in and they go out. Your thoughts are the same — they come and they go."\n\nThe child sat and watched the waves, breathing with their rhythm. In and out, in and out. Slowly, her mind quieted, and she understood: she was not her thoughts. She was the ocean.',
    category: 'calm',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop',
  },
  // Healing
  {
    title: 'The Broken Bowl',
    content: 'In Japan, there is an art called Kintsugi — repairing broken pottery with gold. Instead of hiding the cracks, the gold makes them beautiful. The repaired bowl becomes more valuable than the original.\n\nYour scars, your struggles, your broken moments — they are not weaknesses. They are lines of gold running through your story, making you uniquely beautiful and infinitely stronger than before.',
    category: 'healing',
    imageUrl: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=300&fit=crop',
  },
  {
    title: 'After the Storm',
    content: 'A gardener\'s entire garden was destroyed by a terrible storm. She stood among the wreckage and wept. But the next morning, she noticed something — tiny mushrooms growing in the fallen logs, new sprouts emerging from the disrupted soil.\n\nThe storm hadn\'t just destroyed; it had also planted new seeds. Sometimes our worst moments break open spaces for growth we never imagined possible.',
    category: 'healing',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=300&fit=crop',
  },
  // Gratitude
  {
    title: 'The Gratitude Jar',
    content: 'A woman kept a jar on her kitchen counter. Every night, she wrote one thing she was grateful for on a small piece of paper and dropped it in. Some days it was big — a promotion, a kind word from a friend. Other days it was small — warm coffee, sunshine through the window.\n\nOn her darkest day, she emptied the jar and read every single note. Tears streamed down her face — not from sadness, but from realizing how full her life actually was.',
    category: 'gratitude',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    title: 'The Gift of Today',
    content: 'A wise teacher asked her students to list everything they had "lost" in the past year. The list was long and painful. Then she asked them to list everything they still had. The second list was even longer.\n\n"We spend so much time mourning what\'s gone," she said, "that we forget to celebrate what remains. Today itself is a gift — that\'s why we call it the present."',
    category: 'gratitude',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop',
  },
  // Resilience
  {
    title: 'The Bamboo\'s Lesson',
    content: 'The bamboo tree teaches a remarkable lesson. For the first four years after planting, you see almost nothing — just a tiny shoot. But underground, an enormous network of roots is spreading, building a foundation.\n\nIn the fifth year, the bamboo shoots up 80 feet in just six weeks. Your unseen growth matters. The time you spend healing, learning, and building your inner strength is never wasted.',
    category: 'resilience',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
  },
  {
    title: 'The Phoenix\'s Fire',
    content: 'Everyone knows the phoenix rises from ashes. But few talk about the burning. The fire is painful, consuming, and terrifying. The phoenix doesn\'t enjoy it — but it doesn\'t fight it either. It surrenders to the transformation.\n\nSome seasons of life are meant to burn away what no longer serves you. It hurts. But on the other side of that fire, you emerge more radiant than ever before.',
    category: 'resilience',
    imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/innerbliss');
    console.log('Connected to MongoDB');

    await Story.deleteMany({});
    await Story.insertMany(stories);
    console.log(`✅ Seeded ${stories.length} stories`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seed();
