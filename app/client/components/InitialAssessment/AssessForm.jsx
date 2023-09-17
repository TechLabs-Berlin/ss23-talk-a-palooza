import { StyleSheet, Text, View } from 'react-native';
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
  const validationSchema = Yup.object({
    words: Yup.array().min(1, 'Select at least one word'),
  });

  return (
    <View style={styles.app}>
      <Formik
        initialValues={{ words: [] }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Text style={styles.title}>{child.firstName} can say...</Text>
          <View style={(styles.flex, styles.bloc)}>
            {/* Map over wordBank list */}
            {wordBank.map((word) => (
              <View key={word} style={{ padding: 5 }}>
                <Text>
                  <Field type='checkbox' name='words' value={word} />
                  {word}
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
  );
};

export default AssessForm;

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 1024,
    maxHeight: 768,
    padding: 20,
  },
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
