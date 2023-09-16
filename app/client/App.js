import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthWrapper } from './services/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <View style={styles.container}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    maxHeight: 680,
  },
});
