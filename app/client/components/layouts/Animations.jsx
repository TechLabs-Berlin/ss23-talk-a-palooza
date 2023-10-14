import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

// StartScreen Animations

export const SunAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src='https://lottie.host/9a46b7f3-08d2-4191-acb3-c1667c1a402b/SPhd1EWDvF.lottie'
      style={{
        position: 'absolute',
        left: left,
        top: top,
        width: 400,
        height: 400,
        zIndex: '100',
      }}
      autoplay
      loop
      loading='lazy'
      renderer='svg'
      speed={1}
    ></DotLottiePlayer>
  );
};

export const CloudAnimation = ({ top, left, right, width, height }) => {
  return (
    <DotLottiePlayer
      src='https://lottie.host/8a91afb4-a28e-4efd-a32b-1e52648c4d0d/Q6jYv9ISBy.json'
      style={{
        position: 'absolute',
        right: right,
        left: left,
        top: top,
        width: width,
        height: height,
      }}
      autoplay
      loop
      renderer='svg'
      speed={1}
    ></DotLottiePlayer>
  );
};

export const SlothAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src='https://lottie.host/3a058d63-23e9-45dd-975a-736404c139cd/BfFC12QwVg.lottie'
      autoplay
      loop
      speed={1}
      style={{
        bottom: bottom,
        position: 'absolute',
        height: '130px',
        width: '130px',
        right: right,
      }}
    ></DotLottiePlayer>
  );
};

export const ChickAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src={require('../../assets/animations/chicky.lottie')}
      autoplay
      loop
      loading='lazy'
      speed={1}
      style={{
        bottom: bottom,
        position: 'absolute',
        height: '80px',
        width: '80px',
        right: '276px',
      }}
    ></DotLottiePlayer>
  );
};

export const RaccoonAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src={require('../../assets/animations/raccoon.lottie')}
      autoplay
      loop
      speed={1}
      style={{
        bottom: bottom,
        position: 'absolute',
        height: '130px',
        width: '130px',
        left: left,
      }}
    ></DotLottiePlayer>
  );
};

// Main Menu Animations
export const BeeAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src={require('../../assets/animations/bee.lottie')}
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: '50px',
        height: '50px',
      }}
      autoplay
      loop
      renderer='svg'
      speed={1}
    ></DotLottiePlayer>
  );
};

// Audio Exercise Animations
export const CheckAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src='https://lottie.host/830dd5b9-c968-4085-ba1b-c1a5eea39310/QzGRkjql82.lottie'
      style={{
        marginTop: -83,
        width: 220,
        height: 220,
      }}
      autoplay
      renderer='svg'
      speed={1.5}
    ></DotLottiePlayer>
  );
};

// Reward screen Animations

export const WheelAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src='https://lottie.host/955de89e-3c2f-4bd0-acf0-b345a47bae00/PhNANxMP4c.json'
      autoplay
      renderer='svg'
      style={{
        alignSelf: 'center',
        width: 400,
        height: 400,
        position: 'relative',
      }}
      onEvent={(loopComplete) => {
        callback: () => startVideoPlayback();
      }}
    ></DotLottiePlayer>
  );
};

export const DancingBearAnimation = ({ top, bottom, left, right }) => {
  return (
    <DotLottiePlayer
      src={require('../../assets/animations/dancingbear.lottie')}
      autoplay
      loop
      speed={1}
      style={{
        width: 300,
        height: 300,
        position: 'absolute',
        bottom: 0,
        right: -45,
        zIndex: 100,
      }}
    ></DotLottiePlayer>
  );
};
