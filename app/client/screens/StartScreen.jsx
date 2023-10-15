import { StyleSheet, Text, View, Image } from 'react-native';
import { AuthData } from '../services/AuthWrapper';
import Login from '../components/Login';
import LayoutHOC from '../components/layouts/LayoutHOC';
import { Heading } from '../components/layouts/typo';
import { LandBackground } from '../components/layouts/Backgrounds';
import {
  ChickAnimation,
  CloudAnimation,
  RaccoonAnimation,
  SlothAnimation,
  SunAnimation,
} from '../components/layouts/Animations';

const StartScreen = () => {
  const { authUser } = AuthData();
  console.log('Is user logged in?', authUser.isAuthenticated);

  return (
    <>
      <LandBackground />
      <View className='container flex flex-col items-center justify-center py-12 mx-auto sm:pt-36'>
        <SunAnimation top='-110px' left='-50px' />
        <CloudAnimation right='-25px' top='0px' width='45%' height='45%' />
        <CloudAnimation left='-40px' top='-3px' width='25%' height='25%' />

        <View className='flex-col items-center justify-center w-11/12 mb-5 sm:w-2/3 lg:flex sm:mb-12'>
          <Heading text='Talk a Palooza' className='text-center' />
          <Text className='text-xs font-normal text-center font-karla text-primary-light sm:mt-4 lg:w-10/12 sm:text-lg '>
            The fun way to improve your child’s language acquisition. <br></br>
            Let the party begin!
          </Text>
        </View>
        <Login />
        <SlothAnimation bottom='28px' right='36px' />
        <ChickAnimation bottom='-118px' right='36px' />
        <RaccoonAnimation bottom='-106px' left='190px' />
        <Image
          source={require('../assets/images/tiger.svg')}
          style={styles.tiger}
        />
      </View>
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
    bottom: '-90px',
    position: 'absolute',
    height: '130px',
    width: '123px',
    right: '160px',
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
