import { View, Text, Button } from 'react-native';
import { Link, Navigate } from 'react-router-dom';
import { ChildData } from '../../services/AuthWrapper';

const AssessSuccess = ({ spokenWords }) => {
  const { child } = ChildData();
  const handleSubmit = () => {
    Navigate('dashboard');
  };

  return (
    <View>
      <Text>Thank you! We are looking forward to know {child.firstName}</Text>
      <Link to='/practice'>
        <Button
          title='Start Exercises'
          onClick={handleSubmit}
          spokenWords={spokenWords}
        />
      </Link>
    </View>
  );
};

export default AssessSuccess;
