const recordingsRouter = require('express').Router();
const Recording = require('../models/recording');
const { VocabLog } = require('../models/vocabLog');

//[x] GET all recordings
recordingsRouter.get('/', async (req, res) => {
  try {
    const recordings = await Recording.find({});
    res.json(recordings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//[x] GET processed recordings from frontendd
recordingsRouter.post('/', async (req, res) => {
  try {
    const {
      binaryAudioData,
      wordBankId,
      name,
      intelligibilityScore,
      is_recognized,
    } = req.body;

    const audioBuffer = Buffer.from(binaryAudioData, 'base64'); // Decode the base64 data to binary
    console.log('from controller', req.body);

    // Create a new recording document
    const recording = new Recording({
      binaryAudioData: audioBuffer,
      wordBankId,
      name,
      intelligibilityScore,
      is_recognized,
    });

    // Save the recording document
    await recording.save();
    console.log('new recording created', recording);

    // Find the spokenWord document by id and update it
    //BUG when new saved as null, when update, saved +null
    await VocabLog.findOneAndUpdate(
      { 'spokenWords.wordBankId': wordBankId },
      { $set: { 'spokenWords.$.recordings': recording } },
      //  { _id: VocabLog.spokenWord },
      // { $push: { recordings: recording } },
      { new: true }
    );

    return res.status(201).json({ message: 'Recording added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = recordingsRouter;
