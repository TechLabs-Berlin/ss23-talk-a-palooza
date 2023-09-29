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
          className='flex-start p-2  sm:px-10 gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 transition duration-150'
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
    <View className='flex ml-0 mr-auto'>
      <Pressable onPress={goHome}>
        <MaterialCommunityIcons
          className='flex-start p-2  sm:px-10 gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 transition duration-150'
          name='home-circle-outline'
          size={52}
          color='black'
        />
      </Pressable>
    </View>
  );
};

export const NextButton = ({ onPress }) => {
  return (
    <View className='flex mr-0 ml-auto'>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons
          className='flex-start p-2  sm:px-10 gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 transition duration-150'
          name='chevron-right-circle-outline'
          size={52}
          color='black'
        />
      </Pressable>
    </View>
  );
};
