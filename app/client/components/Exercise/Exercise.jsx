import { useState, useEffect } from 'react';
import RecordPlayAudio from './Audio/RecordPlayAudio';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { HomeButton, NextButton } from '../navigation/Buttons';

import axios from 'axios';

const Exercises = (child) => {
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
  const [isSetDone, setIsSetDone] = useState(false);

  const completeWord = (wordBankId) => {
    setCompletedWords((prevCompletedWords) => {
      if (!prevCompletedWords.includes(wordBankId)) {
        return [...prevCompletedWords, wordBankId];
      }
      return prevCompletedWords;
    });

    const updatedToTestWords = toTestWords.filter(
      (word) => word.wordBankId !== wordBankId
    );

    setToTestWords(updatedToTestWords);

    setWordCountToShow((prevCount) => {
      const newCount = Math.min(prevCount + 1, 3);
      if (newCount === 3) {
        setIsSetDone(true);
      }
      return newCount;
    });
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

  const calculateFlex = () => {
    if (!isSetDone) {
      switch (wordCountToShow) {
        case 1:
          return 1; // Take up full width/height
        case 2:
          return 0.5; // Take up half of the available space
        case 3:
          return 1 / 3;
        default:
          return 1;
      }
    } else {
      return 1 / 3;
    }
  };

  console.log('word count to show', wordCountToShow);

  return (
    <>
      <HomeButton />
      <View style={styles.container}>
        <View style={styles.row}>
          {toTestWords
            .filter(
              (toTestWord) => !completedWords.includes(toTestWord.wordBankId)
            )
            .slice(0, wordCountToShow)
            .map((toTestWord, index) => (
              <RecordPlayAudio
                child={child}
                word={toTestWord}
                toTestWords={toTestWords}
                key={toTestWord.wordBankId}
                style={[styles.flexGrow]}
                flex={calculateFlex()}
                onAudioRecognized={handleAudioRecognized}
              />
            ))}
        </View>
      </View>

      {!isSetDone ? (
        <NextButton onPress={() => completeWord(toTestWords[0].wordBankId)} />
      ) : (
        <View className='flex mr-0 ml-auto'>
          <Pressable
            onPress={() => {
              window.location.href = '/reward';
              setIsSetDone(true);
            }}
          >
            <Text>Complete session</Text>
          </Pressable>
        </View>
      )}
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
    marginTop: 0,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bottomExercise: {
    order: 1, // Display at the bottom of its row
  },
});
