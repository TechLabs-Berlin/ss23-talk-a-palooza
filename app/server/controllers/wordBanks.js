const wordBanksRouter = require('express').Router();
const Word = require('../models/wordBank');

wordBanksRouter.get('/', async (req, res) => {
  const words = await Word.find({});
  res.json(words);
});

wordBanksRouter.get('/:id', async (req, res) => {
  const word = await Word.findById(req.params.id);
  if (word) {
    res.json(word);
  } else {
    res.status(404).end();
  }
});

wordBanksRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const word = {
    name: body.name,
    category: body.category,
    is_audio: body.is_audio,
    wordLevel: body.wordLevel,
    image: body.image,
  };

  const updatedWord = await Word.findByIdAndUpdate(req.params.id, word, {
    new: true,
  });
  res.json(updatedWord);
});

module.exports = wordBanksRouter;
