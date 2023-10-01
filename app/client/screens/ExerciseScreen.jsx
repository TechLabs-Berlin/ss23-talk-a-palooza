import { ChildData } from '../services/AuthWrapper';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Exercise from '../components/Exercise/Exercise';

const ExerciseScreen = () => {
  const { child } = ChildData();

  return <Exercise child={child} />;
};

export default LayoutHOC(ExerciseScreen);
