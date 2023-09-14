import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChildForm = ({ authUser, onSubmit }) => {
  const initialValues = {
    firstName: '',
    birthDate: '',
    gender: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    birthDate: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor='firstName'>Firstname</label>
          <Field type='text' id='firstName' name='firstName' />
          <ErrorMessage name='firstName' component='div' />
        </div>

        <div>
          <label htmlFor='birthDate'>Birthdate</label>
          <Field type='text' id='birthDate' name='birthDate' />
          <ErrorMessage name='birthDate' component='div' />
        </div>

        <div>
          <label htmlFor='gender'>Gender</label>
          <Field type='text' id='gender' name='gender' />
          <ErrorMessage name='gender' component='div' />
        </div>

        <button type='submit'>Add Child</button>
      </Form>
    </Formik>
  );
};

export default ChildForm;
