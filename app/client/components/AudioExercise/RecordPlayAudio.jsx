import { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';

const RecordPlayAudio = (child) => {
  const [recording, setRecording] = useState();
  const [status, setStatus] = useState(`Let's start`);

  // Starts the recording.
  // Request permission from user to use microphone.
  // Todo: Handle Errors.
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
      setStatus('recording');
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // Stops the recording and saves it to database directly in URI
  // Todo: button changes states after at least one recording is made, to "Try again ?"
  // Todo: handle error and text status: "Uhoh, something went wrong. Try again?"
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    setStatus('Excellent!');
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    // Todo: Save the recording in the database here.
    console.log('Recording stopped and stored at', uri);

    // Playing the recording automatically after it is saved
    const playbackObject = new Audio.Sound();
    await playbackObject.loadAsync(uri);
    await playbackObject.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{`${status}`}</Text>
      <View style={styles.exerciseBloc}>
        <Image
          source={require('../../assets/images/banana.jpg')}
          style={styles.banana}
        />
        <Pressable
          style={styles.button}
          title={recording ? 'Stop Recording' : 'Start Recording'}
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

        <Text>BANANA</Text>
      </View>
    </View>
  );
};

export default RecordPlayAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  exerciseBloc: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  image: {
    width: 100,
    height: 100,
  },
  banana: {
    width: 400,
    height: 317,
  },
  statusText: {
    fontSize: '1.5rem',
    marginTop: '1em',
    marginBottom: '2em',
    textAlign: 'center',
  },
});
