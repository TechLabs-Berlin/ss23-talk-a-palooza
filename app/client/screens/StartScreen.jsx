import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { AuthData } from '../services/AuthWrapper';
import Login from '../components/Login';
import LayoutHOC from '../components/layouts/LayoutHOC';

const image = require('../assets/images/startscreen.svg');

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
      <ImageBackground
        source={image}
        resizeMode={'cover'}
        loading='lazy'
        style={{ flex: 1, width: '100%', justifyContent: 'center' }}
      >
        <View style={styles.app}>
          <View className='container flex flex-col items-center justify-center py-12 mx-auto sm:py-24'>
            <View className='flex-col items-center justify-center w-11/12 mb-5 sm:w-2/3 lg:flex sm:mb-10'>
              <Text className="text-primary-dark text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-black leading-7 md:leading-10 font-['Oleo Script']">
                Talk-a-Palooza
              </Text>
              <Text className='text-xs font-normal text-center text-gray-400 sm:mt-4 lg:w-10/12 sm:text-lg '>
                Here comes a awesome one sentence pitch that really makes you
                want to try the app
              </Text>
            </View>
            <Login />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default LayoutHOC(StartScreen);

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    // padding: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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
