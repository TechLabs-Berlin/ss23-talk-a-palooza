import { ChildData } from '../services/AuthWrapper';

import Exercise from '../components/Exercise/Exercise';

const ExerciseScreen = () => {
  const { child } = ChildData();

  return <Exercise child={child} />;
};

export default ExerciseScreen;
