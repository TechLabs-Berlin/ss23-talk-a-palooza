import InitialAssessment from '../components/InitialAssessment';
import MainMenu from '../components/MainMenu';
import { AuthData } from '../components/auth/AuthWrapper';

const Main = () => {
  const { authUser } = AuthData();
  console.log({ authUser });

  if (authUser.children.length === 0) {
    return <InitialAssessment authUser={authUser} />;
  } else return <MainMenu authUser={authUser} />;
};

export default Main;
