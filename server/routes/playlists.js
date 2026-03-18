import express from 'express';
import Playlist from '../models/Playlist.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all playlists for user
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, tracks } = req.body;
    const playlist = await Playlist.create({ userId: req.userId, name, tracks: tracks || [] });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update playlist (add/remove tracks, rename)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, tracks } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, tracks },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
