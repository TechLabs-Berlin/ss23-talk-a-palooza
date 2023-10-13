import { Link } from 'react-router-dom';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { ChildData } from '../services/AuthWrapper';
import AddWords from './InitialAssessment/AddWords';
import { DashboardButton } from './layouts/Buttons';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const imageMain = require('../assets/backgrounds/forest.svg');
const imageAssess = require('../assets/backgrounds/giveheart.svg');

//TODO: Animated animals (birds?)

const MainMenu = () => {
  const { child } = ChildData();

  const isAssessed = child.vocabLogs && child.vocabLogs.length > 0;
  console.log('Child been assessed?', isAssessed);

  return isAssessed ? (
    <View className='flex justify-between w-full h-full ml-0 mr-auto flex-column'>
      <ImageBackground
        source={imageMain}
        resizeMode={'cover'}
        loading='lazy'
        style={{ flex: 1, width: '100%', justifyContent: 'center' }}
      >
        <View className='flex mt-5 ml-auto mr-5 flex-column'>
          <DashboardButton
            onPress={() => {
              window.location.href = '/dashboard';
            }}
          />
        </View>
        <View style={styles.container}>
          <View className='flex items-center'>
            <Image
              source={require('../assets/images/avatarChild.svg')}
              style={styles.avatar}
            />
            <Text className='text-2xl font-bold text-primary-dark'>
              Hi, {child.firstName}
            </Text>
          </View>
          <View className='flex flex-row justify-between w-8/12'>
            <View className='flex flex-row mr-8 justify-center items-center h-28 text-center shadow-lg bg-[#c0cee9d3] border border-[#c0cee9] w-64 rounded-lg'>
              <Link to='/practice' style={{ textDecoration: 'none' }}>
                <Text className='text-primary-dark text-2xl font-bold no-underline font-["Oleo Script"]'>
                  Can you say...
                </Text>
              </Link>
            </View>
            <View className='flex flex-row justify-center items-center h-28 text-center shadow-lg bg-[#fed16fd4] border border-[#fed16f] w-64 rounded-lg'>
              <Link to='/catalog' style={{ textDecoration: 'none' }}>
                <Text className='text-primary-dark text-2xl font-bold font-["Oleo Script"]'>
                  Catalog
                </Text>
              </Link>
            </View>
          </View>
        </View>
        <DotLottiePlayer
          src={require('../assets/animations/bee.lottie')}
          style={styles.bee}
          autoplay
          loop
          renderer='svg'
          speed={1}
        ></DotLottiePlayer>
      </ImageBackground>
    </View>
  ) : (
    <View className='flex justify-between w-full h-full bg-lightgrey'>
      <ImageBackground
        source={imageAssess}
        resizeMode={'cover'}
        loading='lazy'
        style={{ flex: 1, width: '100%', justifyContent: 'center' }}
      >
        <AddWords child={child} />
      </ImageBackground>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingBottom: '165px',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  bee: {
    position: 'absolute',
    top: '260px',
    left: '136px',
    width: '50px',
    height: '50px',
  },

  subtitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '.5em',
  },
});
