import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { 
    type: String, 
    enum: ['very_pleasant', 'pleasant', 'neutral', 'unpleasant', 'very_unpleasant'],
    required: true 
  },
  date: { type: String, required: true }, // YYYY-MM-DD format
}, { timestamps: true });

moodLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('MoodLog', moodLogSchema);
