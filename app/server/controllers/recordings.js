const recordingsRouter = require('express').Router();
const Recording = require('../models/recording');
const { VocabLog, SpokenWords } = require('../models/vocabLog');

// Route to handle saving base64 recording data
recordingsRouter.post('/', async (req, res) => {
  try {
    const {
      binaryAudioData,
      wordBank,
      spokenWord,
      intelligibilityScore,
      is_recognized,
    } = req.body;

    const audioBuffer = Buffer.from(binaryAudioData, 'base64'); // Decode the base64 data to binary
    console.log('from controller', req.body);

    // Create a new recording document
    const recording = new Recording({
      binaryAudioData: audioBuffer,
      wordBank,
      spokenWord,
      intelligibilityScore,
      is_recognized,
      //TODO: misses reference to spokenWord
    });

    // Save the recording document
    await recording.save();

    // Find the spokenWord document by id and update it
    await VocabLog.findOneAndUpdate(
      { 'spokenWords.wordBank': wordBank },
      { $set: { 'spokenWords.$.recordings': recording } },
      //  { _id: VocabLog.spokenWord },
      // { $push: { recordings: recording } },
      { new: true }
    );

    //BUG POtential: Might need to change this too Update entry in the children collection.
    // await SpokenWords.findOneAndUpdate(
    //   { _id: spokenWords },
    //   { $push: { recording: recording } },
    //   { new: true }
    // );
    // console.log('controller', recording);

    // Send data to the external server using Axios
    // const SpeechAnalysisUrl = 'http://localhost:3001/api/recordingstodl';
    // try {
    //   const DLResponse = await axios.post(SpeechAnalysisUrl, {
    //     spokenWords,
    //     binaryAudioData,
    //   });
    //   console.log('Speech Analysis Server Response:', DLResponse.data);

    //   // If the Axios request is successful, you can proceed here with updating the recording document with the intelligibility score and isRecognized

    //   try {
    //     const response = await axios.get(SpeechAnalysisUrl, {
    //       is_recognized: DLResponse.data.is_recognized,
    //       intelligibilityScore: DLResponse.data.intelligibilityScore,
    //     });

    //     if (response.status === 200) {
    //       console.log('Additional data saved on the Node.js backend.');
    //     } else {
    //       console.error('Node.js backend returned an error:', response.status);
    //     }
    //   } catch (error) {
    //     console.error('Error sending processed recording to backend:', error);
    //     throw error;
    //   }

    //   // Save the updated Recording document
    //   await recording.save();
    // } catch (axiosError) {
    //   // Handle Axios-specific errors
    //   console.error('Axios Error:', axiosError.message);
    //   throw axiosError; // Re-throw the error to the outer catch block if needed
    // }

    return res.status(201).json({ message: 'Recording added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Route to save processed recording data from DL
// recordingsRouter.post('/recordingstodl', async (req, res) => {
//   try {
//     const { is_recognized, intelligibilityScore } = req.body;

//     // Find the recording document by vocabLog id and update it
//     const recording = await Recording.findOneAndUpdate(
//       { _id: recording },
//       { is_recognized, intelligibilityScore },
//       { new: true }
//     );

//     if (!recording) {
//       return res.status(404).json({ message: 'Recording not found' });
//     }

//     // Save the updated recording document
//     await recording.save();

//     return res.status(201).json({ message: 'Recording updated successfully' });
//   }
//     catch (error) {
//     console.error('Error saving DL data', error.message);
//     return res.status(500).send('Server Error');
//   }
// });

module.exports = recordingsRouter;
