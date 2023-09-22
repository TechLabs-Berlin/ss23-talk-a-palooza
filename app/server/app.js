const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const app = express();

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const passportSetup = require('./passport/passport');
const googleLogin = require('./passport/google');

const authRouter = require('./routes/auth');
const usersRouter = require('./controllers/users');
const childrenRouter = require('./controllers/children');
const vocabLogsRouter = require('./controllers/vocabLogs');
const recordingsRouter = require('./controllers/recordings');
const wordBanksRouter = require('./controllers/wordBanks');

mongoose.set('debug', true);

config.NODE_ENV === 'development' && mongoose.set('debug', true);

// ********* Connect to MongoDB Atlas ****************
mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(
  cookieSession({
    name: 'cookieSession',
    keys: ['abracadabra'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  session({
    secret: 'secr3t',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:19006',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/children', childrenRouter);
app.use('/api/vocablogs', vocabLogsRouter);
app.use('/api/recordings', recordingsRouter);
app.use('/api/wordbank', wordBanksRouter);
app.use('/api/wordbank/initial_assessment', wordBanksRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
