const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');
module.exports = function (passport) {
  // Local
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const userObject = new User({
        email: username,
        provider: 'local',
        password,
      });
      try {
        const user = await User.findOne({ email: username });
        if (user) {
          return done(null, user);
        }
        await userObject.save();
        return done(null, userObject);
      } catch (error) {
        console.log(error);
      }
    })
  );

  // Google
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const userObject = new User({
          id: profile.id,
          name: profile.displayName,
          provider: 'google',
          profile_img: profile.photos[0].value,
        });
        try {
          const user = await User.findOne({ id: profile.id });
          if (user) {
            return done(null, user);
          }
          await userObject.save();
          return done(null, userObject);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
  // Github
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const userObject = new User({
          id: profile.id,
          name: profile.username,
          provider: 'github',
          profile_img: profile.photos[0].value,
        });
        try {
          const user = await User.findOne({ id: profile.id });
          if (user) {
            return done(null, user);
          }
          await userObject.save();
          return done(null, userObject);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  // Settings
  // Set Session
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  // Attach session profile to the req.user
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { lastLogin: moment().format('MM/DD/HH:mm') }
    ).select('-password');
    // Always get current last login
    user.lastLogin = moment().format('MM/DD/HH:mm');
    done(null, user);
  });
};
