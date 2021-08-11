const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../../models/User');

// @router /auth/local
// @desc Authenticate users by their email and password
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) return res.status(404).send('Invalid credentials');
    req.logIn(user, (err) => {
      if (err) throw err;
      res.send('Successfully Authenticated');
      console.log(req.user);
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const userObject = new User({
    email: username,
    provider: 'local',
    password,
  });

  try {
    const user = await User.findOne({ email: username });
    if (user) return res.status(400).send('This email already taken!');
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    userObject.password = hash;
    await userObject.save();
    res
      .status(200)
      .send('User successfully created, please login your account.');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
