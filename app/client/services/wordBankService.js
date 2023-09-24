import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/wordbank';

// [x] Get all wordBank words:
export const getWordBankData = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching word bank data:', error);
  }
};

// [x] Get wordBank words filtered by is_initial_assessment = true:
export const getInitialAssessment = async () => {
  try {
    const response = await axios.get(`${baseUrl}/initial_assessment`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching initial assessment data:', error);
  }
};
