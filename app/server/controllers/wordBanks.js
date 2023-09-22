const wordBanksRouter = require('express').Router();
const Word = require('../models/wordBank');

//  [x] Get all wordBank words <-> getWordBankData in wordBankService.js
wordBanksRouter.get('/', async (req, res) => {
  const words = await Word.find({});
  res.json(words);
});

// [x] Get wordBank words filtered by is_initial_assessment = true <-> getInitialAssessment in wordBankService.js
wordBanksRouter.get('/initial_assessment', async (req, res) => {
  try {
    const words = await Word.find({ is_initial_assessment: true });
    res.json(words);
  } catch (error) {
    console.error('Error fetching initial assessment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
