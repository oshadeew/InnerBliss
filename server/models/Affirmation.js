import mongoose from 'mongoose';

const affirmationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model('Affirmation', affirmationSchema);
