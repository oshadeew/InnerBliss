import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'Unknown' },
  url: { type: String, required: true },
  duration: { type: String, default: '' },
});

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  tracks: [trackSchema],
}, { timestamps: true });

export default mongoose.model('Playlist', playlistSchema);
