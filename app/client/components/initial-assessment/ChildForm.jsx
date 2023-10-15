import { StyleSheet, Text, View } from 'react-native';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NextFormButton } from '../layouts/Buttons';
import * as Yup from 'yup';
import { Heading } from '../layouts/typo';

const MyWebDatePicker = ({ field, form, ...rest }) => {
  const handleChange = (event) => {
    const newDate = new Date(event.target.value);
    form.setFieldValue(field.name, newDate);
  };

  return (
    <input
      type='date'
      value={field.value ? field.value.toISOString().split('T')[0] : ''}
      onChange={handleChange}
      {...rest}
    />
  );
};

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
    <View className='flex flex-col items-stretch justify-center w-7/12 mx-auto my-auto border border-white rounded-lg shadow-lg flex-nowrap bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 border-b border-slate-200'>
        <View className='flex px-10 pt-10 pb-5'>
          <Heading
            text={`Welcome ${authUser.firstName}`}
            style={{ fontSize: '1.875rem' }}
          />
          <Text className='flex w-full text-base font-bold text-primary-light'>
            Can you give us some information about your child?
          </Text>
        </View>
      </View>

      <View className='flex px-10 pt-4 pb-10'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form>
              <View className='flex'>
                <View className='flex-row items-center'>
                  <View className='flex-row items-center'>
                    <View className='relative mb-3 mr-6'>
                      <Text
                        htmlFor='firstName'
                        className='my-2 ml-3 font-bold text-primary-dark'
                      >
                        Firstname
                      </Text>
                      <Field
                        type='text'
                        id='firstName'
                        name='firstName'
                        style={styles.input}
                      />
                      <ErrorMessage name='firstName' component='div' />
                    </View>
                  </View>
                  <View className='flex-row items-center'>
                    <View className='relative mb-3'>
                      <Text
                        htmlFor='birthDate'
                        className='my-2 ml-3 font-bold text-primary-dark'
                      >
                        Date of birth
                      </Text>
                      <Field
                        type='date'
                        id='birthDate'
                        name='birthDate'
                        style={styles.input}
                        component={MyWebDatePicker}
                      />
                      <ErrorMessage name='birthDate' component='div' />
                    </View>
                  </View>
                </View>

                <View className='flex-row items-center'>
                  <View className='relative mb-3'>
                    <Text
                      className='my-2 ml-3 font-bold text-primary-dark'
                      htmlFor='gender'
                    >
                      Sex at birth
                    </Text>

                    <View className='flex flex-row '>
                      <View className='flex flex-row items-center pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm cursor-pointer backdrop-blur-sm border-slate-300'>
                        <Field
                          style={styles.radio}
                          type='radio'
                          name='gender'
                          value='M'
                        />
                        <Text className='ml-1 text-primary-dark'>Boy</Text>
                      </View>

                      <View className='flex flex-row items-center pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm cursor-pointer backdrop-blur-sm border-slate-300'>
                        <Field
                          style={styles.radio}
                          type='radio'
                          name='gender'
                          value='F'
                        />
                        <Text className='ml-1 text-primary-dark'>Girl</Text>
                      </View>
                      <View className='flex flex-row items-center py-3 pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm cursor-pointer backdrop-blur-sm border-slate-300'>
                        <Field
                          style={styles.radio}
                          type='radio'
                          name='gender'
                          value='RNS'
                        />
                        <Text className='ml-1 text-primary-dark'>
                          Rather not say
                        </Text>
                      </View>
                    </View>
                    <View id='genderError'>
                      <ErrorMessage name='gender' />
                    </View>
                  </View>
                </View>
              </View>

              <View className='flex flex-row justify-end'>
                <NextFormButton onPress={handleSubmit} />
              </View>
            </Form>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ChildForm;

const styles = StyleSheet.create({
  input: {
    display: 'block',
    borderRadius: '1.3rem',
    fontSize: '18px',
    lineHeight: '2rem',
    color: 'rgb(95 114 166)',
    backgroundColor: '#fff',
    // border: '1px solid #c5c9d0',
    border: '1px inset #e2e8f0',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    marginBottom: 10,

    focusVisible: {
      outline: '1px solid #c5c9d0',
    },
  },
  radio: {},
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
