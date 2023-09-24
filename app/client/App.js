import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthWrapper } from './services/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <View
      className='shadow-2xl flex max-h-100 flex-1 p-10 items-center justify-center rounded-xl border-8 border-solid border-black'
      style={styles.container}
    >
      <BrowserRouter>
        <AuthWrapper />
        <Text></Text>
        <StatusBar style='auto' />
      </BrowserRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: 'linear-gradient(180deg, #7ec8d6 0%, #fff 50%)',
  },
});
