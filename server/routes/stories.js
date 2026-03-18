import express from 'express';
import Story from '../models/Story.js';

const router = express.Router();

// Get all stories (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const stories = await Story.find(filter).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get categories list
router.get('/categories', async (req, res) => {
  res.json(['motivation', 'calm', 'healing', 'gratitude', 'resilience']);
});

// Get single story
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
