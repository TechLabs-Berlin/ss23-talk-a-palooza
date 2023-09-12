import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, Text, View } from 'react-native';
import { getChild } from '../services/childrenService';

const MainMenu = ({ hasChild }) => {
  const [child, setChild] = useState('');

  useEffect(() => {
    getChild(hasChild).then((response) => {
      setChild(response);
    });
  }, []);
  console.log('useEffect', child);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Main</Text>
        <Text style={styles.subtitle}>Hello {child.firstName}</Text>

        <View>
          <Link to='/dashboard'>Dashboard</Link>
        </View>
        <View>
          <Link to='/exercises'>Exercises</Link>
        </View>
        <View>
          <Link to='/mypath'>My own path</Link>
        </View>
      </View>
    </>
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
    // textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '.5em',
    // textAlign: 'center',
  },
});
