import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['motivation', 'calm', 'healing', 'gratitude', 'resilience'],
    required: true 
  },
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Story', storySchema);
