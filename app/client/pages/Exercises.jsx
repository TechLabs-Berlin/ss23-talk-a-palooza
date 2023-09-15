import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';

const Exercises = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];
  const [child, setChild] = useState({ hasChild });

  console.log(child);
  console.log(authUser);
  console.log(child);

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
      <Text style={styles.helper}>Childname: {child.firstName}</Text>
      <View style={styles.exerciseBloc}>
        <View>
          <Text>Exercise Image</Text>
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
