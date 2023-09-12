import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
    child: child.id,
    spokenWords: [],
  };
  console.log(child);

  const validationSchema = Yup.object({
    spokenWords: Yup.array().min(1, 'Select at least one word'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { child, ...payload } = values;

      // Send a POST request to your Express backend to update vocabLogs
      await axios.post('/', payload);

      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>Your child is: {child.firstName}</div>
        {/* Map over wordBank list from MongoDB and create checkboxes */}
        {wordBank.map((spokenWord) => (
          <div key={spokenWord}>
            <label>
              <Field type='checkbox' name='spokenWords' value={spokenWord} />
              {spokenWord}
            </label>
          </div>
        ))}

        <button type='submit'>Next</button>
      </Form>
    </Formik>
  );
};

export default AssessForm;
