import { StyleSheet, View, Text, Image } from 'react-native';

const ExerciseBloc = ({ word }) => {
  return (
    <View style={styles.exerciseBloc}>
      <Text style={styles.title}>BANANA</Text>
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
    marginTop: '1em',
    marginBottom: '2em',
    textAlign: 'center',
  },
});
