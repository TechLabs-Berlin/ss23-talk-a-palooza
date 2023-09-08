import { Link } from 'react-router-dom';
import { StyleSheet, Text, View } from 'react-native';

const Main = ({ child }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <Text style={styles.subtitle}>Hello {child}</Text>
      <View>
        <Text>My own path</Text>
      </View>
      <View>
        <Text>Catalog</Text>
      </View>
      <View>
        <Link to='/dashboard'>Dashboard</Link>
      </View>
    </View>
  );
};

export default Main;

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
    // textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '.5em',
    // textAlign: 'center',
  },
});
