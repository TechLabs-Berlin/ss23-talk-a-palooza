import { StyleSheet, View, Pressable, Text, ViewComponent } from 'react-native';
import { NextButton } from '../../navigation/Buttons';
import RecordPlayAudio from './RecordPlayAudio';

import { useState, useEffect } from 'react';
import {
  updateVocab,
  getRecommendation,
  saveRecommendedWords,
} from '../../../services/vocabLogsService';

const AudioExerciseSet = ({ child, recommendedWords, onCompleteSession }) => {
  const [toTestWords, setToTestWords] = useState(recommendedWords); //NOTE: We create a copy of recommendedWords to avoid modifying the original array
  const [completedWords, setCompletedWords] = useState([]);
  const [wordCountToShow, setWordCountToShow] = useState(1);
  const [isSetDone, setIsSetDone] = useState(false);

  // LOGIC a revoir? Est-ce necessaire si on met a jour spokenWords apres chaque
  const completeWord = (wordBankId) => {
    if (!completedWords.includes(wordBankId)) {
      setCompletedWords((prevCompletedWords) => [
        ...prevCompletedWords,
        wordBankId,
      ]);
      setToTestWords((prevToTestWords) =>
        prevToTestWords.filter((word) => word.wordBankId !== wordBankId)
      );
    }

    setWordCountToShow((prevCount) => {
      const newCount = Math.min(prevCount + 1, 4);
      if (newCount === 4) {
        setIsSetDone(true);
        // onCompleteSession();
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (isSetDone) {
      onCompleteSession();
    }
  }, [isSetDone, onCompleteSession]);

  const handleAudioRecognized = async (word) => {
    const dataToSend = {
      name: word.name,
      wordBankId: word.wordBankId,
      vocabLogId: child.vocabLogs[0]._id,
    };
    const dataToDS = {
      spokenWords: child.vocabLogs[0].spokenWords,
      child: {
        id: child.id,
        gender: child.gender,
        ageInMonths: child.ageInMonths,
      },
    };
    await updateVocab(dataToSend);
    await getRecommendation(dataToDS);
    await saveRecommendedWords(recommendedWords, child.vocabLogs[0]._id);
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
        case 4:
          return 1 / 4;
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
        <View className='flex p-4 ml-auto mr-0 flex-column'>
          <NextButton onPress={() => completeWord(toTestWords[0].wordBankId)} />
        </View>
      ) : null}
    </>
  );
};

export default AudioExerciseSet;

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
