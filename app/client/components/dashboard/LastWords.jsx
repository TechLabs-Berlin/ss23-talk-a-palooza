import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function LastWords() {
  return (
    <>
      <Text className='mb-2 text-lg font-semibold text-primary-dark'>
        Last Words
      </Text>
      <Text className='mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500'>
        10 last Spoken
      </Text>
      <View className='flex flex-row items-start my-3'>
        <Text className='mr-3 text-md font-bold flex items-center text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Banana
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Teddy
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Dog
        </Text>
        <Text className='mr-2 text-md font-bold text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Milk
        </Text>
      </View>
      <View className='flex flex-row items-start mb-3'>
        <Text className='mr-2 text-md font-bold text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Cat
        </Text>
        <Text className='mr-2 text-md font-bold text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Banana
        </Text>
      </View>
      <View className='flex flex-row items-start mb-3'>
        <Text className='mr-2  text-md font-bold text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Banana
        </Text>
        <Text className='mr-2 text-md font-bold text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Banana
        </Text>
        <Text className='mr-2 text-md font-bold text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          Banana
        </Text>
      </View>
    </>
  );
}

export default LastWords;
