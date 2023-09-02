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

const passportSetup = require('./config/passport');
const googleLogin = require('./config/google');

const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const childrenRouter = require('./controllers/children');
const samplesRouter = require('./controllers/samples');

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

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
// app.use(googleLogin);
// app.get('/', (req, res) => {
//   res.send(
//     '<h1>Talk-a-Palooza</h1><h2> On a mission to boost children’s language acquisition &#128525; <p>Coming soon...</p></h2>'
//   );
// });

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/children', childrenRouter);
app.use('/api/samples', samplesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
