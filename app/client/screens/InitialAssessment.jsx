import AddChild from '../components/InitialAssessment/AddChild';
import AddWords from '../components/InitialAssessment/AddWords';
import { AuthData } from '../services/AuthWrapper';
import { AssessWrapper } from '../services/AssessWrapper';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import { useEffect, useRef } from 'react';

const image = require('../assets/backgrounds/giveheart.svg');

const InitialAssessment = () => {
  const { authUser } = AuthData();
  const child = authUser.children[0];
  const animatedValue = new Animated.Value(0);

  console.log(
    '/ Is there children?',
    authUser.children.length,
    '/Is child assessed?'
    //  assessChild.isAssessed
  );

  return (
    <>
      <View className='flex justify-between w-full h-full bg-slate-50'>
        <Image
          source={image}
          resizeMode={'cover'}
          loading='lazy'
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            // opacity: 0.7,
            height: '100%',
            position: 'absolute',
          }}
        />
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
