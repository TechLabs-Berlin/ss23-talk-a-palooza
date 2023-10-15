import { Link } from 'react-router-dom';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { ChildData } from '../services/AuthWrapper';
import AddWords from './initial-assessment/AddWords';
import { DashboardButton } from './layouts/Buttons';
import { BeeAnimation } from './layouts/Animations';
import { Heading } from './layouts/typo';

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
            <Heading text={`Hi, ${child.firstName}`} />
          </View>
          <View className='flex flex-row justify-between w-8/12'>
            <View className='flex flex-row mr-8 justify-center items-center h-28 text-center shadow-lg bg-[#c0cee9d3] border border-[#c0cee9] w-64 rounded-lg'>
              <Link to='/practice' style={{ textDecoration: 'none' }}>
                <Heading
                  text={'Can you say...'}
                  style={{ fontSize: 24, fontWeight: 700 }}
                />
              </Link>
            </View>
            <View className='flex flex-row justify-center items-center h-28 text-center shadow-lg bg-[#fed16fd4] border border-[#fed16f] w-64 rounded-lg'>
              <Link to='/catalog' style={{ textDecoration: 'none' }}>
                <Heading
                  text={'Catalog'}
                  style={{ fontSize: 24, fontWeight: 700 }}
                />
              </Link>
            </View>
          </View>
        </View>
        <BeeAnimation top='260px' left='136px' />
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
  subtitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '.5em',
  },
});
