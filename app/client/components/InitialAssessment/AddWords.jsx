import { useState, useEffect } from 'react';
import AssessForm from './AssessForm';
import AssessSuccess from './AssessSuccess';
import { createVocab } from '../../services/vocabLogsService';
import axios from 'axios';

const AddWords = ({ child }) => {
  const [words, setWords] = useState([]);
  const [spokenWords, setSpokenWords] = useState([]);
  const [isAssessed, setIsAssessed] = useState(false);
  const [wordBank, setWordBank] = useState([]);

  useEffect(() => {
    // Fetch the word bank data when the component mounts.
    //TODO: refactor as wordBankService + filter for is_initial_assessment = true
    async function fetchWordBank() {
      try {
        const response = await axios.get('http://localhost:3001/api/wordbank');
        setWordBank(response.data);
      } catch (error) {
        console.error('Error fetching word bank data:', error);
      }
    }
    fetchWordBank();
  }, []);

  const handleWordsSubmit = (values) => {
    if (Array.isArray(values.words)) {
      // Format the spokenWords array correctly
      const spokenWords = values.words.map((name) => ({
        name: name,
        wordBank: wordBank.id,
      }));

      const dataToSend = {
        spokenWords,
        child,
      };

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
    } else {
      console.error('not an array:', spokenWords);
    }
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
      wordBank={wordBank}
    />
  );
};

export default AddWords;
