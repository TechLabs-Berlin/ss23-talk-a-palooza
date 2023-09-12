import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/vocablogs';

// Get all vocabs logs from backend
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Create vocabulary for the given child (inital assessment)
const createVocab = async (values, child) => {
  try {
    const response = await axios.post(baseUrl, { ...values }, child);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to add vocab to child');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Update vocab Spoken Words for a given child
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
// eslint-disable-next-line
export default { getAll, createVocab, update };
