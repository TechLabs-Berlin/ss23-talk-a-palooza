import { useState } from 'react';
import AudioExerciseSet from './Audio/AudioExerciseSet';
import Reward from './Reward';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { HomeButton, NextButton } from '../navigation/Buttons';
import { ChildData } from '../../services/AuthWrapper';

const Exercises = () => {
  const { child } = ChildData();
  //NOTE: We send the child's spokenWords to DS (and so get the recommended words from DS automatically)
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

  const [isSetDone, setIsSetDone] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  const handleCompleteSession = () => {
    setShowRewards(true);
  };

  return (
    <>
      <HomeButton />

      {!showRewards && (
        <AudioExerciseSet
          child={child}
          recommendedWords={recommendedWords}
          onCompleteSession={handleCompleteSession}
        />
      )}

      {!showRewards && isSetDone ? (
        <View className='flex mr-0 ml-auto'>
          <Pressable onPress={handleCompleteSession}>
            <Text>Complete session</Text>
          </Pressable>
        </View>
      ) : null}

      {showRewards && <Reward />}
    </>
  );
};

export default Exercises;
