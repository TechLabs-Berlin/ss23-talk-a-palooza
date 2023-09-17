import { View, Text, Pressable } from 'react-native';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <View>
      <Pressable onPress={goBack}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
};

export default BackButton;
