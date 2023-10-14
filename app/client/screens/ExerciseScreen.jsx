import { View } from 'react-native';
import { ChildData } from '../services/AuthWrapper';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Exercise from '../components/exercise/Exercise';
import { SkyBackground } from '../components/layouts/Backgrounds';

const ExerciseScreen = () => {
  const { child } = ChildData();

  return (
    <>
      <View className='flex justify-between w-full h-full bg-lightgrey'>
        <SkyBackground />
        <Exercise child={child} />
      </View>
    </>
  );
};

export default LayoutHOC(ExerciseScreen);
