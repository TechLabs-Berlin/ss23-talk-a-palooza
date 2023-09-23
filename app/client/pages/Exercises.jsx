import { useState, useEffect } from 'react';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';
import RecordPlayAudio from '../components/AudioExercise/RecordPlayAudio';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import BackButton from '../components/navigation/BackButton';

const Exercises = (word) => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });
  const [completedWords, setCompletedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([
    //TODO: get from recommended words
    { id: 1, word: 'Banana' },
    { id: 2, title: 'Teddy' },
    { id: 3, title: 'Apple' },
    { id: 4, title: 'Baby' },
  ]);
  const [wordCountToShow, setWordCountToShow] = useState(1);

  const completeWord = (word) => {
    setCompletedWords([...completedWords, word]);

    // Check if it's time to show more exercises
    if (completedWords.length >= wordCountToShow) {
      setWordCountToShow(wordCountToShow + 1);
    }
  };

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);

  // TODO: set of exercises? Waiting for specifications
  // TODO: recommended words
  // TODO: spoken words where word = word
  // const word = 'banana';

  // TODO: multiple images
  const calculateFlex = (wordCountToShow) => {
    switch (wordCountToShow) {
      case 1:
        return 1; // Take up full width/height
      case 2:
        return 0.3; // Take up half of the available space
      case 3:
        return 0.2; // Take up one-third of the available space
      default:
        return 1; // Default to full width/height
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      {completedWords.map((word) => (
        <RecordPlayAudio
          child={child}
          key={word.id}
          word={word}
          flex={calculateFlex(completedWords.length)}
        />
      ))}

      {availableWords.slice(0, wordCountToShow).map((word) => (
        <RecordPlayAudio
          child={child}
          key={word.id}
          word={word}
          flex={calculateFlex(completedWords.length)}
        />
      ))}
      <Pressable
        title='Complete Exercise'
        onPress={() => completeWord(availableWords[0])}
      >
        <Text>Continue</Text>
      </Pressable>
    </View>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
