import { StyleSheet, Text, View } from 'react-native';
import AssessForm from './AssessForm';
// import wordsService from '../../services/wordsService';

const AddWords = ({ authUser }) => {
  const child = authUser.children[0];

  const handleSubmit = async (values, { resetForm }) => {
    const newWord = await wordsService.createWord(values, child);
    resetForm();
    console.log('Word added:', newWord);
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>{child.firstName} can say...</Text>

      <AssessForm onSubmit={handleSubmit} />
    </View>
  );
};

export default AddWords;

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 600,
    maxHeight: 768,
    padding: 20,
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
