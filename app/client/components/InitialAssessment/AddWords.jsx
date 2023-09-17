import { useState } from 'react';
import AssessForm from './AssessForm';
import AssessSuccess from './AssessSuccess';
import { createVocab } from '../../services/vocabLogsService';

const AddWords = ({ child }) => {
  const [words, setWords] = useState([]);
  const [isAssessed, setIsAssessed] = useState(false);

  const handleWordsSubmit = (values) => {
    if (Array.isArray(values.words)) {
      // Format the spokenWords array correctly
      const formattedSpokenWords = values.words.map((word) => ({
        word: word,
      }));

      const dataToSend = {
        spokenWords: formattedSpokenWords,
        child: child.id,
      };

      setWords({ ...words, spokenWords: dataToSend.spokenWords });
      const result = createVocab(dataToSend);
      console.log('result', result);
      console.log('values:' + JSON.stringify(dataToSend));
      console.log('Words added:', dataToSend.spokenWords);
      setIsAssessed(true);
      console.log('is assessed?', isAssessed);
    } else {
      console.error('values.words is not an array:', values.words);
    }
  };

  return isAssessed ? (
    <AssessSuccess child={child} />
  ) : (
    <AssessForm child={child} onSubmit={handleWordsSubmit} />
  );
};

export default AddWords;
