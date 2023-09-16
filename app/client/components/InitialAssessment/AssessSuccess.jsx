import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AssessSuccess = (child) => {
  const [formData, setFormData] = useState({
    // Initialize form data
    // ...
  });

  console.log(child);

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
      <Text>Thank you! We are looking forward to know {child.firstName}</Text>
      <Link to='/dashboard'>
        <Button title='Start' onClick={handleSubmit} />
      </Link>
    </View>
  );
};

export default AssessSuccess;
