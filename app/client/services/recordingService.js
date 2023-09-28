import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/recordings';
const DLUrl = 'http://localhost:8000/speech-analysis';

//[x] Convert the audio to base64:
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

    console.log('Audio converted to base64String');
    return base64String;
  } catch (error) {
    console.error('Error fetching or converting audio:', error);
    throw error;
  }
};

//[x] Send the audio to the DL python server use DLUrl
export const sendAudioToDL = async (dataToSend) => {
  try {
    const response = await axios.post(
      DLUrl,
      {
        binaryAudioData: dataToSend.base64Recording,
        name: dataToSend.name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Sending for analysis');

    //[x] get an answer back, with the fields is_recognized and intelligibilityScore
    if (response.status !== 201) {
      const { is_recognized, intelligibilityScore } = response.data;
      console.log('Speech analysis results:', response.data);
      if (is_recognized) {
        dataToSend.is_recognized = is_recognized;
        dataToSend.intelligibilityScore = intelligibilityScore;
        await saveRecording(dataToSend);
      } else {
        console.log('Recording was not recognized');
      }
    } else {
      throw new Error(`fastApi Server returned an error: ${response.status}`);
    }
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error sending recording to DL server:', error);
    throw error;
  }
};

//[x] Save to backend when is_recognized is true
export const saveRecording = async (dataToSend) => {
  try {
    const response = await axios.post(baseUrl, {
      binaryAudioData: dataToSend.base64Recording,
      wordBankId: dataToSend.wordBankId,
      name: dataToSend.name,
      is_recognized: dataToSend.is_recognized,
      intelligibilityScore: dataToSend.intelligibilityScore,
    });

    console.log(`Audio is recognized, saving in DB`);

    if (response.status !== 201) {
      throw new Error(`Failed to save recording. Status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};
