import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';

const ExerciseBloc = ({ word }) => {
  return (
    <View style={styles.exerciseBloc}>
      <Text style={styles.title}>* Try saying</Text>
      <Text className='mb-6' style={styles.title}>
        "BANANA"
      </Text>
      <Image
        source={require('../../assets/images/banana.jpg')}
        style={styles.banana}
      />
    </View>
  );
};

export default ExerciseBloc;

const styles = StyleSheet.create({
  exerciseBloc: {
    alignItems: 'center',
  },
  banana: {
    width: 400,
    height: 317,
  },
  title: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },
});
