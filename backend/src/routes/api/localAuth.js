const express = require('express');
const passport = require('passport');
const router = express.Router();

// @router /auth/local
// @desc Authenticate users by their email and password
router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/',
  })
);

module.exports = router;
