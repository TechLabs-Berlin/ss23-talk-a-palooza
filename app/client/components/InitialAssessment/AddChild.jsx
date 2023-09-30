import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import ChildForm from './ChildForm';
import AddWords from './AddWords';
import { AuthData } from '../../services/AuthWrapper';
import ChildrenService from '../../services/childrenService';

const AddChild = () => {
  const { authUser } = AuthData();
  const [child, setChild] = useState(child);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitChildForm = async (values) => {
    const child = await ChildrenService.createChild(values, authUser);
    setChild(child);
    setIsSubmitted(true);
    console.log('Child added:', child);
  };

  return child && isSubmitted ? (
    <AddWords />
  ) : (
    <ChildForm onSubmit={handleSubmitChildForm} />
  );
};

export default AddChild;
