import { Link } from 'react-router-dom';
import { StyleSheet, Text, View } from 'react-native';
import AddWords from './InitialAssessment/AddWords';
import { ChildData } from '../services/AuthWrapper';

const MainMenu = () => {
  const { child } = ChildData();

  const isAssessed = child.vocabLogs && child.vocabLogs.length > 0;
  console.log(`${child.firstName} has been assessed?`, isAssessed);

  return isAssessed ? (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <Text style={styles.subtitle}>Hello {child.firstName}</Text>

      <View>
        <Link to='/dashboard'>Dashboard</Link>
      </View>
      <View>
        <Link to='/practice'>Exercises</Link>
      </View>
      <View>
        <Link to='/mypath'>My own path</Link>
      </View>
    </View>
  ) : (
    <AddWords child={child} />
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginTop: '1em',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '.5em',
  },
});
