import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import { GreenButton, HomeButton } from '../layouts/Buttons';
import { useEffect, useState, useRef } from 'react';
import { DancingBearAnimation, WheelAnimation } from '../layouts/Animations';

const Reward = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [wheelFinished, setWheelFinished] = useState(false);

  useEffect(() => {
    const wheelDuration = 2800;

    // Listen for animation finish event
    const wheelFinishTimeout = setTimeout(() => {
      setWheelFinished(true);
    }, wheelDuration);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(wheelFinishTimeout);
  }, []);

  // Create an Animated.Value for controlling opacity
  const opacityValue = useRef(new Animated.Value(0)).current;

  // Function to start playing the video when the animation finishes
  const startVideoPlayback = () => {
    if (video.current) {
      video.current.playAsync();
    }
  };

  // Use Animated.timing to control opacity transition
  useEffect(() => {
    if (wheelFinished) {
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [wheelFinished, opacityValue]);

  //TODO: import results from Audio Exercise
  return (
    <>
      {wheelFinished ? (
        <View className='flex h-full flex-column'>
          <View className='flex p-4 ml-0 mr-auto '>
            <HomeButton />
          </View>
          <View className='flex flex-col items-stretch justify-center mx-auto flex-nowrap -mt-14'>
            <View className='flex flex-[1_0_auto] m-0'>
              <View className='flex px-5 pt-5 pb-5'>
                <Animated.View style={[styles.row, { opacity: opacityValue }]}>
                  <Video
                    ref={video}
                    style={styles.video}
                    source={require('../../assets/videos/pioupiou.mp4')}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                  />
                </Animated.View>
                <View className='flex flex-row flex-wrap mx-auto mt-6 mb-4 space-x-10'>
                  <GreenButton
                    text={'Play again'}
                    onPress={() => {
                      window.location.href = '/practice';
                    }}
                    background={'text-primary-green'}
                  />
                  <GreenButton
                    text={'Dashboard'}
                    background={'text-primary-green'}
                    onPress={() => {
                      window.location.href = '/dashboard';
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <DancingBearAnimation />
        </View>
      ) : (
        <WheelAnimation />
      )}
    </>
  );
};

export default Reward;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 'auto',
    alignSelf: 'center',
    width: 600,
    alignItems: 'center',
  },

  video: {
    width: 600,
    height: 337,
    borderRadius: 20,
    border: '12px solid rgb(255, 255, 255)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px',
    backgroundColor: 'white',
  },
});
