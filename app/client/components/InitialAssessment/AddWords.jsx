import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import AssessForm from './AssessForm';
import AssessSuccess from './AssessSuccess';
import { createVocab } from '../../services/vocabLogsService';

const AddWords = ({ child }) => {
  const [words, setWords] = useState([]);
  const [isAssessed, setIsAssessed] = useState(false);

  const handleWordsSubmit = (values) => {
    if (Array.isArray(values.words)) {
      // Format the spokenWords array correctly
      const formattedSpokenWords = values.words.map((word) => ({
        word: word,
      }));

      const dataToSend = {
        spokenWords: formattedSpokenWords,
        child: child.id,
      };

      setWords({ ...words, spokenWords: dataToSend.spokenWords });
      const result = createVocab(dataToSend);
      console.log('result', result);
      console.log('values:' + JSON.stringify(dataToSend));
      console.log('Words added:', dataToSend.spokenWords);
      setIsAssessed(true);
      console.log('is assessed?', isAssessed);
    } else {
      // Handle the case where values.words is not an array
      console.error('values.words is not an array:', values.words);
    }
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>{child.firstName} can say...</Text>
      {isAssessed ? (
        <AssessSuccess child={child} />
      ) : (
        <AssessForm child={child} onSubmit={handleWordsSubmit} />
      )}
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
