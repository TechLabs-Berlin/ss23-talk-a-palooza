import { StyleSheet, Text, View } from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ChildData } from '../../services/AuthWrapper';

const AssessForm = ({ onSubmit, initWords }) => {
  const { child } = ChildData();

  const validationSchema = Yup.object({
    words: Yup.array().min(1, 'Select at least one word'),
  });

  return (
    <View className='container flex flex-col items-center justify-center py-12 mx-auto sm:py-24'>
      <View className='bg-[white] opacity-[0.85] border p-5 border-solid border-[#ddd]'>
        <Formik
          initialValues={{ initWords: {} }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Text style={styles.title}>{child.firstName} can say...</Text>
            <View style={[styles.flex, styles.bloc]}>
              {/* Map over wordbank list where is_initial_assessment = true */}
              {/* TODO: filter for is_initial_assessment = true */}
              {initWords.map((initWord) => (
                <View key={initWord._id} style={{ padding: 5 }}>
                  <Text>
                    <Field type='checkbox' name='words' value={initWord.id} />
                    {initWord.name}
                  </Text>
                </View>
              ))}
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

export default AssessForm;

const styles = StyleSheet.create({
  bloc: {
    flexDirection: 'row',
    maxWidth: '250px',
    flexWrap: 'wrap',
    margin: '20px',
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
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
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
