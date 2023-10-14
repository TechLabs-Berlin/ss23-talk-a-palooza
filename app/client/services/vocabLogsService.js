import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/vocablogs';
const DSUrl = 'http://localhost:8001/predict';

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

    const vocabLog = response.data;
    console.log('Child initial vocabulary:', vocabLog);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//[x] POST spoken words to VocabLog
export const updateVocab = async (dataToSend) => {
  try {
    const response = await axios.post(`${baseUrl}/updatespokenwords`, {
      dataToSend,
    });
    if (response.data) {
      const vocabLog = response.data;
      console.log('Child updated vocabulary:', vocabLog);
    } else {
      console.error('Failed to update child spokenWords');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// [x] Get Recommendation
export const getRecommendation = async (dataToDS) => {
  try {
    const response = await axios.post(
      DSUrl,
      {
        spokenWords: dataToDS.spokenWords,
        child: {
          id: dataToDS.child.id,
          gender: dataToDS.child.gender,
          ageInMonths: dataToDS.child.ageInMonths,
          wordLevel: dataToDS.child.wordLevel,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Sending spokenWords to recommender.py:', dataToDS);

    //[x] get the answer back
    if (response.status == 200) {
      const recommendedWords = response.data;
      console.log('Getting updated recommended words:', recommendedWords);
      return recommendedWords;
    } else {
      throw new Error(
        `Failed to get recommendation. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error('Error getting recommended words from DS server:', error);
    throw error;
  }
};
//[x] Save the recommended words to the given vocabLog
export const saveRecommendedWords = async (recommendedWords, id) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, {
      recommendedWords: recommendedWords,
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to save recommendedWord. Status: ${response.status}`
      );
    }
    console.log('Saving recommended words', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving recommendedWord:', error);
    throw error;
  }
};

// eslint-disable-next-line
export default {
  getAll,
  createVocab,
  getRecommendation,
  updateVocab,
  saveRecommendedWords,
};
