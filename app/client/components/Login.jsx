import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

const Login = () => {
  const googleAuth = () => {
    window.open('http://localhost:3001/api/auth/google', '_self');
  };

  return (
    <>
      <Pressable onPress={googleAuth}>
        <View
          className='px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'
          // className='bg-blue-500 rounded-md p-4'
        >
          <Image
            className='w-6 h-6'
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            loading='lazy'
            alt='google logo'
          ></Image>
          <Text className=' text-white font-bold text-lg text-center'>
            Login with Google
          </Text>
        </View>
      </Pressable>

      <button
        className='px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'
        onClick={googleAuth}
        style={styles.glassButton}
        name={'Sign In with Google'}
      >
        <span>Login with Google</span>
      </button>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  glassButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '5px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '15px',
  },
});
