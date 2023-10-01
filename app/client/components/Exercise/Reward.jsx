import { ChildData } from '../../services/AuthWrapper';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import { ActionButton, HomeButton, NextButton } from '../navigation/Buttons';
import { useState, useRef } from 'react';

const Reward = () => {
  const { child } = ChildData();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  //TODO: import results from Audio Exercise
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
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
          {/* <View style={styles.buttons}>
            <Pressable
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            >
              <Text>{status.isPlaying ? 'Pause' : 'Play'}</Text>
            </Pressable>
          </View> */}
        </View>
      </View>
      <View className='flex flex-row flex-wrap ml-auto mr-0 space-x-10'>
        <ActionButton text={'Play again'} background={'text-primary-green'} />
        <ActionButton text={'Results'} background={'text-primary-green'} />
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
});
