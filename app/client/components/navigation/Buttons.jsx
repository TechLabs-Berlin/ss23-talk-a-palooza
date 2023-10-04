import { View, Text, Pressable, Image } from 'react-native';
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
      <Text>
        <MaterialCommunityIcons
          className='gap-2 p-2 transition duration-150 border rounded-md shadow-lg flex-start sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200'
          name='home-circle-outline'
          size={52}
          color='black'
        />
      </Text>
    </Pressable>
  );
};

export const NextButton = ({ onPress }) => {
  return (
    <View className='flex ml-auto mr-0'>
      <Pressable onPress={onPress}>
        <Text>
          <MaterialCommunityIcons
            className='gap-2 p-2 transition duration-150 border rounded-md shadow-lg flex-start sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200'
            name='chevron-right-circle-outline'
            size={52}
            color='black'
          />
        </Text>
      </Pressable>
    </View>
  );
};

export const WhiteButton = ({ onPress, text }) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex flex-row justify-center gap-2 py-2 mb-4 transition duration-150 bg-white border rounded-lg shadow-lg sm:px-10 bg-white/15 backdrop-blur-sm border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow'
    >
      <Text className='mt-4 font-bold text-center text-zinc-500 text-m'>
        {text}
      </Text>
    </Pressable>
  );
};

export const GoogleButton = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex flex-row justify-center gap-2 pt-1 pb-2 mb-4 transition duration-150 bg-white border rounded-lg shadow-lg w-60 sm:px-6 bg-white/15 backdrop-blur-sm border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow'
    >
      <Image
        className='w-6 h-6 m-0 mt-0'
        source={{
          uri: 'https://www.svgrepo.com/show/475656/google-color.svg',
        }}
        loading='lazy'
        alt='google logo'
      />
      <Text className='mt-4 font-bold text-center text-zinc-500 text-m font-["Roboto"]'>
        Sign In with Google
      </Text>
    </Pressable>
  );
};

export const AppleButton = () => {
  return (
    <Pressable
      // onPress={onPress}
      className='flex flex-row justify-center gap-2 pt-1 pb-2 mb-4 transition duration-150 bg-black border rounded-lg shadow-lg w-60 sm:px-6 backdrop-blur-sm'
    >
      <Image
        className='w-6 h-6 m-0 mt-0'
        source={require('../../assets/images/apple-logo.svg')}
        loading='lazy'
        alt='apple logo'
      />
      <Text className='font-bold text-center text-white text-m font-["Roboto"]'>
        Sign In with Apple
      </Text>
    </Pressable>
  );
};

export const GreenButton = ({ onPress, text }) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex flex-row justify-center gap-2 pt-1 pb-2 mb-4 transition duration-150 rounded-lg shadow-lg sm:px-6 backdrop-blur-sm bg-primary-green hover:border-slate-400 hover:text-slate-900 hover:shadow'
    >
      <Text className='font-bold text-center text-primary-dark text-l'>
        {text}
      </Text>
    </Pressable>
  );
};

//TODO: check consistency of button styles
export const ActionButton = ({ onPress, text, background, color }) => {
  return (
    <Pressable
      onPress={onPress}
      styles={{ background: background }}
      className='flex flex-row justify-center gap-2 p-2 mx-2 transition duration-150 border rounded-lg shadow-lg sm:px-10 backdrop-blur-sm border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow'
    >
      <Text
        className='font-bold text-center text-l'
        styles={{ color: { color } }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
