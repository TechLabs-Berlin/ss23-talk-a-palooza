import AddChild from '../components/InitialAssessment/AddChild';
import AddWords from '../components/InitialAssessment/AddWords';
import { AuthData } from '../services/AuthWrapper';
import { getChild } from '../services/childrenService';

const InitialAssessment = () => {
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
    return <AddChild authUser={authUser} />;
  } else return <AddWords hasChild={hasChild} />;
};

export default InitialAssessment;
