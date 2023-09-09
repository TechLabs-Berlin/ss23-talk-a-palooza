import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <View>
      <button onClick={googleAuth}>Get Started</button>
    </View>
  );
};

export default Login;
