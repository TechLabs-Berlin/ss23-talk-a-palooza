import LayoutHOC from './LayoutHOC';
import { StyleSheet, View, Image } from 'react-native';

const Loader = () => {
  return (
    <View className='container flex flex-col items-center justify-center bg-[#F1F1F0] w-full h-full  '>
      <View className='content-center'>
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
