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

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);

  //TODO: Get recommended words from DS
  const recommendedWords = [
    {
      wordBankId: 1,
      name: 'Banana',
      priority: 1,
      image: 'banana.svg',
      level: 1,
    },
    { wordBankId: 2, name: 'Teddy', priority: 2, image: 'teddy.svg', level: 1 },
    { wordBankId: 3, name: 'Baby', priority: 3, image: 'baby.svg', level: 2 },
    { wordBankId: 4, name: 'Dog', priority: 4, image: 'dog.svg', level: 2 },
    { wordBankId: 5, name: 'Cat', priority: 5, image: 'cat.svg', level: 1 },
    { wordBankId: 6, name: 'Milk', priority: 6, image: 'milk.svg', level: 1 },
  ];
  // Create a copy of recommendedWords to avoid modifying the original array
  const [toTestWords, setToTestWords] = useState([...recommendedWords]);
  const [completedWords, setCompletedWords] = useState([]);
  const [wordCountToShow, setWordCountToShow] = useState(1);

  console.log('completed words', completedWords.wordBankId);

  const completeWord = (wordBankId) => {
    // Check if the wordBankId is not already in completedWords
    if (!completedWords.includes(wordBankId)) {
      // Add the completed word's wordBankId to completedWords
      setCompletedWords([...completedWords, wordBankId]);
    }

    // Remove the completed word from toTestWords
    const updatedToTestWords = toTestWords.filter(
      (word) => word.wordBankId !== wordBankId
    );
    console.log('updated to test words', updatedToTestWords);

    // Update toTestWords with the filtered array
    setToTestWords(updatedToTestWords);
    console.log('to test words', toTestWords);

    // Check if we need to increment wordCountToShow
    if (completedWords.length >= wordCountToShow) {
      setWordCountToShow(wordCountToShow + 1);
    }
  };

  // TODO: Implement navigation logic to continue to the next exercise + when does DL assess the exercises?
  // TODO: set of exercises? Waiting for specifications
  // TODO: recommended words
  // TODO: spoken words where word = word

  const calculateFlex = () => {
    switch (wordCountToShow) {
      case 1:
        return 1; // Take up full width/height
      case 2:
        return 0.5; // Take up half of the available space
      case 3:
        return 1 / 3; // Take up one-third of the available space
      default:
        return 1; // Default to full width/height
    }
  };

  return (
    <>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.row}>
          {toTestWords
            .filter(
              (recommendedWord) =>
                !completedWords.includes(recommendedWord.wordBankId)
            )
            .slice(0, wordCountToShow)
            .map((recommendedWord, index) => (
              <RecordPlayAudio
                child={child}
                word={recommendedWord}
                toTestWords={toTestWords}
                key={recommendedWord.wordBankId}
                style={[
                  styles.flexGrow,
                  index % 2 === 0 ? styles.topExercise : styles.bottomExercise,
                ]}
                flex={calculateFlex()}
              />
            ))}
        </View>
      </View>
      {/* continue button */}
      <View className='flex mr-0 ml-auto'>
        <Pressable onPress={() => completeWord(toTestWords[0].wordBankId)}>
          <Text>Continue</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space exercises evenly
    flexWrap: 'wrap', // Allow wrapping into multiple rows if needed
  },
  flexGrow: {
    flexBasis: '50%', // 50% width for 2 columns, 33.33% width for 3 columns
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  topExercise: {
    order: -1, // Display at the top of its row
    margin: '0 auto',
  },
  bottomExercise: {
    order: 1, // Display at the bottom of its row
  },
});
