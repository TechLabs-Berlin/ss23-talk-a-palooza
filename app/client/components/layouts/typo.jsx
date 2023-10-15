import { Text } from 'react-native';

export const Heading = ({ text, style }) => {
  return (
    <Text
      className='text-3xl font-black leading-7 text-primary-dark sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:leading-10}'
      style={style}
    >
      {text}
    </Text>
  );
};

// //Main Menu
// <Text className='text-primary-dark text-2xl font-bold no-underline font-["Oleo Script"]'>
//   Can you say...
// </Text>;
// <Text className='text-primary-dark text-2xl font-bold font-["Oleo Script"]'>
//   Catalog
// </Text>;

// // Locked
// <Text
//   className="flex my-5 text-primary-dark text-3xl  font-black font-['Oleo Script']"
//   style={styles.title}
// >
//   How much is 5 + 6 ?
// </Text>;

// //AssessForm
// <Text className='flex rgb(95 114 166) text-3xl w-8/12 font-black  text-primary-dark font-["Oleo Script"]'>
//   {child.firstName} can say...
// </Text>;

// //AssessSuccess
// //decomponse in two views
// <Text className="flex rgb(95 114 166) w-full items-center justify-center  text-3xl font-black  text-primary-dark font-['Oleo Script']">
//   Thank you,
// </Text>;

// //ChildForm
// <Text className="flex rgb(95 114 166) text-3xl font-black  text-primary-dark w-8/12 font-['Oleo Script']">
//   Welcome {authUser.firstName}
// </Text>;
