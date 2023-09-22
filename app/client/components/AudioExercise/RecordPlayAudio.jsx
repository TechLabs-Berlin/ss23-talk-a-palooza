import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';
import BackButton from '../navigation/BackButton';
import {
  uriToBase64,
  saveRecording,
  sendAudioToDL,
} from '../../services/recordingService';
import ExerciseBloc from './exerciseBloc';
import { SpokenWords } from '../../../server/models/vocabLog';

const STATUSES = {
  START: "Let's start",
  RECORDING: 'Recording...',
  PLAYING: 'Playing...',
  FINISHED: 'Playback finished',
};

const RecordPlayAudio = ({ child, word }) => {
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
        wordBank: '650d2691df78bbefe5a91340', // TODO: Replace with actual wordBankId
      };

      const response = await saveRecording(dataToSend);
      // if sending to DL server
      // const response = await sendAudioToDL(dataToSend);

      if (response.success) {
        // TODO: Implement navigation logic to continue to the next exercise
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
      <View style={styles.container}>
        <BackButton />
        <ExerciseBloc word={word} />
        <View style={styles.controls}>
          <Pressable
            style={styles.button}
            onPress={recording ? stopRecording : startRecording}
          >
            {recording ? (
              <Image
                source={require('../../assets/images/voiceLoading.gif')}
                style={styles.image}
              />
            ) : (
              <Image
                source={require('../../assets/images/recordingIcon.png')}
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
    </>
  );
};

export default RecordPlayAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
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
  },
});
