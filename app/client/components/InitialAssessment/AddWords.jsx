import { useState } from 'react';
import AssessForm from './AssessForm';
import AssessSuccess from './AssessSuccess';
import { createVocab } from '../../services/vocabLogsService';
import wordBank from '../../db/wordBank';

const AddWords = ({ child }) => {
  const [words, setWords] = useState([]);
  const [spokenWords, setSpokenWords] = useState([]);
  const [isAssessed, setIsAssessed] = useState(false);

  const handleWordsSubmit = (values) => {
    if (Array.isArray(values.words)) {
      // Format the spokenWords array correctly
      const spokenWords = values.words.map((name) => ({
        name: wordBank.find((item) => item.name === name).name,
        id: wordBank.find((item) => item.name === name).id,
      }));

      const dataToSend = {
        spokenWords,
        child,
      };

      setWords({ ...words, spokenWords: dataToSend.spokenWords });
      const result = createVocab(dataToSend);
      console.log('result', result);
      console.log('values:' + JSON.stringify(dataToSend));
      console.log('Words added:', dataToSend.spokenWords);
      setIsAssessed(true);
      setSpokenWords(dataToSend.spokenWords);
      console.log('spokenWords', spokenWords);
      console.log('is assessed?', isAssessed);
    } else {
      console.error('not an array:', spokenWords);
    }
  };

  return isAssessed ? (
    <AssessSuccess child={child} spokenWords={spokenWords} />
  ) : (
    <AssessForm child={child} onSubmit={handleWordsSubmit} />
  );
};

export default AddWords;
