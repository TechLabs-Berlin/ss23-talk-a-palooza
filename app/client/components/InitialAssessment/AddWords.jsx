import { useState, useEffect } from 'react';
import AssessForm from './AssessForm';
import AssessSuccess from './AssessSuccess';
import { createVocab } from '../../services/vocabLogsService';
import { getInitialAssessment } from '../../services/wordBankService';

const AddWords = ({ child }) => {
  const [words, setWords] = useState([]);
  const [spokenWords, setSpokenWords] = useState([]);
  const [isAssessed, setIsAssessed] = useState(false);
  const [initWords, setInitWords] = useState([]);

  useEffect(() => {
    // Fetch the word bank data when the component mounts.
    //TODO: refactor as wordBankService + filter for is_initial_assessment = true
    // Fetch wordBank data when the component mounts
    getInitialAssessment().then((data) => {
      setInitWords(data);
      console.log('InitialAssessment words', data);
    });
  }, []);

  const handleWordsSubmit = (values) => {
    console.log('selected words:', values.words);
    // Map the IDs from values.words to the corresponding initWords data
    const spokenWords = values.words.map((wordId) => {
      const matchingWord = initWords.find((word) => word.id === wordId);
      if (matchingWord) {
        return {
          name: matchingWord.name,
          wordBankId: matchingWord.id,
          category: matchingWord.category,
        };
      }
      // Handle the case where no matching word is found
      return null;
    });

    const dataToSend = {
      spokenWords,
      child,
    };

    console.log('data to send:', dataToSend.spokenWords);

    setWords({ ...words, spokenWords: dataToSend.spokenWords });
    createVocab(dataToSend)
      .then((result) => {
        console.log('result', result);
        console.log('values:', JSON.stringify(dataToSend));
        console.log('Words added:', dataToSend.spokenWords);
        setIsAssessed(true);
        setSpokenWords(dataToSend.spokenWords);
        console.log('spokenWords', spokenWords);
      })
      .catch((error) => {
        console.error('Error creating vocab:', error);
      });
  };

  useEffect(() => {
    console.log('is assessed?', isAssessed);
  }, [isAssessed]);

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
