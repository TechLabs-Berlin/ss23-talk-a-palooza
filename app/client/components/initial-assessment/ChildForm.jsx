import { StyleSheet, Text, View } from 'react-native';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NextFormButton } from '../layouts/Buttons';
import * as Yup from 'yup';

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
    <View className=' flex flex-nowrap flex-col  justify-center items-stretch my-auto mx-auto  w-7/12 shadow-lg rounded-lg border border-white bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 border-b border-slate-200'>
        <View className='flex px-10 pt-10 pb-5'>
          <Text className="flex rgb(95 114 166) text-3xl font-black  text-primary-dark w-8/12 font-['Oleo Script']">
            Welcome {authUser.firstName}
          </Text>
          <Text className='flex font-bold w-full text-primary-light text-base'>
            Can you give us some information about your child?
          </Text>
        </View>
      </View>

      <View className='flex px-10 pb-10 pt-4'>
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
                        className='text-primary-dark font-bold ml-3 my-2'
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
                        className='text-primary-dark font-bold ml-3 my-2'
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
                      className='text-primary-dark font-bold ml-3 my-2'
                      htmlFor='gender'
                    >
                      Sex at birth
                    </Text>

                    <View className='flex flex-row '>
                      <View className='flex flex-row items-center cursor-pointer pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm backdrop-blur-sm border-slate-300'>
                        <Field
                          style={styles.radio}
                          type='radio'
                          name='gender'
                          value='M'
                        />
                        <Text className=' text-primary-dark ml-1'>Boy</Text>
                      </View>

                      <View className='flex flex-row items-center cursor-pointer pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm backdrop-blur-sm border-slate-300'>
                        <Field
                          style={styles.radio}
                          type='radio'
                          name='gender'
                          value='F'
                        />
                        <Text className=' text-primary-dark ml-1'>Girl</Text>
                      </View>
                      <View className='py-3 flex flex-row items-center cursor-pointer pl-2 pr-6 mr-3 duration-150 bg-white border rounded-full shadow-sm backdrop-blur-sm border-slate-300'>
                        <Field
                          style={styles.radio}
                          type='radio'
                          name='gender'
                          value='RNS'
                        />
                        <Text className=' text-primary-dark ml-1'>
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

              <View className='flex justify-end flex-row'>
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
