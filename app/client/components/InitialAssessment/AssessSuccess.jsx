import { View, Text, Pressable } from 'react-native';
import { Link, Navigate } from 'react-router-dom';
import { GreenButton } from '../navigation/Buttons';

const AssessSuccess = ({ child, spokenWords }) => {
  const handleSubmit = () => {
    Navigate('practice');
  };

  return (
    <View className=' flex flex-nowrap flex-col  justify-center items-stretch mt-20 mx-auto  w-7/12 shadow-lg rounded-lg border border-white bg-beigeTrans'>
      <View className='flex flex-[1_0_auto] m-0 border-b border-slate-200'>
        <View className='flex px-10 pt-10 pb-5'>
          <Text className="flex rgb(95 114 166) text-xl font-black  text-primary-dark w-8/12 font-['Oleo Script']">
            Thank you! We are looking forward to know {child.firstName}
          </Text>
          <Link to='/practice'>
            <GreenButton
              title='Let"start !'
              onPress={handleSubmit}
              spokenWords={spokenWords}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default AssessSuccess;
