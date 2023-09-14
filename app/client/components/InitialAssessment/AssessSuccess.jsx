import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AssessSuccess = (handleWordsSubmit) => {
  const [formData, setFormData] = useState({
    // Initialize your form data
    // ...
  });

  console.log(
    'Check if we are capturing the initial Assessment data to be sent to DS',
    formData
  );

  //   const handleSubmit = async () => {
  //     try {
  //       const response = await axios.post(
  //         'http://your-python-server/api/endpoint',
  //         formData
  //       );
  //       if (response.data.success) {
  //         navigation.navigate('Dashboard'); // Replace 'Main' with your desired screen name
  //       } else {
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  // temporary until setting up DS server and/or fake json API.
  const handleSubmit = () => {
    Navigate('dashboard');
  };

  return (
    <View>
      <Text>AssessSuccess</Text>
      <Link to='/dashboard'>
        <Button title='Submit' onClick={handleSubmit} />
      </Link>
    </View>
  );
};

export default AssessSuccess;
