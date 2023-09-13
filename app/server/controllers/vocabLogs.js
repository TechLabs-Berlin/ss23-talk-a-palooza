const vocabLogsRouter = require('express').Router();
const VocabLog = require('../models/vocabLog');
const { validationResult } = require('express-validator');
const Child = require('../models/child');

// [To TEST]: Api endponts with REST. Also reduce to minimum needed API endpoints

vocabLogsRouter.get('/', async (req, res) => {
  const vocabLogs = await VocabLog.find({}).populate('child', {
    firstName: 1,
    birthDate: 1,
    gender: 1,
    ageInMonths: 1,
  });
  res.json(vocabLogs);
});

vocabLogsRouter.get('/:id', async (req, res) => {
  const vocabLog = await VocabLog.findById(req.params.id);
  if (vocabLog) {
    res.json(vocabLog);
  } else {
    res.status(404).end();
  }
});

// Create the initial assessment words results, and add vocabLogs to child
vocabLogsRouter.post('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { child, spokenWords } = req.body;
    console.log('from controller', req.body);

    // Create a new entry in the vocabLogs collection
    // Refer to models/vocabLog.js for the schema
    const vocabLog = new VocabLog({
      spokenWords,
      child,
    });

    await vocabLog.save();

    await Child.findOneAndUpdate(
      { _id: child },
      { $push: { vocabLogs: vocabLog } },
      { new: true }
    );
    console.log(vocabLog);

    res.json(vocabLog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// vocabLogsRouter.delete('/:id', async (req, res) => {
//   await vocabLog.findByIdAndRemove(req.params.id);
//   res.status(204).end();
// });

// vocabLogsRouter.put('/:id', async (req, res) => {
//   const body = req.body;

//   const vocabLog = {
//     content: body.content,
//     important: body.important,
//   };

//   const updatedVocabLog = await VocabLog.findByIdAndUpdate(
//     req.params.id,
//     vocabLog,
//     {
//       new: true,
//     }
//   );
//   res.json(updatedVocabLog);
// });

module.exports = vocabLogsRouter;
