import { ChildData } from '../../services/AuthWrapper';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import { ActionButton, HomeButton } from '../navigation/Buttons';
import { useEffect, useState, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/rewardWheel';

const Reward = () => {
  const { child } = ChildData();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [wheelFinished, setWheelFinished] = useState(false);

  // Options for the animation
  const wheelOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    const wheelDuration = 3000;

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
      <View style={styles.container}>
        {wheelFinished ? (
          <Animated.View style={[styles.row, { opacity: opacityValue }]}>
            <Video
              ref={video}
              style={styles.video}
              source={require('../../assets/videos/piou.mp4')}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </Animated.View>
        ) : (
          <Lottie
            options={wheelOptions}
            height={200}
            width={200}
            style={styles.wheel}
            isStopped={wheelFinished}
            // eventListeners={[
            //   {
            //     eventName: 'complete',
            //     callback: () => startVideoPlayback(),
            //   },
            // ]}
          />
        )}
        <View className='flex flex-row flex-wrap ml-auto mr-0 space-x-10'>
          <ActionButton text={'Play again'} background={'text-primary-green'} />
          <ActionButton text={'Results'} background={'text-primary-green'} />
        </View>
      </View>
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
    justifyContent: 'space-between', // Space exercises evenly
    flexWrap: 'wrap', // Allow wrapping into multiple rows if needed
  },
  video: {
    alignSelf: 'center',
    width: 640,
    height: 400,
    position: 'relative',
  },
  wheel: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    position: 'relative',
  },
});
