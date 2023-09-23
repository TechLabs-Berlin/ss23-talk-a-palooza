import { StyleSheet, Text, View, Pressable } from 'react-native';
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
        <View className='container mx-auto flex flex-col items-center py-12 sm:py-24'>
          <View className='w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10'>
            <Text className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
              Talk a Palooza
            </Text>
            <Text className='mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg'>
              Here comes a awesome one sentence pitch that really makes you want
              to try the app
            </Text>
          </View>
          <Login />
        </View>
      </View>
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
