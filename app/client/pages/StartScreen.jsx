import { StyleSheet, Text, View } from 'react-native';
import { AuthData } from '../services/AuthWrapper';
import Login from '../components/Login';

//  Startscreen:
// Shows only if user not logged:
// - as start page when entering the App
// - as redirection page when entering from another page
//  login Component.

const StartScreen = () => {
  const { authUser } = AuthData();
  console.log('Is user logged in?', authUser.isAuthenticated);

  return (
    <>
      <View style={styles.app}>
        <Text style={styles.title}>Talk a Palooza</Text>
        <Text style={styles.subtitle}>
          Awesome one sentence pitch that really makes you want to try the app
        </Text>
      </View>
      <Login />
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 1028,
    maxHeight: 768,
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '1em',
    textAlign: 'center',
  },
  subtitle: {
    // fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '1em',
    textAlign: 'center',
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
  link: {
    color: '#1977f2',
  },
  listitem: {
    marginVertical: '0.5rem',
  },
  pageLink: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
