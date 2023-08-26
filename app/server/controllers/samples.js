const samplesRouter = require('express').Router();
const Sample = require('../models/sample');

samplesRouter.get('/', (req, res) => {
	Sample.find({}).then((samples) => {
		res.json(samples);
	});
});

samplesRouter.get('/:id', (req, res, next) => {
	Sample.findById(req.params.id)
		.then((sample) => {
			if (sample) {
				res.json(sample);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

samplesRouter.post('/', (req, res, next) => {
	const body = req.body;

	const sample = new Sample({
		content: body.content,
		important: body.important || false,
	});

	sample
		.save()
		.then((savedSample) => {
			res.json(savedSample);
		})
		.catch((error) => next(error));
});

samplesRouter.delete('/:id', (req, res, next) => {
	sample
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

samplesRouter.put('/:id', (req, res, next) => {
	const body = req.body;

	const sample = {
		content: body.content,
		important: body.important,
	};

	Sample.findByIdAndUpdate(req.params.id, sample, { new: true })
		.then((updatedSample) => {
			res.json(updatedSample);
		})
		.catch((error) => next(error));
});

module.exports = samplesRouter;
