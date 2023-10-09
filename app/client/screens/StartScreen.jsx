import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { AuthData } from '../services/AuthWrapper';
import Login from '../components/Login';
import LayoutHOC from '../components/layouts/LayoutHOC';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const image = require('../assets/backgrounds/startscreen.svg');

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
          {/* //TODO: style text bloc width, fonts + add animals animations */}
          <View className='container flex flex-col items-center justify-center py-12 mx-auto sm:pt-36'>
            <DotLottiePlayer
              src='https://lottie.host/9a46b7f3-08d2-4191-acb3-c1667c1a402b/SPhd1EWDvF.lottie'
              style={styles.sun}
              autoplay
              loop
              renderer='svg'
              speed={1}
            ></DotLottiePlayer>
            <DotLottiePlayer
              src='https://lottie.host/8a91afb4-a28e-4efd-a32b-1e52648c4d0d/Q6jYv9ISBy.json'
              style={styles.cloud1}
              autoplay
              loop
              renderer='svg'
              speed={1}
            ></DotLottiePlayer>
            <DotLottiePlayer
              src='https://lottie.host/8a91afb4-a28e-4efd-a32b-1e52648c4d0d/Q6jYv9ISBy.json'
              autoplay
              renderer='svg'
              loop
              speed={1}
              style={styles.cloud2}
            ></DotLottiePlayer>
            <View className='flex-col items-center justify-center w-11/12 mb-5 sm:w-2/3 lg:flex sm:mb-12'>
              <Text className="text-primary-dark text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-black leading-7 md:leading-10 font-['Oleo Script']">
                Talk-a-Palooza
              </Text>
              <Text className='text-xs font-normal text-center text-primary-light sm:mt-4 lg:w-10/12 sm:text-lg '>
                Here comes a awesome one sentence pitch that really makes you
                want to try the app
              </Text>
            </View>
            <Login />
            <DotLottiePlayer
              src='https://lottie.host/3a058d63-23e9-45dd-975a-736404c139cd/BfFC12QwVg.lottie'
              autoplay
              // renderer='svg'
              loop
              speed={1}
              style={styles.sloth}
            ></DotLottiePlayer>

            <Image
              source={require('../assets/images/tiger.svg')}
              style={styles.tiger}
            />
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
  tiger: {
    resizeMode: 'initial',
    bottom: '-40px',
    position: 'absolute',
    height: '130px',
    width: '123px',
    right: '160px',
  },
  sloth: {
    bottom: '80px',
    position: 'absolute',
    height: '130px',
    width: '123px',
    right: '45px',
  },
  image: {
    flex: 1,
    // padding: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  cloud1: {
    position: 'absolute',
    right: '-25px',
    top: '-58px',
    width: '45%',
    height: '45%',
  },
  cloud2: {
    position: 'absolute',
    left: '-40px',
    top: '-60px',
    width: '25%',
    height: '25%',
  },
  sun: {
    position: 'absolute',
    left: '0px',
    top: '-50px',
    width: '35%',
    height: '35%',
    zIndex: '100',
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
