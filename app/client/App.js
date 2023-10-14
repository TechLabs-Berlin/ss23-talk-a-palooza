import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { AuthWrapper } from './services/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <BrowserRouter>
      <AuthWrapper />
      <Text></Text>
      <StatusBar style='auto' />
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: 'linear-gradient(180deg, #e7f1fc 0%, #fff 70%)',
    // maxHeight: '768px',
    justifyContent: 'center',
  },
});
