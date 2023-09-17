import axios from 'axios';

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
  } catch (error) {
    console.error('Error fetching or converting blob:', error);
    throw error;
  }
};
