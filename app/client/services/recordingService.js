import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/save-recording';

export const uriToBase64 = async (uri) => {
  try {
    const response = await axios.get(uri, {
      responseType: 'arraybuffer',
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const arrayBuffer = response.data;
    const uint8Array = new Uint8Array(arrayBuffer);

    // NOTE: Converting to base64 using TextEncoder and btoa as expo-file-system is not supported in web. For mobile versions, use file-system.
    const textEncoder = new TextEncoder();
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

    return base64String;
    console.log('base64String', base64String);
  } catch (error) {
    console.error('Error fetching or converting blob:', error);
    throw error;
  }
};

export const saveRecording = async (base64Data, child, wordId, vocabLogId) => {
  try {
    const response = await axios.post('/', {
      base64Data: base64Data,
      child,
      wordId,
      vocabLogId,
    });
    console.log('from service', response);

    if (response.status !== 201) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};
