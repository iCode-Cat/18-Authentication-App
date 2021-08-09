const express = require('express');
const passport = require('passport');
const router = express.Router();

// @router /auth/github
// @desc Get users profile by github
router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

// @router /auth/google/github
// @desc Get Authenticate users by their github
router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
