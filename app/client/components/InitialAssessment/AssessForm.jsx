import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createVocab } from '../../services/vocabLogsService';

const wordBank = [
  // Dummy until we have the right list of words
  'apple',
  'banana',
  'cat',
  'dog',
  'elephant',
  'fish',
  'grape',
  'hamburger',
  'iguana',
  'jacket',
];

const AssessForm = ({ child }) => {
  const [words, setWords] = useState({
    child: child.id,
    spokenWords: [],
  });

  const handleSubmit = (values) => {
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
    } else {
      // Handle the case where values.words is not an array
      console.error('values.words is not an array:', values.words);
    }
  };

  const validationSchema = Yup.object({
    // words: Yup.array().min(1, 'Select at least one word'),
  });

  return (
    <Formik
      initialValues={{ words: [] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>Your child is: {child.firstName}</div>
        {/* Map over wordBank list from MongoDB and create checkboxes */}
        {wordBank.map((word) => (
          <div key={word}>
            <label>
              <Field type='checkbox' name='words' value={word} />
              {word}
            </label>
          </div>
        ))}

        <button type='submit'>Next</button>
      </Form>
    </Formik>
  );
};

export default AssessForm;
