import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';
import RecordPlayAudio from '../components/Exercises/recordPlayAudio';

const Exercises = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);
  console.log('Fetching now from the child collection', child);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Let's start</Text>
      </View>
      <Text>Child: {child.firstName}</Text>
      {/* future component for audio exercise  */}
      <View style={styles.exerciseBloc}>
        <View>
          <Text>Banana Image</Text>
          <RecordPlayAudio />
          <Text>Banana Text</Text>
        </View>
      </View>
    </View>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
