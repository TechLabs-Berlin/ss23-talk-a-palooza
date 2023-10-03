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
import { useState } from 'react';

const Navbar = () => {
  const { authUser } = AuthData();

  const logout = () => {
    window.open('http://localhost:3001/api/auth/logout', '_self');
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <View className='flex flex-row px-6 py-0 my-2 min-w-[85%] justify-end'>
        <View className='flex flex-row items-center justify-between px-6 py-0 my-2'>
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

          {/* Dropdown Menu */}
          <View className='relative inline-block text-left'>
            <Pressable
              className='text-white rounded-full hover:bg-blue-400'
              onPress={toggleDropdown}
            >
              <Image
                source={authUser.profilePhoto}
                alt='user avatar'
                className='w-10 h-10 rounded-full '
                // width='32px'
                // height='32px'
                sx={{ width: 32, height: 32, br: '50%' }}
              />
              {isDropdownOpen && (
                <View className='absolute bg-white border border-gray-300 rounded shadow-md top-12 right-4'>
                  <Pressable
                    onPress={logout}
                    className='px-4 py-2 hover:bg-blue-100'
                  >
                    <Text className='text-gray-800'>Logout</Text>
                  </Pressable>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default Navbar;
