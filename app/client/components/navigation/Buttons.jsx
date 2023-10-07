import { View, Text, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const HomeButton = () => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <View className='flex ml-0 mr-auto'>
      <Pressable onPress={goHome}>
        <Text className='p-2 duration-150 bg-white border rounded-full shadow-sm border-slate-200'>
          <MaterialCommunityIcons name='home' size={42} color='#BBD468' />
        </Text>
      </Pressable>
    </View>
  );
};

export const NextButton = ({ onPress }) => {
  return (
    <View className='flex ml-auto mr-0'>
      <Pressable onPress={onPress}>
        <Text className='duration-150 bg-white border rounded-full shadow-sm backdrop-blur-sm border-slate-200'>
          <MaterialCommunityIcons
            name='chevron-right'
            size={56}
            color='#BBD468'
          />
        </Text>
      </Pressable>
    </View>
  );
};

export const PrevButton = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <View className='flex ml-0 mr-auto'>
      <Pressable onPress={goBack}>
        <Text className='duration-150 bg-white border rounded-full shadow-sm backdrop-blur-sm border-slate-200'>
          <MaterialCommunityIcons
            name='chevron-left'
            size={56}
            color='#BBD468'
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
      className='flex flex-row justify-center gap-2 pt-1 pb-2 mb-4 transition duration-150 bg-white border rounded-lg shadow-lg sm:px-10 border-slate-200'
    >
      <Text className='mt-4 font-bold text-center text-zinc-500 text-m'>
        {text}
      </Text>
    </Pressable>
  );
};

export const DashboardButton = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex flex-row items-center justify-center gap-2 pt-1 pb-2 mb-4 transition duration-150 bg-white border rounded-lg shadow-lg align-center sm:px-6 border-slate-200'
    >
      <MaterialCommunityIcons name='view-dashboard' size={42} color='#BBD468' />
      <Text className='mx-4 font-bold text-center text-zinc-500'>
        Dashboard
      </Text>
    </Pressable>
  );
};

export const GoogleButton = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex flex-row items-center justify-center gap-2 pt-1 pb-2 mb-4 transition duration-150 bg-white border rounded-lg shadow-lg w-60 sm:px-6 border-slate-200'
    >
      <Image
        className='w-6 h-6 m-0 mt-0'
        source={{
          uri: 'https://www.svgrepo.com/show/475656/google-color.svg',
        }}
        loading='lazy'
        alt='google logo'
      />
      <Text className='mt-4 font-bold text-center text-zinc-500 text-m'>
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
