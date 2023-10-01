import { StyleSheet, View } from 'react-native';

const LayoutHOC = (WrappedComponent) => {
  function WrapperComponent(props) {
    return (
      <>
        <View
          style={styles.container}
          className=' relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] w-[1024px] max-h-[708px] md:w-[1024px] md:max-h-[708px]'
        >
          <View className='w-[46px] h-[4px] bg-gray-800 dark:bg-gray-800 absolute left-[50px] -top-[18px] rounded-l-lg'></View>
          <View className='w-[68px] h-[6px] bg-gray-800 dark:bg-gray-800 absolute left-[130px] -top-[18px] rounded-l-lg'></View>
          <View className='w-[68px] h-[6px] bg-gray-800 dark:bg-gray-800 absolute left-[208px] -top-[18px] rounded-l-lg'></View>
          <View className='w-[64px] h-[4px] bg-gray-800 dark:bg-gray-800 absolute right-[50px] top-[693px] rounded-r-lg'></View>
          <View className='rounded-[2rem] overflow-hidden w-[998px] h-[684px]  bg-white dark:bg-gray-800'>
            <WrappedComponent {...props} />
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
