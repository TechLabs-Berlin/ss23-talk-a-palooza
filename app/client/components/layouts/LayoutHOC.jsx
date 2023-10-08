import { StyleSheet, View } from 'react-native';

const LayoutHOC = (WrappedComponent) => {
  function WrapperComponent(props) {
    return (
      <>
        <View
          style={styles.container}
          className=' relative mx-auto border-gray-100 border-[4px] rounded-[2.5rem] w-[1024px] max-h-[708px] md:w-[1024px] md:max-h-[708px]'
        >
          <View className='w-[15px] h-[15px] bg-gray-500 absolute left-[50%] top-[20px] z-10 rounded-full'></View>
          <View className='w-[46px] h-[4px] bg-gray-100 absolute left-[50px] -top-[7px] rounded-l-lg'></View>
          <View className='w-[68px] h-[4px] bg-gray-100 absolute left-[130px] -top-[7px] rounded-l-lg'></View>
          <View className='w-[68px] h-[4px] bg-gray-100 absolute left-[208px] -top-[7px] rounded-l-lg'></View>
          <View className='w-[64px] h-[4px] bg-gray-100 absolute right-[50px] top-[687px] rounded-r-lg'></View>
          <View className='py-14 px-8 bg-gray-900 rounded-[2rem] overflow-hidden w-[1016px] h-[684px]'>
            <View className='flex justify-between w-full h-full'>
              <WrappedComponent {...props} />
            </View>
          </View>
        </View>
      </>
    );
  }
  return WrapperComponent;
};

const styles = StyleSheet.create({
  container: {
    backgroundImage: 'linear-gradient(180deg, #e7f1fc 0%, #fff 70%)',
    // maxHeight: '768px',
    justifyContent: 'center',
  },
});

export default LayoutHOC;
