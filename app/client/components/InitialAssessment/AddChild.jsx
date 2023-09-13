import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import ChildForm from './ChildForm';
import AddWords from './AddWords';
import ChildrenService from '../../services/childrenService';
import getChild from '../../services/childrenService';
import { createVocab } from '../../services/vocabLogsService';

const AddChild = ({ authUser }) => {
  const [child, setChild] = useState(child);
  const [wordsData, setWordsData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitChildForm = async (values) => {
    const child = await ChildrenService.createChild(values, authUser);
    setChild(child);
    setIsSubmitted(true);
    console.log('Child added:', child);
  };

  const handleSubmitAssessForm = async (values) => {
    console.log('AssessForm submitted with values:', values);
    await createVocab(spokenWords.values, child);
    setWordsData(wordsData);
    console.log('Child Data:', child);
    console.log('Words from initial Assessment:', words);
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>InitialAssessment</Text>
      <Text>
        Hi {authUser.displayName}! (
        {child ? 'Child registered' : 'No child assessed yet'})
      </Text>
      {isSubmitted ? (
        <AddWords child={child} />
      ) : (
        <ChildForm onSubmit={handleSubmitChildForm} />
      )}
    </View>
  );
};

export default AddChild;

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
