import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/vocablogs';

// Get all vocabs logs from backend
export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Get all vocab logs for a given child
export const getChildWords = (child) => {
  const request = axios.get(`${baseUrl}/${child.id}`);
  return request.then((response) => response.data);
};

// Create vocabulary for the given child (inital assessment)
export const createVocab = async (values, child) => {
  try {
    const response = await axios.post(baseUrl, {
      vocabLogs: values.map((word) => ({ spokenWords: [{ word }] })),
      child: child.id,
    });

    console.log(response.data);

    // Assuming the response is an array of objects with 'id' and 'word' properties
    const vocabArray = response.data.map((item) => ({
      id: item.id,
      word: item.word,
    }));

    // Now vocabArray will contain an array of objects with words and their IDs
    console.log(vocabArray);

    console.log('Sending data to server:', { values, child });

    console.log('Response from server:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Update vocab Spoken Words for a given child
export const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
// eslint-disable-next-line
export default { getAll, createVocab, update };
