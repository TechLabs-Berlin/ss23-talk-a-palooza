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

export const WhiteButton = ({ onPress, text }) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex flex-row justify-center gap-2 p-2 mb-4 transition duration-150 bg-white border rounded-lg shadow-lg sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow'
    >
      <Text className='mt-4 font-bold text-center text-zinc-500 text-l'>
        {text}
      </Text>
    </Pressable>
  );
};

export const ActionButton = ({ onPress, text, background, color }) => {
  return (
    <Pressable
      onPress={onPress}
      styles={{ background: { background } }}
      className='flex flex-row justify-center p-2 transition duration-150 border rounded-lg shadow-lg sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow'
    >
      <Text
        className='font-bold text-center text-primary text-l'
        styles={{ color: { color } }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
