import { View, Text } from 'react-native';
import { GreenButton } from '../layouts/Buttons';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../layouts/typo';

const AssessSuccess = ({ child, spokenWords }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('practice');
  };

  return (
    <View className='flex flex-col items-stretch justify-center w-7/12 mx-auto my-auto border border-white rounded-lg shadow-lg flex-nowrap bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 '>
        <View className='flex px-10 pt-10 pb-5 '>
          <Heading
            text={'Thank you,'}
            style={{
              fontSize: '1.875rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
          <Text className='flex items-center justify-center w-full text-base font-bold text-primary-light '>
            We are looking forward to know {child.firstName} !
          </Text>
        </View>
      </View>

      <View className='flex items-center justify-center w-6/12 px-10 pt-4 pb-10 m-auto'>
        <GreenButton
          text={'Start exercises '}
          onPress={handleSubmit}
          spokenWords={spokenWords}
        />
      </View>
    </View>
  );
};

export default AssessSuccess;
