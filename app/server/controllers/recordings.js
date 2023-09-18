const recordingsRouter = require('express').Router();
const { VocabLog, Recording } = require('../models/vocabLog');
// const { validationResult } = require('express-validator');
// const Child = require('../models/child');

// Route to handle saving base64 recording data
recordingsRouter.post(
  '/vocablogs/:id/spokenWords/:spokenWordsIndex/recordings',
  async (req, res) => {
    try {
      const { id, spokenWordsIndex } = req.params;
      const { binaryAudioData } = req.body;

      const audioBuffer = Buffer.from(binaryAudioData, 'base64'); // Decode the base64 data to binary
      console.log('from controller', req.body);

      // Manually set the subtype to "audio"
      binaryAudioData.subtype = 0x02; // 0x02 corresponds to subtype "audio" in MongoDB

      // Find the vocabLog document by ID
      const vocabLog = await VocabLog.findById(id);

      if (!vocabLog) {
        return res.status(404).json({ error: 'VocabLog not found' });
      }

      // Check if the spokenWords index is valid
      if (
        spokenWordsIndex < 0 ||
        spokenWordsIndex >= vocabLog.spokenWords.length
      ) {
        return res.status(400).json({ error: 'Invalid spokenWords index' });
      }

      // Create a new recording document
      const recording = new Recording({
        binaryAudioData,
      });

      // Push the new recording into the specified spokenWords element
      vocabLog.spokenWords[spokenWordsIndex].recordings.push(recording);

      // Save the updated vocabLog document
      await vocabLog.save();

      return res.status(201).json({ message: 'Recording added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = recordingsRouter;
