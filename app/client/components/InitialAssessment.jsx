import { StyleSheet, Text, View } from 'react-native';

const InitialAssessment = ({ authUser }) => {
  return (
    <View style={styles.app}>
      <Text style={styles.title}>InitialAssessment</Text>
      <Text>
        Hi {authUser.displayName}! (
        {authUser.children[0] ? 'Child registered' : 'No child assessed yet'})
      </Text>
    </View>
  );
};

export default InitialAssessment;

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 1028,
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
