import InitialAssessment from '../screens/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { ChildData } from '../services/AuthWrapper';

const Main = () => {
  const { child } = ChildData();

  return child ? <MainMenu /> : <InitialAssessment />;
};

export default Main;
