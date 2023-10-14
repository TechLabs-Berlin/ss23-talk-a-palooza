import { ImageBackground } from 'react-native';

export const GiveHeartBackground = () => {
  return (
    <ImageBackground
      source={require('../../assets/backgrounds/giveheart.svg')}
      resizeMode={'cover'}
      loading='lazy'
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        height: '100%',
        position: 'absolute',
      }}
    />
  );
};

export const SkyBackground = () => {
  return (
    <ImageBackground
      source={require('../../assets/backgrounds/sky3.svg')}
      resizeMode={'cover'}
      loading='lazy'
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        height: '100%',
        position: 'absolute',
      }}
    />
  );
};

export const LandBackground = () => {
  return (
    <ImageBackground
      source={require('../../assets/backgrounds/startscreen.svg')}
      resizeMode={'cover'}
      loading='lazy'
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        height: '100%',
        position: 'absolute',
      }}
    />
  );
};
