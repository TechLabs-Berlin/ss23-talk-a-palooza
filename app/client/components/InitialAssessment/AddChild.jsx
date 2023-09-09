import { StyleSheet, Text, View } from 'react-native';
import ChildForm from './ChildForm';
import ChildrenService from '../../services/childrenService';

const AddChild = ({ authUser }) => {
  const child = authUser.children[0];

  const handleSubmit = async (values, { resetForm }) => {
    const newChild = await ChildrenService.createChild(values, authUser);
    resetForm();
    console.log('Child added:', newChild);
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>InitialAssessment</Text>
      <Text>
        Hi {authUser.displayName}! (
        {child ? 'Child registered' : 'No child assessed yet'})
      </Text>

      <ChildForm onSubmit={handleSubmit} />
    </View>
  );
};

export default AddChild;

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 600,
    maxHeight: 768,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '1em',
    textAlign: 'center',
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
  link: {
    color: '#1977f2',
  },
  listitem: {
    marginVertical: '0.5rem',
  },
  pageLink: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
