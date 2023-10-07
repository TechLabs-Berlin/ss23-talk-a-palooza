import { Text, View, Image } from 'react-native';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Locked from '../components/dashboard/Locked';
import Dashboard from '../components/dashboard/Dashboard';

import { useState } from 'react';

const image = require('../assets/backgrounds/giveheart.svg');

const DashboardScreen = () => {
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
      {Locked ? <Locked /> : <Dashboard />}
    </View>
  );
};

export default LayoutHOC(DashboardScreen);
