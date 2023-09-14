import { AuthData } from '../services/AuthWrapper';
import { StyleSheet, Text, View } from 'react-native';

const Exercises = () => {
  const { authUser } = AuthData();
  // Get the ID of the first child of the current user
  const child = authUser.children[0];
  console.log(child);
  const logout = () => {
    window.open('http://localhost:3001/api/auth/logout', '_self');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Exercises</Text>
      </View>
      <Text>Username: {authUser.displayName}</Text>
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
