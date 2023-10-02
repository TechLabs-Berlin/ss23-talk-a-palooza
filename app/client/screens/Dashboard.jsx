import { Text, View } from 'react-native';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Navbar from '../components/dashboard/Navbar';
import { HomeButton } from '../components/navigation/Buttons';
// import { useState } from 'react';
import DashboardCard01 from '../components/dashboard/DashboardCard01';
import DashboardCard02 from '../components/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard06 from '../partials/dashboard/DashboardCard06';
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';

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
        <View className=''>
          <View className='flex h-screen overflow-hidden'>
            {/* Content area */}
            <View className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
              <View>
                <View className='w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl'>
                  {/* Cards */}
                  <View className='flex flex-wrap gap-6'>
                    <DashboardCard01 />
                    {/* Line chart (Acme Advanced) */}
                    <DashboardCard02 />
                    {/* Line chart (Acme Professional) */}
                    {/* <DashboardCard03 /> */}
                    {/* Bar chart (Direct vs Indirect) */}
                    {/* <DashboardCard04 /> */}
                    {/* Doughnut chart (Top Countries) */}
                    {/* <DashboardCard06 /> */}
                    {/* Line chart (Sales Over Time) */}
                    {/* <DashboardCard08 /> */}
                    {/* Card (Recent Activity) */}
                    {/* <DashboardCard12 /> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='flex-1 border ml-0 mr-5 mt-0 mb-5 px-4 border-solid border-[#ddd]'>
            <Text className='mt-[-15px] mr-[-15px] ml-[-15px] text-sm font-normal mb-[15px] px-[15px] py-3 border-b-[#ddd] border-b border-solid'>
              Clean CSS Code
            </Text>
            <Text>Aaa</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default LayoutHOC(Dashboard);
