import { View } from 'react-native';
import Navbar from './Navbar';
import { HomeButton } from '../layouts/Buttons';
import Statistics from './Statistics';
import Summary from './Summary';
import Settings from './Settings';
import { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Summary');

  return (
    <View className='flex justify-between w-full h-full bg-lightgrey'>
      <View className='flex w-full h-full flex-column'>
        <View className='flex flex-row justify-between p-5 pb-3 border-b border-slate-400'>
          <HomeButton />
          <Navbar className='w-11/12' setActiveTab={setActiveTab} />
        </View>
        {activeTab === 'Summary' && <Summary />}
        {activeTab === 'Statistics' && <Statistics />}
        {activeTab === 'Settings' && <Settings />}
      </View>
    </View>
  );
};

export default Dashboard;
