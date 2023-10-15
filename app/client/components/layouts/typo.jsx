import { Text } from 'react-native';

export const Heading = ({ text, style }) => {
  return (
    <Text
      className='text-3xl font-black leading-7 text-primary-dark sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:leading-10'
      style={style}
    >
      {text}
    </Text>
  );
};

export const DashboardHeading = ({ text, style }) => {
  return (
    <Text
      className='mb-2 text-lg font-semibold text-primary-dark'
      style={style}
    >
      {text}
    </Text>
  );
};
