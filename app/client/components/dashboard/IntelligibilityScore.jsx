import { Text, View } from 'react-native';
import { ResponsiveRadialBar } from '@nivo/radial-bar';

function IntelligibilityScore({ data }) {
  return (
    <>
      <Text className='mb-2 text-lg font-semibold text-primary-dark'>
        Intelligibility Score
      </Text>

      <View className='flex flex-row items-start'>
        <View className='flex w-28 h-28'>
          <ResponsiveRadialBar
            data={data}
            innerRadius={0.7}
            padding={0}
            maxValue={100}
            endAngle={360}
            cornerRadius={2}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            borderWidth={1}
            colors={{ scheme: 'pastel1' }}
            borderColor='#fff'
            tracksColor='#dedede'
            enableRadialGrid={false}
            enableCircularGrid={false}
            radialAxisStart={null}
            circularAxisOuter={null}
            transitionMode='startAngle'
            isInteractive={false}
            legends={[]}
          />
        </View>
        <Text className='absolute mr-2 text-3xl font-bold text-primary-dark left-7 top-9 '>
          46%
        </Text>
      </View>
    </>
  );
}

export default IntelligibilityScore;
