const recordingsRouter = require('express').Router();
const Recording = require('../models/recording');
const { VocabLog, SpokenWords } = require('../models/vocabLog');

//[x] Get all recordings
recordingsRouter.get('/', async (req, res) => {
  try {
    const recordings = await Recording.find({});
    res.json(recordings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//[ ] Receive results from fastAPI DL, with the fields is_recognized and intelligibilityScore and create a new recording if is_recognized is true
recordingsRouter.post('/speech-analysis', async (req, res) => {
  try {
    const {
      binaryAudioData,
      wordBankId,
      name,
      spokenWord,
      intelligibilityScore,
      is_recognized,
    } = req.body;

    // Decode the base64 data to binary
    //TODO: Confirm with Aljoscha if I get a base64 string back
    const audioBuffer = Buffer.from(binaryAudioData, 'base64'); //
    console.log('received data from fastAPI', req.body);

    // Check if is_recognized is true
    if (is_recognized === true) {
      // Create a new recording document
      try {
        const recording = new Recording({
          binaryAudioData: audioBuffer,
          wordBankId,
          name,
          spokenWord, //TODO: potential bug, check if misses reference to spokenWord?
          intelligibilityScore,
          is_recognized,
        });

        await recording.save();
        console.log(
          'new recording created with response from fastAPI',
          recording
        );

        // Find the spokenWord document by id and update it
        const updatedSpokenWord = await VocabLog.findOneAndUpdate(
          { 'spokenWords.wordBankId': wordBankId },
          { $set: { 'spokenWords.$.recordings': recording } },
          //  { _id: VocabLog.spokenWord },
          // { $push: { recordings: recording } },
          { new: true }
        );

        if (!updatedSpokenWord) {
          console.error('Failed to update spokenWord document');
          return res
            .status(500)
            .json({ message: 'Failed to update spokenWord' });
        }

        return res
          .status(201)
          .json({ message: 'Recording added successfully' });
      } catch (error) {
        console.error('Error creating a new recording:', error.message);
        res.status(500).send('Server Error');
      }
    } else {
      console.log('is_recognized is not true. No new recording created.');
      return res.status(200).json({ message: 'Recognition not successful' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//[ ] OR  Code if sending from frontend to backend
//TODO: Remove this once connection with fastAPI is established
recordingsRouter.post('/', async (req, res) => {
  try {
    const {
      // child: child,
      binaryAudioData,
      wordBankId,
      name,
      spokenWord,
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
      spokenWord,
      intelligibilityScore,
      is_recognized,
      //TODO: misses reference to spokenWord
    });

    // Save the recording document
    await recording.save();
    console.log('new recording created', recording);

    // Find the spokenWord document by id and update it
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
