import LayoutHOC from './LayoutHOC';
import { StyleSheet, Text, View } from 'react-native';
import Lottie from 'react-lottie';
import loadingAnimation from '../../assets/animations/loading';
import bearAnimation from '../../assets/animations/dancingbear';

// Options for the animation
const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const bearOptions = {
  loop: true,
  autoplay: true,
  animationData: bearAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loader = () => {
  //TODO: Add loader animation, center vertically content add background color, and style text
  return (
    <>
      <View className='container flex flex-col items-center justify-center h-full bg-white'>
        <View className='content-center'>
          <Lottie
            options={loadingOptions}
            speed={30}
            height={220}
            width={220}
            style={styles.loading}
          />
          <Lottie
            options={bearOptions}
            speed={30}
            height={220}
            width={220}
            style={styles.loading}
          />
          <Text className='items-center'>Loading...</Text>
        </View>
      </View>
    </>
  );
};
export default LayoutHOC(Loader);

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // left: '0px',
    // top: '-50px',
    // width: '35%',
    // height: '35%',
  },
});
