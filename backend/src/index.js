const express = require('express');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const { connectDB } = require('../config/db');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
app.use(
  cors({
    origin: 'https://18-auth-app-client.vercel.app',
    credentials: true,
  })
);
app.use(express.json());
// Connect into database
connectDB();
// Passport
app.use(express.static('public'));
require('../config/passport')(passport);

// Middleware settings

// CORS (Cross-Origin Resource Sharing)' headers to support Cross-site HTTP requests

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: 'sessions',
});

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      httpOnly: false,
      secure: true,
    },
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user/profile', require('./routes/api/profile'));
app.use('/auth/local', require('./routes/api/localAuth'));
app.use('/auth/google', require('./routes/api/googleAuth'));
app.use('/auth/github', require('./routes/api/githubAuth'));
app.use('/auth/twitter', require('./routes/api/twitterAuth'));

// Server settings
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
