import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';
import {
  uriToBase64,
  saveRecording,
  sendAudioToDL,
} from '../../services/recordingService';
import { SpokenWords } from '../../../server/models/vocabLog';

const STATUSES = {
  START: "Let's start! Tap the mic to talk",
  RECORDING: 'Recording...',
  PLAYING: 'Playing...',
  FINISHED: 'Playback finished',
};

const RecordPlayAudio = ({ child, word, flex }) => {
  const [recording, setRecording] = useState();
  const [status, setStatus] = useState(`Let's start`);
  const [base64Recording, setBase64Recording] = useState('');
  const [isPlaybackFinished, setIsPlaybackFinished] = useState(false);

  // Checks if the playback has finished, and updates the status accordingly.
  useEffect(() => {
    if (isPlaybackFinished) {
      setStatus(STATUSES.FINISHED);
    }
  }, [isPlaybackFinished]);

  // Request permission from user to use microphone and then starts recording.
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        // allowsRecordingIOS: true,
        // playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setStatus(STATUSES.RECORDING);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // Stops the recording, convert uri to base64, and plays the recording back.
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    setStatus(STATUSES.PLAYING);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and available at', uri);

    try {
      const base64String = await uriToBase64(uri);
      console.log('Base64 String:', base64String);
      setBase64Recording(base64String);
    } catch (error) {
      console.error('Error:', error);
    }

    // Playing the recording automatically, and detect when it's finished playing
    const playbackObject = new Audio.Sound();
    await playbackObject.loadAsync(uri);
    playbackObject.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaybackFinished(true);
      }
    });

    await playbackObject.playAsync();
  }
  // After playing back, offers to save and continue.
  async function saveAndContinue() {
    try {
      // if saving to BE
      const dataToSend = {
        base64Recording,
        wordBankId: word.wordBankId, // TODO: Replace with actual wordBankId
        name: word.name,
      };
      console.log('child:', child);
      console.log('word:', word);
      console.log('Data to send:', dataToSend);

      const response = await saveRecording(dataToSend);
      // if sending to DL server
      // const response = await sendAudioToDL(dataToSend);

      if (response.success) {
        // TODO: Implement button interaction feedback (e.g. disable button) + animation.
      } else {
        console.error('Failed to save recording in the database');
      }
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  }

  // TODO: Refactor view controls in AudioControls component
  return (
    <>
      <View clasName='mx-10' style={[styles.container, { flex }]}>
        <View className='exerciseBloc'>
          <View style={styles.exerciseBloc}>
            <Text className='mt-0 sm:mt-10 lg:w-10/12 text-gray-500 font-normal text-center text-sm sm:text-lg'>
              Try saying
            </Text>
            <Text className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
              {word.name}
            </Text>
            <View style={styles.mainImage}>
              <Image
                source={
                  word.image
                    ? { uri: require(`../../assets/images/${word.image}`) }
                    : require('../../assets/images/placeholder.svg')
                }
                style={styles.banana}
                contentFit='center'
                transition={1000}
              />
            </View>
            <View style={styles.controls}>
              <Pressable
                style={styles.button}
                onPress={recording ? stopRecording : startRecording}
                className='mt-5 sm:mt-10 lg:w-10/12 text-gray-500 font-normal text-center text-sm sm:text-lg'
              >
                {recording ? (
                  <Image
                    source={require('../../assets/images/voiceLoading.gif')}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/recordingIcon.gif')}
                    style={styles.image}
                  />
                )}
              </Pressable>
              {isPlaybackFinished && base64Recording ? (
                <Pressable style={styles.save} onPress={saveAndContinue}>
                  <Text>Save and Continue</Text>
                </Pressable>
              ) : (
                <Text>{`${status}`}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default RecordPlayAudio;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // margin: '0px 40px 0px 40px',
  },
  controls: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  save: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: -60,
  },
  exerciseBloc: {
    alignItems: 'center',
    flex: '1' /* Make items grow to fill available space */,
    padding: '40px',
    paddingTop: '0px',
    textAlign: 'center',
  },
  mainImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    width: 220,
  },
  banana: {
    width: '80%',
    height: '80%',
    maxHeight: '100%',
    maxWidth: '100%',
    flex: 1,
    width: 230,
    //  borderRadius: '50%',
  },
  title: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },
});
