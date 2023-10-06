import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NextButton } from '../navigation/Buttons';
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
      <View className='container flex flex-col items-center justify-center mt-20 mx-auto sm:py-24 w-7/12 shadow-lg px-5 py-10 rounded-lg border border-white bg-[#ffffffe6]'>
        <Text
          className="flex text-primary-dark text-3xl font-black mx-10  w-8/12 font-['Oleo Script']"
          style={styles.title}
        >
          Welcome {authUser.firstName}
        </Text>
        <Text className='flex text-xs font-normal text-primary-light sm:mt-4 lg:w-10/12 sm:text-base '>
          Can you give us some information about your child?
        </Text>
        <View className='flex w-8/12 '>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <View style={styles.flex}>
                {/* //TODO: Add inputs https://tailwind-elements.com/docs/standard/forms/inputs/ */}
                <Text style={styles.text} htmlFor='firstName'>
                  Firstname
                </Text>
                <ErrorMessage name='firstName' component='div' />
              </View>

              <View style={styles.flex}>
                {/* //TODO: Add date picker:
              https://tailwind-elements.com/docs/standard/forms/datepicker/ */}
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
                <NextButton
                  onPress={() => {
                    onSubmit();
                  }}
                />
                <button type='submit'> Next</button>
              </View>
            </Form>
          </Formik>
        </View>
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
