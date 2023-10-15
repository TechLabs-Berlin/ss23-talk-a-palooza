import { useState } from 'react';
import AudioExerciseSet from './Audio/AudioExerciseSet';
import Reward from './Reward';
import { View, Pressable, Text } from 'react-native';
import { ChildData } from '../../services/AuthWrapper';

const Exercise = () => {
  const { child } = ChildData();
  //NOTE: Dummy data, fits the current DL_model
  const recommendedWords = [
    {
      wordBankId: '651de3dbf3a9be0887dd1d9c',
      name: 'chicken',
      priority: 1,
      image: '',
      category: 'animals',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1df3',
      name: 'fish',
      category: 'food_drink',
      priority: 2,
      image: '',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1eae',
      name: 'flower',
      category: 'outside',
      priority: 3,
      image: '',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1e54',
      name: 'tongue',
      priority: 4,
      category: 'body_parts',
      image: '',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1eb0',
      name: 'grass',
      priority: 5,
      category: 'outside',
      image: '',
      is_audio: true,
      wordLevel: null,
    },
    {
      wordBankId: '651de3dbf3a9be0887dd1edd',
      name: 'work',
      priority: 6,
      category: 'places',
      // image: 'shoe.jpeg',
      is_audio: true,
      wordLevel: null,
    },
  ];
  // TODO: DS/Predict the recommended words for the audio exercise set must be restricted to is_audio = true
  // Ticiane needs to change her code so that it does not restrict to 6 words.
  // I need to change my code to restrict to is_audio, and handle the behavior depending on the number of words returned then (=limit to 6 max)

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
