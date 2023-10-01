import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <View className='flex ml-0 mr-auto'>
      <Pressable onPress={goBack}>
        <MaterialCommunityIcons
          className='gap-2 p-2 transition duration-150 border rounded-md shadow-lg flex-start sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200'
          name='chevron-left-circle-outline'
          size={52}
          color='black'
        />
      </Pressable>
    </View>
  );
};

export const HomeButton = () => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <Pressable onPress={goHome}>
      <MaterialCommunityIcons
        className='gap-2 p-2 transition duration-150 border rounded-md shadow-lg flex-start sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200'
        name='home-circle-outline'
        size={52}
        color='black'
      />
    </Pressable>
  );
};

export const NextButton = ({ onPress }) => {
  return (
    <View className='flex ml-auto mr-0'>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons
          className='gap-2 p-2 transition duration-150 border rounded-md shadow-lg flex-start sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200'
          name='chevron-right-circle-outline'
          size={52}
          color='black'
        />
      </Pressable>
    </View>
  );
};
