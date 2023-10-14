import { View } from 'react-native';

import { AuthData } from '../services/AuthWrapper';
import { AssessWrapper } from '../services/AssessWrapper';
import AddChild from '../components/initial-assessment/AddChild';
import AddWords from '../components/initial-assessment/AddWords';
import { GiveHeartBackground } from '../components/layouts/Backgrounds';

const InitialAssessment = () => {
  const { authUser } = AuthData();
  const child = authUser.children[0];

  return (
    <>
      <View className='flex justify-between w-full h-full bg-lightgrey'>
        <GiveHeartBackground />

        {!child ? (
          <AddChild authUser={authUser} />
        ) : (
          <AssessWrapper>
            <AddWords child={child} />
          </AssessWrapper>
        )}
      </View>
    </>
  );
};

export default InitialAssessment;
