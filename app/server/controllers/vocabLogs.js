const vocabLogsRouter = require('express').Router();
const { VocabLog, SpokenWords } = require('../models/vocabLog');
const { validationResult } = require('express-validator');
const Child = require('../models/child');

// [x] GET ALL
vocabLogsRouter.get('/', async (req, res) => {
  const vocabLogs = await VocabLog.find({});
  res.json(vocabLogs);
});

// BUG: GET by Id
// vocabLogsRouter.get('/:id', async (req, res) => {
//   const vocabLog = await VocabLog.findById(req.params.id);
//   if (vocabLog) {
//     res.json(vocabLog);
//   } else {
//     res.status(404).end();
//   }
// });

// [x] 5 - POST by Child Id (Create the initial assessment words results, and add vocabLogs to child)
vocabLogsRouter.post('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { child, spokenWords } = req.body;
    console.log('from controller', req.body);

    // Create a new entry in the vocabLogs collection
    const vocabLog = new VocabLog({
      spokenWords,
      child,
    });

    console.log('vocabLog', vocabLog);
    await vocabLog.save();

    // Update entry in the children collection
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

// TODO: PUT by Child Id
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

// vocabLogsRouter.delete('/:id', async (req, res) => {
//   await vocabLog.findByIdAndRemove(req.params.id);
//   res.status(204).end();
// });

module.exports = vocabLogsRouter;
