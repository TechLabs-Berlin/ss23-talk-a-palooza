import AddChild from '../components/InitialAssessment/AddChild';
import AddWords from '../components/InitialAssessment/AddWords';
import { AuthData } from '../services/AuthWrapper';
import { AssessWrapper } from '../services/AssessWrapper';
import { getChild } from '../services/childrenService';

const InitialAssessment = () => {
  const { authUser } = AuthData();
  const child = authUser.children[0];

  console.log(
    '/ Is there children?',
    authUser.children.length,
    '/Is child assessed?'
    //  assessChild.isAssessed
  );

  return !child ? (
    <AddChild authUser={authUser} />
  ) : (
    <AssessWrapper>
      <AddWords child={child} />
    </AssessWrapper>
  );
};

export default InitialAssessment;
