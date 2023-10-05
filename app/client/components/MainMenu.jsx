import { Link } from 'react-router-dom';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { ChildData } from '../services/AuthWrapper';
import AddWords from './InitialAssessment/AddWords';
import { WhiteButton } from '../components/navigation/Buttons';

const imageMain = require('../assets/backgrounds/main.svg');
const imageAssess = require('../assets/backgrounds/giveheart.svg');

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
        <View style={styles.container}>
          <View className='flex ml-auto mr-0 flex-column'>
            <WhiteButton text='Dashboard' onPress={'/dashboard'} />
          </View>

          <View className='flex items-center'>
            <Image
              source={require('../assets/images/avatarChild.svg')}
              style={styles.avatar}
            />
            <Text className='text-2xl font-bold text-primary-dark'>
              Hi, {child.firstName}
            </Text>
          </View>
          <View className='flex flex-row justify-around w-8/12'>
            <View className='flex flex-row mr-8 justify-center items-center h-28 text-center shadow-lg bg-[#c0cee9d3] w-64 rounded-2xl'>
              <Link to='/practice'>
                <Text className='text-primary-dark text-2xl font-bold font-["Oleo Script"]'>
                  My own path
                </Text>
              </Link>
            </View>
            <View className='flex flex-row justify-center items-center h-28 text-center shadow-lg bg-[#fed16fd4] w-64 rounded-2xl'>
              <Link to='/catalog'>
                <Text className='text-primary-dark text-2xl font-bold font-["Oleo Script"]'>
                  Catalog
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View className='flex justify-between w-full h-full bg-white'>
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
    justifyContent: 'space-around',
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingBottom: '80px',
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
