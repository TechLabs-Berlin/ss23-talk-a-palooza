import { Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { AppleButton, GoogleButton } from './navigation/Buttons';

const Login = () => {
  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <GoogleButton onPress={googleAuth} />
      <AppleButton />
    </>
  );
};

export default Login;
