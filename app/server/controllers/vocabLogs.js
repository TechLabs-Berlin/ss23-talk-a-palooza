const vocabLogsRouter = require('express').Router();
const { VocabLog, SpokenWords } = require('../models/vocabLog');
const { validationResult } = require('express-validator');
const Child = require('../models/child');

// [x] GET ALL
vocabLogsRouter.get('/', async (req, res) => {
  const vocabLogs = await VocabLog.find({});
  res.json(vocabLogs);
});

//[x] GET by Id
vocabLogsRouter.get('/:id', async (req, res) => {
  const vocabLog = await VocabLog.findById(req.params.id);
  if (vocabLog) {
    res.json(vocabLog);
  } else {
    res.status(404).end();
  }
});

//[x] POST by Child Id (Create the initial assessment words results, add vocabLogs to child
vocabLogsRouter.post('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { child, spokenWords } = req.body;

    // Create a new entry in the vocabLogs collection
    const vocabLog = new VocabLog({
      spokenWords: spokenWords,
      child: child,
    });

    console.log('vocabLog created', vocabLog);
    await vocabLog.save();

    // Update entry in the children collection
    await Child.findOneAndUpdate(
      { _id: child },
      { $push: { vocabLogs: vocabLog } },
      { new: true }
    );

    res.status(201).json(vocabLog);
  } catch (error) {
    console.error('Error in storing vocab', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//[x] GET recommended words from FE
vocabLogsRouter.put('/:id', async (req, res) => {
  try {
    const { recommendedWords } = req.body;
    const { id } = req.params;

    const vocabLog = await VocabLog.findOneAndUpdate(
      { _id: id },
      { $set: { recommendedWords: recommendedWords } }
    );
    if (!vocabLog) {
      return res.status(404).json({ message: 'VocabLog not found' });
    }

    // Save the updated vocabLog
    await vocabLog.save();
    console.log('vocabLog updated', vocabLog);

    return res
      .status(200)
      .json({ message: 'Recommended words added to VocabLog' });
  } catch (error) {
    console.error('Error adding recommended words to VocabLog:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

//[x] POST spoken words to VocabLog
vocabLogsRouter.post('/updatespokenwords/', async (req, res) => {
  try {
    const { dataToSend, child } = req.body;

    console.log('dataToSend', dataToSend, child);
    // Find the VocabLog by Id
    const vocabLog = await VocabLog.findById(dataToSend.vocabLogId);

    if (!vocabLog) {
      return res.status(404).json({ message: 'VocabLog not found' });
    }

    // Check if a spokenWord with the same name already exists
    const existingSpokenWord = vocabLog.spokenWords.find(
      (word) => word.name === dataToSend.name
    );
    console.log('existingSpokenWord', existingSpokenWord);

    if (existingSpokenWord) {
      existingSpokenWord.wordBankId = dataToSend.wordBankId;
      existingSpokenWord.updatedAt = new Date();
      existingSpokenWord.recordings.push(dataToSend.recordingId); // Add recordings

      await vocabLog.save();
      console.log('vocabLog updated', vocabLog);
    } else {
      const newSpokenWord = {
        name: dataToSend.name,
        wordBankId: dataToSend.wordBankId,
        vocabLogId: dataToSend.vocabLogId,
        recordings: [dataToSend.recordingId], // Add recordings
      };
      vocabLog.spokenWords.push(newSpokenWord);
      await vocabLog.save();
      console.log('vocabLog updated', vocabLog);
    }
    return res.status(200).json({ message: 'Spoken words added to VocabLog' });
  } catch (error) {
    console.error('Error adding spoken words to VocabLog:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = vocabLogsRouter;
