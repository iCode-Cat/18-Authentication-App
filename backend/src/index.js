const express = require('express');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const { connectDB } = require('../config/db');
const app = express();
app.use(express.json());
// Connect into database
connectDB();
// Passport
app.use(express.static('public'));
require('../config/passport')(passport);
// Routes

// Middleware settings
app.use(cors({ credentials: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user/profile', require('./routes/api/profile'));
app.use('/auth/local', require('./routes/api/localAuth'));
app.use('/auth/google', require('./routes/api/googleAuth'));
app.use('/auth/github', require('./routes/api/githubAuth'));

// Server settings
const PORT = process.env.PORT || 4000;
app.listen(3001, () => console.log(`Server started on ${PORT}`));