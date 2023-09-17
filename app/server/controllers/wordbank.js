const wordBankRouter = require('express').Router();
const Word = require('../models/wordBank');

wordBankRouter.get('/', async (req, res) => {
  const words = await Word.find({});
  res.json(words);
});

wordBankRouter.get('/:id', async (req, res) => {
  const word = await Word.findById(req.params.id);
  if (word) {
    res.json(word);
  } else {
    res.status(404).end();
  }
});

wordBankRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const word = {
    name: body.name,
    category: body.category,
    exerciseType: body.exerciseType,
    wordLevel: body.wordLevel,
    image: body.image,
  };

  const updatedWord = await Word.findByIdAndUpdate(req.params.id, word, {
    new: true,
  });
  res.json(updatedWord);
});

module.exports = wordBankRouter;
