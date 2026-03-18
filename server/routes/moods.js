import express from 'express';
import MoodLog from '../models/MoodLog.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Log mood for today (create or update)
router.post('/', auth, async (req, res) => {
  try {
    const { mood, date } = req.body;
    const moodLog = await MoodLog.findOneAndUpdate(
      { userId: req.userId, date },
      { mood },
      { upsert: true, new: true }
    );
    res.json(moodLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get moods for a month (query: year, month)
router.get('/', auth, async (req, res) => {
  try {
    const { year, month } = req.query;
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
    
    const moods = await MoodLog.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate },
    });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
