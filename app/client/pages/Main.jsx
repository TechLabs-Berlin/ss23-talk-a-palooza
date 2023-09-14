import InitialAssessment from '../pages/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { AuthData } from '../services/AuthWrapper';
import { AssessWrapper } from '../services/AssessWrapper';

const Main = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];

  console.log(
    'Is user loggedin?',
    authUser.isAuthenticated,
    '/ Is there children?',
    authUser.children.length
  );

  return !hasChild ? (
    <InitialAssessment authUser={authUser} hasChild={hasChild} />
  ) : (
    <MainMenu hasChild={hasChild} />
  );
};

export default Main;
