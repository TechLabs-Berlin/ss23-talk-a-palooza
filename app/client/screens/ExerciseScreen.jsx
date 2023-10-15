import { ImageBackground } from 'react-native';
import { ChildData } from '../services/AuthWrapper';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Exercise from '../components/exercise/Exercise';

const image = require('../assets/backgrounds/sky3.svg');

const ExerciseScreen = () => {
  const { child } = ChildData();

  return (
    <>
      <ImageBackground
        source={image}
        resizeMode={'cover'}
        loading='lazy'
        style={{ flex: 1, width: '100%', justifyContent: 'center' }}
      >
        <Exercise child={child} />
      </ImageBackground>
    </>
  );
};

export default LayoutHOC(ExerciseScreen);
