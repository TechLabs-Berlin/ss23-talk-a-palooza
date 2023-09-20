const recordingsRouter = require('express').Router();
const Recording = require('../models/recording');
const { SpokenWords } = require('../models/vocabLog');

// Route to handle saving base64 recording data
recordingsRouter.post('/', async (req, res) => {
  try {
    const { spokenWords, binaryAudioData } = req.body;

    const audioBuffer = Buffer.from(binaryAudioData, 'base64'); // Decode the base64 data to binary
    console.log('from controller', req.body);

    // Create a new recording document
    const recording = new Recording({
      binaryAudioData: audioBuffer,
      spokenWords,
      // child,
    });

    // Save the recording document
    await recording.save();

    // Update entry in the children collection
    await SpokenWords.findOneAndUpdate(
      { _id: spokenWords },
      { $push: { recording: recording } },
      { new: true }
    );
    console.log('controller', recording);

    return res
      .status(201)
      .json({ message: 'Recording added successfully', recording });

    //TODO: UPDATE the Python server URL
    // // Send the recording data to the Speech Analysis server
    // const SpeechAnalysisUrl = 'http://python-server-url';
    // try {
    //   const DLResponse = await axios.post(SpeechAnalysisUrl, {
    //     recordingData: binaryAudioData,
    //   });

    //   console.log('Speech Analysis Server Response:', DLResponse.data);
    //  TOTEST Update the recording document with the intelligibility score and isRecognized
    //   recording.is_recognized = DLResponse.data.is_recognized;
    //   recording.intelligibilityScore = DLResponse.data.intelligibilityScore;

    //   // Save the updated Recording document
    // await recording.save();

    //   return res.status(201).json({
    //     message: 'Recording added successfully',
    //     recording,
    //   });
    // } catch (error) {
    //   console.error('Error', error);
    //   return res.status(500).json({
    //     error: 'Error sending recording to Speech Analysis server',
    //   });
    // }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = recordingsRouter;
