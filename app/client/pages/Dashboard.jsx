import { AuthData } from '../services/AuthWrapper';
import TestConnect from '../components/TestConnect';
import { StyleSheet, Text, View } from 'react-native';

const Dashboard = () => {
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
        <Text>Dashboard</Text>
      </View>
      <ul>
        <li>
          <img
            src={authUser.profilePhoto}
            alt=''
            className='avatar'
            width='32px'
            height='32px'
            sx={{ width: 32, height: 32, br: '50%' }}
          />
        </li>
        <li>Username: {authUser.displayName}</li>
        <button onClick={logout}>Logout</button>
      </ul>
      <TestConnect child={child} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
