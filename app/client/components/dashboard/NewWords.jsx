import { Text, View } from 'react-native';

function NewWords() {
  return (
    <>
      <Text className='mb-2 text-lg font-semibold text-primary-dark '>
        New Words
      </Text>
      <Text className='mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500'>
        Since last week
      </Text>
      <View className='flex flex-row items-start'>
        <Text className='mr-2 text-3xl font-bold text-primary-dark '>6</Text>
        <Text className='text-sm font-semibold text-white px-1.5 bg-[#398052] rounded-full'>
          +100%
        </Text>
      </View>
    </>
  );
}

export default NewWords;
