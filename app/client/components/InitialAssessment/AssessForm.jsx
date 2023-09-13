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

const AssessForm = ({ child, onSubmit }) => {
  const initialValues = {
    childId: child.id,
    words: [],
  };
  console.log('initialValues', initialValues);

  console.log('Fetching now from the child collection', child);

  const validationSchema = Yup.object({
    // words: Yup.array().min(1, 'Select at least one word'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
