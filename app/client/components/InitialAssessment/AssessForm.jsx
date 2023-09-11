import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const AssessForm = ({ onSubmit }) => {
  const initialValues = {
    child: '',
    words: [],
  };

  const validationSchema = Yup.object({
    // words: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {/* Map over wordBank list from MongoDB and create checkboxes */}
        {wordBank.map((word) => (
          <div key={word}>
            <label>
              <Field type='checkbox' name={`words.${word}`} />
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
