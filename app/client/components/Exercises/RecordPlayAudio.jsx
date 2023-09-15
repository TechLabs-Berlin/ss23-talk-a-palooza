// import { View, StyleSheet, Text } from 'react-native';
// import { useState } from 'react';
// import { Audio } from 'expo-av';

// const RecordPlayAudio = () => {
//   const [recording, setRecording] = useState();

//   async function startRecording() {
//     try {
//       console.log('Requesting permissions..');
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       console.log('Starting recording..');
//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(recording);
//       console.log('Recording started');
//     } catch (err) {
//       console.error('Failed to start recording', err);
//     }
//   }

//   async function stopRecording() {
//     console.log('Stopping recording..');
//     setRecording(undefined);
//     await recording.stopAndUnloadAsync();
//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: false,
//     });
//     const uri = recording.getURI();
//     console.log('Recording stopped and stored at', uri);
//   }

//   return (
//     <View style={styles.container}>
//       <button
//         style={styles.button}
//         title={recording ? 'Stop Recording' : 'Start Recording'}
//         onClick={recording ? stopRecording : startRecording}
//       >
//         {/* <FontAwesome
//           name={recording ? 'stop-circle' : 'circle'}
//           size={64}
//           color='white'
//         /> */}
//       </button>
//       {/* <Text
//         style={styles.recordingStatusText}
//       >{`Recording status: ${recordingStatus}`}</Text> */}
//     </View>
//   );
// };

// export default RecordPlayAudio;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 128,
//     height: 128,
//     borderRadius: 64,
//     backgroundColor: 'red',
//   },
//   recordingStatusText: {
//     marginTop: 16,
//   },
// });
