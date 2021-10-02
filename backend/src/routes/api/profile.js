const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

// @router /api/user/profile
// @desc Get authenticated user's profile
router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'You are not authenticated.' });
  }
  res.status(200).json(req.user);
});

// @router /api/user/profile
// @desc Update authenticated user's profile
router.post('/', async (req, res) => {
  // Get User's updated state
  const { updated } = req.body;
  if (req.user === undefined) {
    return res
      .status(404)
      .send('Authentication Failed! Please Log User In First.');
  }
  try {
    const { _id } = req.user;
    // Update with the given credentials

    // Save new password as crypted
    if (updated.password) {
      const password = updated.password;
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      updated.password = hash;
    }

    console.log(updated);
    // Find user by userid
    const user = await User.updateOne({ _id }, { ...updated });
    res.status(200).send('User Profile Updated Successfully');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.logout();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
