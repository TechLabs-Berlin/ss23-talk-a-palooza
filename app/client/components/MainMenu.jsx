import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, Text, View } from 'react-native';
import { getChild } from '../services/childrenService';
import AddWords from './InitialAssessment/AddWords';

const MainMenu = ({ hasChild }) => {
  const [child, setChild] = useState(hasChild);

  useEffect(() => {
    getChild(hasChild).then((child) => {
      setChild(child);
    });
  }, []);

  const isAssessed = child.vocabLogs && child.vocabLogs.length > 0;
  console.log('Child been assessed?', isAssessed);

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
