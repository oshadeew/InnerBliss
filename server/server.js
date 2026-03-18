import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import moodRoutes from './routes/moods.js';
import affirmationRoutes from './routes/affirmations.js';
import storyRoutes from './routes/stories.js';
import playlistRoutes from './routes/playlists.js';
import neuroResultRoutes from './routes/neuroResults.js';
import contactRoutes from './routes/contacts.js';
import doctorRoutes from './routes/doctors.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/affirmations', affirmationRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/neuro-results', neuroResultRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/doctors', doctorRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Inner Bliss API is running' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/innerbliss';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
