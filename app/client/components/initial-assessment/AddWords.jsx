import { useState, useEffect } from 'react';
import AssessForm from './AssessForm';
import AssessSuccess from './AssessSuccess';
import {
  createVocab,
  getRecommendation,
  saveRecommendedWords,
} from '../../services/vocabLogsService';
import { getInitialAssessment } from '../../services/wordBankService';

const AddWords = ({ child }) => {
  const [words, setWords] = useState([]);
  const [spokenWords, setSpokenWords] = useState([]);
  const [isAssessed, setIsAssessed] = useState(false);
  const [initWords, setInitWords] = useState([]);

  useEffect(() => {
    // Fetch wordBank data when the component mounts
    getInitialAssessment().then((data) => {
      setInitWords(data);
      console.log('InitialAssessment words', data);
    });
  }, []);

  const handleWordsSubmit = async (values) => {
    const spokenWords = values.words.map((wordId) => {
      const matchingWord = initWords.find((word) => word.id === wordId);
      if (matchingWord) {
        return {
          name: matchingWord.name,
          wordBankId: matchingWord.id,
          category: matchingWord.category,
        };
      }
      return null;
    });
    const dataToSend = {
      spokenWords,
      child,
    };
    const dataToDS = {
      spokenWords,
      child: {
        id: child.id,
        gender: child.gender,
        ageInMonths: child.ageInMonths,
      },
    };

    setWords({ ...words, spokenWords: dataToSend.spokenWords });

    try {
      // Create a new vocab log
      const vocabLog = await createVocab(dataToSend);
      setIsAssessed(true);
      setSpokenWords(dataToSend.spokenWords);
      // get recommendations
      const recommendedWords = await getRecommendation(dataToDS);
      // setRecommendedWords(recommendedWords);
      // save recommended words
      await saveRecommendedWords(recommendedWords, vocabLog.id);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('Child is assessed?', isAssessed);
  }, []);

  return isAssessed ? (
    <AssessSuccess child={child} spokenWords={spokenWords} />
  ) : (
    <AssessForm
      child={child}
      onSubmit={handleWordsSubmit}
      initWords={initWords}
    />
  );
};

export default AddWords;
