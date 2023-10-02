import { Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';

const Login = () => {
  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <Pressable
        onPress={googleAuth}
        className=' bg-white p-2 mb-4 rounded-lg shadow-lg justify-center gap-2 sm:px-10 flex flex-row bg-white/15 backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'
      >
        <Image
          className='w-6 h-6 m-0 mt-0'
          source={{
            uri: 'https://www.svgrepo.com/show/475656/google-color.svg',
          }}
          loading='lazy'
          alt='google logo'
        />
        <Text className='text-zinc-500 font-bold text-center text-l mt-4'>
          Sign In with Google
        </Text>
      </Pressable>

      <Pressable className='w-64 mt-20 bg-black rounded-lg shadow-lg sm:px-10 p-2  justify-center gap-2 flex flex-row'>
        <Image
          className=' w-6 h-6  m-0 bg-black'
          source={require('../assets/images/apple-logo.svg')}
        />
        <Text className=" text-white relative font-bold text-center text-l mt-8 font-['SF Pro Display']">
          Sign In with Apple
        </Text>
      </Pressable>
    </>
  );
};

export default Login;
