import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';
import {
  uriToBase64,
  saveRecording,
  sendAudioToDL,
} from '../../../services/recordingService';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import animationData from '../../../assets/animations/check';
import { GreenButton } from '../../navigation/Buttons';

const STATUSES = {
  START: 'Tap the mic to talk',
  RECORDING: 'Recording...',
  PLAYING: 'Playing...',
  FINISHED: 'Playback finished',
  NOTRECOGNIZED: 'Sorry we could not recognize it',
  RECOGNIZED: 'Bravo!',
};

const RecordPlayAudio = ({ child, word, flex, onAudioRecognized }) => {
  const [recording, setRecording] = useState();
  const [status, setStatus] = useState(`Let's start`);
  const [base64Recording, setBase64Recording] = useState('');
  const [isPlaybackFinished, setIsPlaybackFinished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isRecognized, setIsRecognized] = useState(false);

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
      const dataToSend = {
        base64Recording,
        wordBankId: word.wordBankId,
        name: word.name,
      };

      //[x] Send the Data to DL and get a response back
      const response = await sendAudioToDL(dataToSend);
      // callback to update the Exercise component when audio is recognized
      const bravo = response.data.is_recognized;
      if (bravo === true) {
        onAudioRecognized(word);
        setIsSaved(true);
        setIsRecognized(true);
        setStatus(
          'Bravo! ' +
            Math.round(response.data.intelligibilityScore * 100).toString() +
            '% intelligible'
        );
      } else {
        setIsSaved(true);
        setIsRecognized(false);
        setStatus(STATUSES.NOTRECOGNIZED);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const resetRecording = () => {
    setRecording(undefined);
    setStatus(STATUSES.START);
    setIsPlaybackFinished(false);
    setIsSaved(false);
  };

  // Options for the animation
  const checkOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // TODO: Refactor view controls in AudioControls component
  return (
    <>
      <View clasName='mx-10' style={[styles.container, { flex }]}>
        <View className='exerciseBloc'>
          <View style={styles.exerciseBloc}>
            <Text className='mt-0 text-sm font-normal text-center text-gray-500 lg:w-10/12 sm:text-lg'>
              Try saying
            </Text>
            <Text className='text-2xl font-black leading-7 text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary-dark md:leading-10'>
              {word.name}
            </Text>

            <View style={styles.mainImage}>
              <Image
                source={
                  word.image
                    ? { uri: require(`../../../assets/images/${word.image}`) }
                    : require('../../../assets/images/placeholder.svg')
                }
                style={styles.banana}
                contentFit='center'
                transition={1000}
              />
            </View>
            <View style={styles.controls}>
              <Pressable
                style={[
                  styles.button,
                  isRecognized
                    ? styles.buttonAnimated // Apply disabled styles
                    : null,
                ]}
                onPress={recording ? stopRecording : startRecording}
                className='mt-5 text-sm font-normal text-center text-gray-500 sm:mt-10 lg:w-10/12 sm:text-lg'
                disabled={isRecognized}
              >
                {recording ? (
                  <Image
                    source={require('../../../assets/images/voiceLoading.gif')}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/recordingIcon.gif')}
                    style={styles.image}
                  />
                )}
              </Pressable>
              {isSaved && isRecognized && (
                <DotLottiePlayer
                  src='https://lottie.host/830dd5b9-c968-4085-ba1b-c1a5eea39310/QzGRkjql82.lottie'
                  // background='transparent'
                  // speed='1'
                  style={styles.check}
                  autoplay
                  renderer='svg'
                  speed={1.5}
                >
                  {/* <Controls /> */}
                </DotLottiePlayer>
              )}
              {isPlaybackFinished && base64Recording ? (
                <>
                  {isSaved ? (
                    <Text className='-mt-10 font-bold text-center text-primary-dark text-l'>{`${status}`}</Text>
                  ) : (
                    // TODO: change wording "Save and Continue" to "Try, or measure or ..."
                    <GreenButton
                      text='Save and Continue'
                      onPress={saveAndContinue}
                    />
                  )}
                  {isSaved && !isRecognized && (
                    <GreenButton
                      style={{ margin: '20px!important' }}
                      text='Try Again?'
                      onPress={resetRecording}
                    />
                  )}
                </>
              ) : (
                <Text className='font-bold text-center text-primary-dark text-l'>{`${status}`}</Text>
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
  buttonAnimated: {
    // backgroundColor: '#DDD', // Change the background color to indicate it's disabled
    //  opacity: 0, // Reduce opacity to visually indicate it's disabled
    display: 'none',
  },
  check: {
    marginTop: -83,
    width: 220,
    height: 220,
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
