const express = require('express');
const passport = require('passport');
const router = express.Router();
const redirect = process.env.redirect;
// @router /auth/twitter
// @desc Get users profile by twitter
router.get('/', passport.authenticate('twitter'));

// @router /auth/twitter/callback
// @desc Get Authenticate users by their twitter
router.get(
  '/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login',
    session: true,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(redirect);
    console.log(req.body);
  }
);

module.exports = router;
