import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import ChildForm from './ChildForm';
import AddWords from './AddWords';
import ChildrenService from '../../services/childrenService';

const AddChild = ({ authUser }) => {
  const [child, setChild] = useState(child);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitChildForm = async (values) => {
    const child = await ChildrenService.createChild(values, authUser);
    setChild(child);
    setIsSubmitted(true);
    console.log('Child added:', child);
  };

  return isSubmitted ? (
    <AddWords child={child} />
  ) : (
    <ChildForm onSubmit={handleSubmitChildForm} authUser={authUser} />
  );
};

export default AddChild;
