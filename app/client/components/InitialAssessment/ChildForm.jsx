import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChildForm = ({ onSubmit }) => {
  const initialValues = {
    firstname: '',
    birthdate: '',
    gender: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('Required'),
    birthdate: Yup.string().required('Required'),
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
          <label htmlFor='firstname'>First Name</label>
          <Field type='text' id='firstname' name='firstname' />
          <ErrorMessage name='firstname' component='div' />
        </div>

        <div>
          <label htmlFor='birthdate'>Birthdate</label>
          <Field type='text' id='birthdate' name='birthdate' />
          <ErrorMessage name='birthdate' component='div' />
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
