import AddChild from '../components/InitialAssessment/AddChild';
import AddWords from '../components/InitialAssessment/AddWords';
import { AuthData, ChildData } from '../services/AuthWrapper';
import { AssessWrapper } from '../services/AssessWrapper';

const InitialAssessment = () => {
  const { authUser } = AuthData();
  const { child } = ChildData();

  return !child ? (
    <AddChild authUser={authUser} />
  ) : (
    <AssessWrapper>
      <AddWords child={child} />
    </AssessWrapper>
  );
};

export default InitialAssessment;
