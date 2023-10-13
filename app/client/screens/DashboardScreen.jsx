import { useState } from 'react';
import { View } from 'react-native';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Locked from '../components/dashboard/Locked';
import Dashboard from '../components/dashboard/Dashboard';
import { GiveHeartBackground } from '../components/layouts/Backgrounds';

const DashboardScreen = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <View className='flex justify-between w-full h-full bg-lightgrey'>
      <GiveHeartBackground />
      {isUnlocked ? <Dashboard /> : <Locked onUnlocked={handleUnlock} />}
    </View>
  );
};

export default LayoutHOC(DashboardScreen);
