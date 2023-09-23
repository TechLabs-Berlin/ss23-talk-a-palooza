import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <View className='flex ml-0 mr-auto'>
      <Pressable onPress={goBack}>
        <AntDesign
          className='flex-start p-2  sm:px-10 gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 transition duration-150'
          name='leftcircleo'
          size={42}
          color=''
        />
      </Pressable>
    </View>
  );
};

export default BackButton;
