import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/recordings';
// const DLUrl = 'http://localhost:3001/api/recordingstodl';

//TODO: check with Aljoscha if URI is ok, then we do not need to convert to base64
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

    // NOTE: Converting to base64 using btoa as expo-file-system is not supported in web. For mobile versions, use file-system.
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

    console.log('base64String', base64String);
    return base64String;
  } catch (error) {
    console.error('Error fetching or converting audio:', error);
    throw error;
  }
};

// Code if sending to backend
export const saveRecording = async (dataToSend, child) => {
  try {
    const response = await axios.post(baseUrl, {
      binaryAudioData: dataToSend.base64Recording,
      wordBankId: dataToSend.wordBankId,
      name: dataToSend.name,
      spokenWord: dataToSend.spokenWord,
    });

    console.log('response from service', dataToSend);

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

// sending to DL server:
// export const sendAudioToDL = async (base64Recording) => {
//   try {
//     const response = await axios.post(
//       DLUrl,
//       {
//         binaryAudioData: base64Recording,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (response.status === 200) {
//       const { is_recognized, intelligibilityScore } = response.data;
//       // send these values to your Node.js backend
//       processedRecording(is_recognized, intelligibilityScore);
//     } else {
//       throw new Error(`Server returned an error: ${response.status}`);
//     }

//     return { success: true };
//   } catch (error) {
//     console.log('Payload size:', base64Recording.length);
//     console.error('Error sending recording to DL server:', error);
//     throw error;
//   }
// };

// Saving processed recording to DB
// export const processedRecording = async (
//   is_recognized,
//   intelligibilityScore
// ) => {
//   try {
//     const response = await axios.post(baseUrl, {
//       is_recognized,
//       intelligibilityScore,
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
// };
