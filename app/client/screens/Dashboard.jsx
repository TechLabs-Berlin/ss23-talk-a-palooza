import { Text, View } from 'react-native';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Navbar from '../components/dashboard/Navbar';
import { HomeButton } from '../components/navigation/Buttons';
import DashboardCard01 from '../components/dashboard/DashboardCard01';
// import { useState } from 'react';

const imageIntro = require('../assets/images/giveheart.svg');
const image = require('../assets/images/giveheart.svg');

const Dashboard = () => {
  return (
    <>
      <View className='flex w-full h-full p-2 flex-column'>
        <View className='flex flex-row justify-between'>
          <View className='flex ml-0 mr-0'>
            <HomeButton />
          </View>
          <Navbar />
        </View>
        <View className='container mx-auto mt-4'>
          <View className='flex flex-row flex-wrap justify-center -mx-4'>
            {/* Card 1 */}
            <View className='w-full px-4 mb-4 sm:w-1/2 md:w-1/3'>
              <View className='p-4 bg-white rounded-lg shadow-md'>
                <DashboardCard01 />
              </View>
            </View>

            {/* Card 2 */}
            <View className='w-full px-4 mb-4 sm:w-1/2 md:w-1/3'>
              <View className='p-4 bg-white rounded-lg shadow-md'>
                {/* Your content for Card 2 */}
              </View>
            </View>

            {/* Card 3 */}
            <View className='w-full px-4 mb-4 sm:w-1/2 md:w-1/3'>
              <View className='p-4 bg-white rounded-lg shadow-md'>
                {/* Your content for Card 3 */}
              </View>
            </View>

            {/* Add more cards as needed */}
          </View>
        </View>
      </View>
    </>
  );
};

export default LayoutHOC(Dashboard);
