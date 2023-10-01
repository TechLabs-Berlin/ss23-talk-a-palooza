import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import { AuthData, ChildData } from '../../services/AuthWrapper';

const Navbar = () => {
  const { authUser } = AuthData();

  const logout = () => {
    window.open('http://localhost:3001/api/auth/logout', '_self');
  };

  return (
    <>
      <View className='flex flex-row justify-between h-20 px-6 py-0 my-2'>
        <View className='flex flex-row justify-between h-20 px-6 py-0 my-2'>
          <Pressable>
            <Text>Summary</Text>
          </Pressable>
          <Pressable>
            <Text>Statistics</Text>
          </Pressable>
          <Pressable>
            <Text>Settings</Text>
          </Pressable>
        </View>
        <View className='flex flex-row justify-between h-20 px-6 py-0 my-2'>
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
            <Text>{authUser.displayName}</Text>
            <Pressable onClick={logout}>
              <Text>Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default Navbar;
