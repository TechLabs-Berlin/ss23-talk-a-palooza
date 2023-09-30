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
        className=' bg-white p-2 rounded-lg shadow-lg justify-center gap-2 sm:px-10 flex flex-row bg-white/15 backdrop-blur-sm border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'
      >
        <Image
          className='w-6 h-6 m-0'
          source={{
            uri: 'https://www.svgrepo.com/show/475656/google-color.svg',
          }}
          loading='lazy'
          alt='google logo'
        />
        <Text className='text-zinc-500 font-bold text-center text-l'>
          Sign In with Google
        </Text>
      </Pressable>
    </>
  );
};

export default Login;
