import { View, Text, Pressable } from 'react-native';
import { Link, Navigate } from 'react-router-dom';
import { GreenButton } from '../navigation/Buttons';
import { useNavigate } from 'react-router-dom';

const AssessSuccess = ({ child, spokenWords }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('practice');
  };

  return (
    <View className=' flex flex-nowrap flex-col  justify-center items-stretch my-auto mx-auto  w-7/12 shadow-lg rounded-lg border border-white bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 '>
        <View className='flex px-10 pt-10 pb-5 '>
          <Text className="flex rgb(95 114 166) w-full items-center justify-center  text-3xl font-black  text-primary-dark font-['Oleo Script']">
            Thank you,
          </Text>
          <Text className='flex font-bold w-full items-center justify-center text-primary-light text-base '>
            We are looking forward to know {child.firstName} !
          </Text>
        </View>
      </View>

      <View className='flex px-10 pb-10 pt-4 justify-center items-center m-auto w-6/12'>
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
