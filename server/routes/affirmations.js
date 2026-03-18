import express from 'express';
import Affirmation from '../models/Affirmation.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all affirmations for user
router.get('/', auth, async (req, res) => {
  try {
    const affirmations = await Affirmation.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(affirmations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create affirmation
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const affirmation = await Affirmation.create({ userId: req.userId, text });
    res.status(201).json(affirmation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update affirmation
router.put('/:id', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const affirmation = await Affirmation.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { text },
      { new: true }
    );
    if (!affirmation) return res.status(404).json({ message: 'Affirmation not found' });
    res.json(affirmation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete affirmation
router.delete('/:id', auth, async (req, res) => {
  try {
    const affirmation = await Affirmation.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!affirmation) return res.status(404).json({ message: 'Affirmation not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
