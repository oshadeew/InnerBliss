import mongoose from 'mongoose';

const neuroTestResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  disorder: { 
    type: String, 
    enum: ['depression', 'anxiety', 'ptsd', 'bipolar', 'ocd', 'borderline', 'insomnia'],
    required: true 
  },
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('NeuroTestResult', neuroTestResultSchema);
