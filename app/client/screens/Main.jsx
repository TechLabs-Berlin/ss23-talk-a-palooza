import InitialAssessment from '../screens/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { AuthData } from '../services/AuthWrapper';
import LayoutHOC from '../components/layouts/LayoutHOC';

const Main = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];

  console.log('User registered', authUser.children.length, 'child(ren)');

  return !hasChild ? (
    <InitialAssessment authUser={authUser} hasChild={hasChild} />
  ) : (
    <MainMenu hasChild={hasChild} />
  );
};

export default LayoutHOC(Main);
