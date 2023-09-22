import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/vocablogs';

// [x] Get all vocabs logs from backend
export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// [x] Create vocabulary for the given child (inital assessment)
export const createVocab = async (dataToSend) => {
  try {
    const response = await axios.post(baseUrl, {
      spokenWords: dataToSend.spokenWords,
      child: dataToSend.child.id,
    });

    console.log('createVocab response:', response);

    console.log('Sending data to server:', dataToSend);

    console.log('createVocab Response from server:', response);

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// eslint-disable-next-line
export default { getAll, createVocab };
