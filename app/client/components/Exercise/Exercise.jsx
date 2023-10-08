import { useState } from 'react';
import AudioExerciseSet from './Audio/AudioExerciseSet';
import Reward from './Reward';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { PrevButton, NextButton } from '../navigation/Buttons';
import { ChildData } from '../../services/AuthWrapper';

const Exercise = () => {
  const { child } = ChildData();
  //NOTE: Dummy data
  //TODO: Add images to wordBank collection
  const recommendedWords = [
    {
      wordBankId: '651de3dbf3a9be0887dd1ddd',
      name: 'apple',
      priority: 1,
      // image: 'apple.jpeg',
      category: 'food_drink',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1d95',
      name: 'bear',
      category: 'animals',
      priority: 2,
      image: 'bear.svg',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1dc1',
      name: 'car',
      category: 'vehicles',
      priority: 3,
      image: 'car.svg',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1dcb',
      name: 'ball',
      priority: 4,
      category: 'toys',
      image: 'balls.svg',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1dc0',
      name: 'bus',
      priority: 5,
      category: 'vehicles',
      image: 'bus.svg',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '650ab45fc748f75028596913',
      name: 'shoe',
      priority: 6,
      category: 'clothing',
      // image: 'shoe.jpeg',
      is_audio: true,
      wordLevel: 1,
    },
  ];

  // TODO: DS/Predict the recommended words for the audio exercise set must be restricted to is_audio = true
  // Ticiane needs to change her code so that it does not restrict to 6 words.
  // I need to change my code to restrict to is_audio, and handle the behavior depending on the number of words returned then (=limit to 6 max)

  // const recommendedWords = child.vocabLogs[0].recommendedWords;
  console.log('reco', child.vocabLogs[0].recommendedWords);

  const [isSetDone, setIsSetDone] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  const handleCompleteSession = () => {
    setShowRewards(true);
  };

  return (
    <>
      {!showRewards && (
        <AudioExerciseSet
          child={child}
          recommendedWords={recommendedWords}
          onCompleteSession={handleCompleteSession}
        />
      )}

      {!showRewards && isSetDone ? (
        <View className='flex ml-auto mr-0'>
          <Pressable onPress={handleCompleteSession}>
            <Text>Complete session</Text>
          </Pressable>
        </View>
      ) : null}

      {showRewards && <Reward />}
    </>
  );
};

export default Exercise;
