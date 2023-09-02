import axios from 'axios';
const baseUrl = '/api/login/success';

const loginSuccess = async (credentials) => {
  const response = await axios.get(baseUrl, credentials);
  return response.data;
};

export default loginSuccess;
