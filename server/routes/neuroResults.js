import express from 'express';
import NeuroTestResult from '../models/NeuroTestResult.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Save test result
router.post('/', auth, async (req, res) => {
  try {
    const { disorder, score, percentage, totalQuestions } = req.body;
    const result = await NeuroTestResult.create({
      userId: req.userId,
      disorder,
      score,
      percentage,
      totalQuestions,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all results for user
router.get('/', auth, async (req, res) => {
  try {
    const results = await NeuroTestResult.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get results by disorder
router.get('/:disorder', auth, async (req, res) => {
  try {
    const results = await NeuroTestResult.find({
      userId: req.userId,
      disorder: req.params.disorder,
    }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
