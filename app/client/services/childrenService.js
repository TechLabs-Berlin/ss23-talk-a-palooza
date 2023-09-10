import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/children';

// Get all children from backend
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Create a new child for the given user (Initial assessment)
const createChild = async (values, authUser) => {
  try {
    const response = await axios.post(baseUrl, {
      ...values,
      user: authUser.id,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to add child');
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
export default { getAll, createChild, update };
