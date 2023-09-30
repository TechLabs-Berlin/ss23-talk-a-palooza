import { Link } from 'react-router-dom';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ChildData } from '../services/AuthWrapper';
import AddWords from './InitialAssessment/AddWords';

const imageMain = require('../assets/images/main.svg');
const imageAssess = require('../assets/images/giveheart.svg');

const MainMenu = () => {
  const { child } = ChildData();

  const isAssessed = child.vocabLogs && child.vocabLogs.length > 0;
  console.log('Child been assessed?', isAssessed);

  return isAssessed ? (
    <ImageBackground
      source={imageMain}
      resizeMode={'cover'}
      loading='lazy'
      style={{ flex: 1, width: '100%', justifyContent: 'center' }}
    >
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
    </ImageBackground>
  ) : (
    <ImageBackground
      source={imageAssess}
      resizeMode={'cover'}
      loading='lazy'
      style={{ flex: 1, width: '100%', justifyContent: 'center' }}
    >
      <AddWords child={child} />
    </ImageBackground>
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
