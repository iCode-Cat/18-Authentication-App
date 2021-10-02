const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const bcrypt = require('bcryptjs');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');

module.exports = function (passport) {
  // Local
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (user) {
          const isPassMatched = await comparePassword({
            password,
            hash: user.password,
          });
          if (isPassMatched) return done(null, user);
        }
        done(null, false);
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
        callbackURL:
          'https://authentication-appp.herokuapp.com/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const userObject = new User({
          id: profile.id,
          name: profile.displayName,
          provider: profile.provider,
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
        callbackURL:
          'https://authentication-appp.herokuapp.com/auth/github/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const userObject = new User({
          id: profile.id,
          name: profile.username,
          provider: profile.provider,
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

  // Twitter
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL:
          'https://authentication-appp.herokuapp.com/auth/twitter/callback',
      },
      async (token, tokenSecret, profile, done) => {
        console.log(profile.id);
        const userObject = new User({
          id: profile.id,
          name: profile.displayName,
          provider: profile.provider,
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
    if (user) {
      user.lastLogin = moment().format('MM/DD/HH:mm');
    }
    done(null, user);
  });
};

const comparePassword = async ({ password, hash }) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
