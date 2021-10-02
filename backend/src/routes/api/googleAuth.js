const express = require('express');
const passport = require('passport');
const router = express.Router();
const redirect = process.env.redirect;
// @router /auth/google
// @desc Get users profile by gmail
router.get('/', passport.authenticate('google', { scope: ['profile'] }));

// @router /auth/google/callback
// @desc Get Authenticate users by their gmail
router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(redirect);
  }
);

module.exports = router;
