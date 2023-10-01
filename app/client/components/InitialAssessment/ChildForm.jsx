import { StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.app}>
      <View className='container flex flex-col items-center justify-center py-12 mx-auto sm:py-24'>
        <Text
          className="text-primary-dark text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-black leading-7 md:leading-10 font-['Oleo Script']"
          style={styles.title}
        >
          Welcome, {authUser.firstName}
        </Text>
        <Text style={styles.subtitle}>
          Can you give us some information about your child?
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <View style={styles.flex}>
              <Text style={styles.text} htmlFor='firstName'>
                Firstname
              </Text>
              <Field type='text' id='firstName' name='firstName' />
              <ErrorMessage name='firstName' component='div' />
            </View>

            <View style={styles.flex}>
              <Text style={styles.text} htmlFor='birthDate'>
                Date of birth
              </Text>
              <Field type='text' id='birthDate' name='birthDate' />
              <ErrorMessage name='birthDate' component='div' />
            </View>

            <View style={styles.flex}>
              <Text style={styles.text} htmlFor='gender'>
                Sex at birth
              </Text>
              <View style={styles.flex}>
                <Text>
                  <Field type='radio' name='gender' value='M' />
                  <br /> Boy
                </Text>
                <Text>
                  <Field type='radio' name='gender' value='F' />
                  <br /> Girl
                </Text>
                <Text>
                  <Field type='radio' name='gender' value='RNS' />
                  <br /> Rather not say
                </Text>
              </View>
              <View id='genderError'>
                <ErrorMessage name='gender' />
              </View>
            </View>
            <View style={(styles.flex, styles.end)}>
              <button type='submit'> Next</button>
            </View>
          </Form>
        </Formik>
      </View>
    </View>
  );
};

export default ChildForm;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '1em',
    textAlign: 'center',
  },
  subtitle: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    width: '120px',
    marginRight: '1em',
  },
  link: {
    color: '#1977f2',
  },
  listitem: {
    marginVertical: '0.5rem',
  },
  pageLink: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
