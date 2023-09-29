import { AuthData } from '../../services/AuthWrapper';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { HomeButton, NextButton } from '../navigation/Buttons';

const Reward = ({}) => {
  const { authUser, child } = AuthData();
  return (
    <View>
      <Text>Reward Page</Text>
      {/* Render intelligibility scores here */}
    </View>
  );
};

export default Reward;
