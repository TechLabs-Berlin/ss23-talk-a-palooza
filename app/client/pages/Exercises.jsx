import { useState, useEffect } from 'react';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';
import RecordPlayAudio from '../components/AudioExercise/RecordPlayAudio';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import BackButton from '../components/navigation/BackButton';

import axios from 'axios';

const Exercises = (word) => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);

  //NOTE: We send the child's spokenWords to DS
  //TODO: Create Service and controller to SEND to DS

  //NOTE: We get the recommended words from DS
  //TODO: Change from dummy data (or worst case fake it by providing a list of words and retrieving the info from WordBank)
  const recommendedWords = [
    {
      wordBankId: '650d2691df78bbefe5a91340',
      name: 'Banana',
      priority: 1,
      image: 'banana.svg',
      category: 'food',
      is_audio: true,
      wordLevel: 1,
    },
    {
      wordBankId: '650ab3b1c748f7502858d848',
      name: 'Teddy',
      category: 'toys',
      priority: 2,
      image: 'teddy.svg',
      is_audio: true,
      wordLevel: 1,
    },
    {
      wordBankId: '650ab3edc748f75028590a6f',
      name: 'Baby',
      category: 'people',
      priority: 3,
      image: 'baby.svg',
      is_audio: true,
      wordLevel: 2,
    },
    {
      wordBankId: '650ab431c748f750285942e2',
      name: 'Dog',
      priority: 4,
      category: 'animals',
      image: 'dog.svg',
      is_audio: true,
      wordLevel: 2,
    },
    {
      wordBankId: '650ab411c748f75028592835',
      name: 'Cat',
      priority: 5,
      category: 'animals',
      image: 'cat.svg',
      is_audio: true,
      wordLevel: 1,
    },
    {
      wordBankId: '650ab45fc748f75028596913',
      name: 'Milk',
      priority: 6,
      category: 'food',
      image: 'milk.svg',
      is_audio: true,
      wordLevel: 1,
    },
  ];

  //NOTE: We create a copy of recommendedWords to avoid modifying the original array
  const [toTestWords, setToTestWords] = useState([...recommendedWords]);
  const [completedWords, setCompletedWords] = useState([]);
  const [wordCountToShow, setWordCountToShow] = useState(1);

  const completeWord = (wordBankId) => {
    // Check if the wordBankId is not already in completedWords
    if (!completedWords.includes(wordBankId)) {
      // Add the completed word's wordBankId to completedWords
      setCompletedWords([...completedWords, wordBankId]);
    }

    // Remove the completed word from toTestWords
    //TODO: this should happen only after receiving a yes response from DL
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

  console.log('completed words', completedWords);
  console.log('to test words', toTestWords);

  const handleAudioRecognized = async (word) => {
    //TODO: update state completedWod Handle the success, e.g., set a flag or update state
    try {
      // Make an API request to update the child's spokenWords
      //TODO: (refactor in service)
      const dataToSend = {
        name: word.name,
        wordBankId: word.wordBankId,
        vocabLogId: child.vocabLogs[0]._id,
      };

      const response = await axios.post(
        'http://localhost:3001/api/vocablogs/updatespokenwords',
        {
          dataToSend,
        }
      );
      if (response.data) {
        // The child's spokenWords were successfully updated in the database
        console.log(
          `${child.firstName} can say ${word.name}!! Word added to their vocabLog `
        );
      } else {
        console.error('Failed to update child spokenWords');
      }
    } catch (error) {
      console.error('Error updating child spokenWords', error);
    }
    //TODO: update state completedWord
  };

  // TODO: Implement navigation logic to continue to the next exercise + when does DL assess the exercises?
  // TODO: set of exercises? Waiting for specifications

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
                onAudioRecognized={handleAudioRecognized}
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
