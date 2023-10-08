import { useState } from 'react';
import { View, Image } from 'react-native';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Locked from '../components/dashboard/Locked';
import Dashboard from '../components/dashboard/Dashboard';

const image = require('../assets/backgrounds/giveheart.svg');

const DashboardScreen = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <View className='flex justify-between w-full h-full bg-lightgrey'>
      <Image
        source={image}
        resizeMode={'cover'}
        loading='lazy'
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          // opacity: 0.7,
          height: '100%',
          position: 'absolute',
        }}
      />
      {isUnlocked ? <Dashboard /> : <Locked onUnlocked={handleUnlock} />}
    </View>
  );
};

export default LayoutHOC(DashboardScreen);
