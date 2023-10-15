import { useState } from 'react';
import { View } from 'react-native';
import { PrevButton, GreenButton } from '../layouts/Buttons';
import { Heading } from '../layouts/typo';

const Locked = ({ onUnlocked }) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer) => {
    if (answer === 11) {
      onUnlocked();
    } else {
      setShowQuestion(false);
      setShowResult(true);
    }
  };

  const handleTryAgain = () => {
    setShowQuestion(true);
    setShowResult(false);
  };

  return (
    <View className='flex flex-column'>
      <View className='flex p-4 ml-0 mr-auto '>
        <PrevButton />
      </View>
      <View className='container flex items-center justify-center w-5/12 px-5 py-16 m-auto mt-20 border rounded-lg shadow-lg border-beige bg-beigeTrans'>
        {showQuestion && (
          <>
            <Heading
              text={'How much is 5 + 6 ?'}
              style={{ fontSize: 30, fontWeight: 700 }}
            />
            <View className='flex flex-row mt-5'>
              {[11, 18, 14].map((value) => (
                <GreenButton
                  key={value}
                  onPress={() => handleAnswerClick(value)}
                  text={value.toString()}
                />
              ))}
            </View>
          </>
        )}
        {showResult && (
          <>
            <Heading
              text={'Incorrect!'}
              style={{ fontSize: 30, fontWeight: 700 }}
            />
            <View className='flex items-center justify-center mt-5 -ml-2'>
              <GreenButton onPress={handleTryAgain} text={'Try Again'} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Locked;
