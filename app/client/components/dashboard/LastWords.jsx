import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function LastWords() {
  return (
    <>
      <Text className='mb-2 text-lg font-semibold text-primary-dark'>
        Last Words Acquired
      </Text>
      <View className='flex flex-row items-start'>
        <View className='flex flex-row flex-wrap items-center w-56 mr-3 font-bold text-md text-primary-dark'>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          <Text className='mr-3'> Cow</Text>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          <Text className='mr-3'> Tiger</Text>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          <Text className='mr-3'> Dog </Text>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          <Text className='mr-3'>Noodles</Text>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          <Text className='mr-3'>Fast</Text>
          <MaterialCommunityIcons name='heart' size={24} color='#E9281F' />
          <Text className=''> Bear </Text>
        </View>
      </View>
    </>
  );
}

export default LastWords;
