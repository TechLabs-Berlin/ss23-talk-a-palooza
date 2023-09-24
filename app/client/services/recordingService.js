import axios from 'axios';
//TODO (DLS-revert) const baseUrl = 'http://localhost:3001/api/recordings';
//TODO (DLS) setup fastApi URL
const DLUrl = 'http://localhost:8000/speech-analysis';

//[x] We convert the audio to base64:
//TODO (DLS) check with Aljoscha if URI is ok, then we do not need to convert to base64
export const uriToBase64 = async (uri) => {
  try {
    const response = await axios.get(uri, {
      responseType: 'arraybuffer',
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch audio. Status: ${response.status}`);
    }

    const arrayBuffer = response.data;
    const uint8Array = new Uint8Array(arrayBuffer);

    // Converting to base64 using btoa as expo-file-system is not supported in web. For mobile versions, use file-system.
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

    console.log('base64String', base64String);
    return base64String;
  } catch (error) {
    console.error('Error fetching or converting audio:', error);
    throw error;
  }
};

//[ ] Send the audio to the DL python server use DLUrl + adjust in RecordPlayAudio.js
export const sendAudioToDL = async (dataToSend) => {
  try {
    const response = await axios.post(
      DLUrl,
      {
        binaryAudioData: dataToSend.base64Recording,
        wordBankId: dataToSend.wordBankId, // not needed by DL
        name: dataToSend.name,
        spokenWord: dataToSend.spokenWord, // not needed by DL
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Posting to fastApi', dataToSend);

    //[ ] get an answer back, with the fields is_recognized and intelligibilityScore
    if (response.status !== 201) {
      const { is_recognized, intelligibilityScore } = response.data;
      console.log('response in FE from fastApi', response.data);
      //TODO: setup how to display the result in the app (confetti?)
    } else {
      throw new Error(`fastApi Server returned an error: ${response.status}`);
    }
    return { success: true };
  } catch (error) {
    console.log('Payload size:', base64Recording.length);
    console.error('Error sending recording to DL server:', error);
    throw error;
  }
};

//--------------------OR -----------------------------

//[ ] OR  Code if sending first to backend
//TODO: Remove this once connection with fastAPI is established
export const saveRecording = async (dataToSend, child) => {
  try {
    const response = await axios.post(baseUrl, {
      binaryAudioData: dataToSend.base64Recording,
      wordBankId: dataToSend.wordBankId,
      name: dataToSend.name,
      spokenWord: dataToSend.spokenWord,
    });

    console.log('Posting to Node: response from service', dataToSend);

    if (response.status !== 201) {
      throw new Error(`Failed to save recording. Status: ${response.status}`);
    }

    console.log('response from service', response.status);

    return { success: true };
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};
