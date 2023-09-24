import { Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
// import '../styles.css';

const Login = () => {
  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <Pressable onPress={googleAuth}>
        <View className=' p-3  sm:px-10 flex flex-row gap-2 bg-white/15 rounded-md shadow-lg backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'>
          <Image
            className='w-6 h-6 m-0'
            source={{
              uri: 'https://www.svgrepo.com/show/475656/google-color.svg',
            }}
            loading='lazy'
            alt='google logo'
          />
          <Text className='font-bold text-center'>Continue with Google</Text>
        </View>
      </Pressable>
    </>
  );
};

export default Login;
