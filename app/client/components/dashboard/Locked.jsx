import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';
import { PrevButton, GreenButton } from '../navigation/Buttons';

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
      <View className='container flex items-center justify-center m-auto mt-20 sm:py-24 w-5/12 shadow-lg px-5 py-10 rounded-lg border border-beige bg-beigeTrans'>
        {showQuestion && (
          <>
            <Text
              className="flex text-primary-dark text-3xl my-5 font-black font-['Oleo Script']"
              style={styles.title}
            >
              How much is 5 + 6 ?
            </Text>
            <View className='flex flex-row'>
              <GreenButton onPress={() => handleAnswerClick(11)} text={'11'} />
              <GreenButton onPress={() => handleAnswerClick(18)} text={'18'} />
              <GreenButton onPress={() => handleAnswerClick(14)} text={'14'} />
            </View>
          </>
        )}
        {showResult && (
          //TODO: Style this
          <View className={'flex flex-column'}>
            <Text>Incorrect,</Text>
            <GreenButton onPress={handleTryAgain} text={'Try Again'} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Locked;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    width: '120px',
    marginRight: '1em',
  },
  link: {
    color: '#1977f2',
  },
  listitem: {
    marginVertical: '0.5rem',
  },
  pageLink: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
