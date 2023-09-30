import { View, Text, Pressable } from 'react-native';
import { Link, Navigate } from 'react-router-dom';

const AssessSuccess = ({ child, spokenWords }) => {
  const handleSubmit = () => {
    Navigate('dashboard');
  };

  return (
    <View>
      <Text>Thank you! We are looking forward to know {child.firstName}</Text>
      <Link to='/practice'>
        <Pressable onPress={handleSubmit} spokenWords={spokenWords}>
          Start Exercises
        </Pressable>
      </Link>
    </View>
  );
};

export default AssessSuccess;
