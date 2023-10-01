import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import { AuthData, ChildData } from '../../services/AuthWrapper';
import { ActionButton } from '../navigation/Buttons';

const Navbar = () => {
  const { authUser } = AuthData();

  const logout = () => {
    window.open('http://localhost:3001/api/auth/logout', '_self');
  };

  return (
    <>
      <View className='flex flex-row px-6 py-0 my-2 min-w-[85%] justify-end'>
        <View className='flex flex-row justify-between px-6 py-0 my-2'>
          <Pressable className='mx-2'>
            <Text className='font-bold text-center text-l text-primary-dark hover:text-primary-green'>
              Summary
            </Text>
          </Pressable>
          <Pressable className='mx-4'>
            <Text className='font-bold text-center text-l text-primary-dark hover:text-primary-green'>
              Statistics
            </Text>
          </Pressable>
          <Pressable className='mx-4'>
            <Text className='font-bold text-center text-l text-primary-dark hover:text-primary-green'>
              Settings
            </Text>
          </Pressable>
        </View>
        <View className='flex flex-row justify-between h-20 px-0 py-0 my-2'>
          <View>
            <Image
              source={authUser.profilePhoto}
              alt='user avatar'
              className='w-10 h-10 rounded-full '
              // width='32px'
              // height='32px'
              sx={{ width: 32, height: 32, br: '50%' }}
            />
          </View>
          <View className='flex flex-column'>
            <ActionButton
              text='Logout'
              background={'bg-primary-green'}
              onPress={logout}
            />
            <Text>{authUser.displayName}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Navbar;
