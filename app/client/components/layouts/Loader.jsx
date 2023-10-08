import LayoutHOC from './LayoutHOC';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const Loader = () => {
  return (
    <View className='container flex flex-col items-center justify-center w-full h-full bg-lightgrey'>
      <View className='content-center'>
        {/* <DotLottiePlayer
          src='https://lottie.host/7c110896-7f90-44a2-8eb0-1c24479156ef/UDUHpWn6oz.lottie'
          style={styles.loading}
          autoplay
          loop
          renderer='svg'
          speed={1}
        ></DotLottiePlayer> */}
        <Image
          source={require('../../assets/images/loadingElephant.gif')}
          style={styles.loading}
          alt='loading'
          loading='lazy'
          className=''
        />
      </View>
    </View>
  );
};
export default LayoutHOC(Loader);

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // left: '0px',
    // top: '250px',
    width: 300,
    height: 300,
  },
});
