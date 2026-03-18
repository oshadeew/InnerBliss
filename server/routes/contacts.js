import express from 'express';
import EmergencyContact from '../models/EmergencyContact.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create contact
router.post('/', auth, async (req, res) => {
  try {
    const { name, phone, email, address, relationship } = req.body;
    const contact = await EmergencyContact.create({
      userId: req.userId, name, phone, email, address, relationship,
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact
router.put('/:id', auth, async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
