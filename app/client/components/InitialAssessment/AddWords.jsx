import { StyleSheet, Text, View } from 'react-native';
import AssessForm from './AssessForm';
import { createVocab } from '../../services/vocabLogsService';
import { useState, useEffect } from 'react';
import { getChild } from '../../services/childrenService';

const AddWords = ({ child }) => {
  // const child = authUser.children[0];
  const [words, setWords] = useState([]);

  const handleSubmit = async (spokenWords) => {
    await createVocab(spokenWords.values, child);
    setWords(words);
    console.log('Word added:', words);
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>{child.firstName} can say...</Text>

      <AssessForm onSubmit={handleSubmit} child={child} />
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
