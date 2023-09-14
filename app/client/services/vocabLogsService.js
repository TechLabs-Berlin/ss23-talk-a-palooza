import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/vocablogs';

// (OK) Get all vocabs logs from backend
export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// (BUGS) Get all vocab logs for a given child
// export const getChildWords = async (child) => {
//   const request = await axios.get(`${baseUrl}/${child.id}`);
//   return request.then((response) => response.data);
// };

// (OK) Create vocabulary for the given child (inital assessment)
export const createVocab = async (dataToSend) => {
  try {
    const response = await axios.post(baseUrl, {
      spokenWords: dataToSend.spokenWords,
      child: dataToSend.child,
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

// (BUGS) Update vocab Spoken Words for a given child
// export const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };
// eslint-disable-next-line
export default { getAll, createVocab, update };
