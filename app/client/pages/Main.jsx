import InitialAssessment from '../pages/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { AuthData } from '../services/AuthWrapper';

const Main = () => {
  const { authUser } = AuthData();
  const hasChild = authUser.children[0];

  console.log(
    'Is user loggedin?',
    authUser.isAuthenticated,
    '/ Is there children?',
    authUser.children.length
  );

  if (!hasChild) {
    return <InitialAssessment authUser={authUser} hasChild={hasChild} />;
  } else return <MainMenu hasChild={hasChild} />;
};

export default Main;
