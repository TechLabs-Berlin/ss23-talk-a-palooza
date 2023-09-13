import InitialAssessment from '../pages/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';

const Main = () => {
  const { authUser } = AuthData();
  // Get the ID of the first child of the current user
  const hasChild = authUser.children[0];

  console.log(
    'Is user loggedin?',
    authUser.isAuthenticated,
    '/ Is there children?',
    authUser.children.length
  );

  if (!hasChild) {
    return <InitialAssessment authUser={authUser} />;
  } else return <MainMenu hasChild={hasChild} />;
};

export default Main;
