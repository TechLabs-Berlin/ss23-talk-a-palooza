import { ChildData } from '../../services/AuthWrapper';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import { HomeButton, NextButton } from '../navigation/Buttons';
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
      <View className='flex flex-wrap space-x-10 flex-row mr-0 ml-auto'>
        <Pressable>
          <View className=' p-3  sm:px-10 flex flex-row gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'>
            <Text className='font-bold text-center'>Play again</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className=' p-3  sm:px-10 flex flex-row gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'>
            <Text className='font-bold text-center'>Results</Text>
          </View>
        </Pressable>
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
    borderRadius: '50%',
  },
});
