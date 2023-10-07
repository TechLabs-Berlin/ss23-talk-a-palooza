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
      <View className='flex flex-row px-6 py-0  w-11/12 min-w-[85%] justify-end'>
        <View className='flex flex-row items-center justify-between px-6 py-0 '>
          <Pressable className='mx-4 p-2 bg-[#b6e08ca3] shadow-sm border border-primary-green rounded-xl'>
            <Text className='font-bold text-center text-l text-primary-dark '>
              Summary
            </Text>
          </Pressable>
          <Pressable className='mx-6'>
            <Text className='font-bold text-center text-l text-primary-dark hover:text-primary-green'>
              Statistics
            </Text>
          </Pressable>
          <Pressable className='mx-6'>
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
                className='w-14 h-14 rounded-full shadow-md'
                sx={{ br: '50%' }}
              />
              {isDropdownOpen && (
                <View className='absolute bg-white border border-gray-300 rounded shadow-md top-11 -right-5'>
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
