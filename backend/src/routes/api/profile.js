const express = require('express');
const router = express.Router();

// @router /api/user/profile
// @desc Get authenticated user's profile
router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'You are not authenticated.' });
  }
  res.status(200).json(req.user);
});

module.exports = router;
