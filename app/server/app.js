const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const samplesRouter = require('./controllers/samples');

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

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (req, res) => {
	res.send(
		'<h1>Talk-a-Palooza</h1><h2> On a mission to boost children’s language acquisition &#128525; <p>Coming soon...</p></h2>'
	);
});

app.use('/api/samples', samplesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
