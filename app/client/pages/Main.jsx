import InitialAssessment from '../components/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { AuthData } from '../services/AuthWrapper';

const Main = () => {
  const { authUser } = AuthData();
  // Get the ID of the first child of the current user
  const child = authUser.children[0];

  console.log(
    'Is user loggedin?',
    authUser.isAuthenticated,
    '/ Is there children?',
    authUser.children.length
  );

  if (!child) {
    return <InitialAssessment authUser={authUser} />;
  } else return <MainMenu child={child} />;
};

export default Main;
