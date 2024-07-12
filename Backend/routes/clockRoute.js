const express = require('express');
const router = express.Router();
const Clocking = require('../models/clockIn');
const { checkAuthenticated } = require('../middleware/authMiddleware'); // Reuse checkAuthenticated middleware

// Daily staff clocking
router.post('/clock', checkAuthenticated, async (req, res) => {
  try {
    const clocking = new Clocking({
      userId: req.user._id,
      clockInTime: new Date(),
    });
    await clocking.save();
    res.status(201).json({ message: 'Clocked in' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
