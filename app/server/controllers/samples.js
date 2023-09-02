const samplesRouter = require('express').Router();
const Sample = require('../models/sample');
const Child = require('../models/child');

// [To TEST]: Api endponts with REST. Also reduce to minimum needed API endpoints

samplesRouter.get('/', async (req, res) => {
  const samples = await Sample.find({}).populate('child', {
    firstname: 1,
    birthdate: 1,
  });
  res.json(samples);
});

samplesRouter.get('/:id', async (req, res) => {
  const sample = await Sample.findById(req.params.id);
  if (sample) {
    res.json(sample);
  } else {
    res.status(404).end();
  }
});

samplesRouter.post('/', async (req, res) => {
  const body = req.body;

  const child = await Child.findById(body.childId);

  const sample = new Sample({
    content: body.content,
    important: body.important || false,
    child: child.id,
  });

  const savedSample = await sample.save();
  child.samples = child.samples.concat(savedSample._id);
  await child.save();

  res.json(savedSample);
  console.log(req.params, res.status);
});

samplesRouter.delete('/:id', async (req, res) => {
  await sample.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

samplesRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const sample = {
    content: body.content,
    important: body.important,
  };

  const updatedSample = await Sample.findByIdAndUpdate(req.params.id, sample, {
    new: true,
  });
  res.json(updatedSample);
});

module.exports = samplesRouter;
