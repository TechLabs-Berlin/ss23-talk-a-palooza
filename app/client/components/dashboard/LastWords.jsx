import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DashboardHeading } from '../layouts/typo';

//TODO: Replace this with the actual data
const lastWords = [
  { id: 1, text: 'Cow' },
  { id: 2, text: 'Tiger' },
  { id: 3, text: 'Dog' },
  { id: 4, text: 'Noodles' },
  { id: 5, text: 'Fast' },
  { id: 6, text: 'Bear' },
];

function LastWords() {
  return (
    <>
      <DashboardHeading text='Last Words Acquired' />
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
          {lastWords.map((lastWord) => (
            <View key={lastWord.id}>
              <MaterialCommunityIcons
                name='heart'
                size={24}
                color={'#E9281F'}
              />
              <Text className='mr-3'>{lastWord.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

export default LastWords;
