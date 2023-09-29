import { AuthData } from '../../services/AuthWrapper';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { HomeButton, NextButton } from '../navigation/Buttons';

const Reward = ({}) => {
  const { authUser, child } = AuthData();
  //TODO: import results from Audio Exercise
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Reward Page</Text>
          <Text>
            Random: video, stamps, animated character singin + buttons play
            again & results
          </Text>
        </View>
      </View>
      <View className='flex flex-wrap space-x-10 flex-row mr-0 ml-auto'>
        <Pressable>
          <View className=' p-3  sm:px-10 flex flex-row gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'>
            <Text className='font-bold text-center'>Play again</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className=' p-3  sm:px-10 flex flex-row gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'>
            <Text className='font-bold text-center'>Results</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default Reward;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space exercises evenly
    flexWrap: 'wrap', // Allow wrapping into multiple rows if needed
  },
});
