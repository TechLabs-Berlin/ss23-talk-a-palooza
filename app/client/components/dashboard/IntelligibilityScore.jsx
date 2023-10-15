import { Text, View } from 'react-native';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { Heading, DashboardHeading } from '../layouts/typo';

function IntelligibilityScore({ data }) {
  return (
    <>
      <DashboardHeading text='Intelligibility Score' />

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
        <Heading
          text={'46%'}
          style={{
            position: 'absolute',
            left: '1.75rem',
            top: '2.25rem',
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
            marginRight: '0.5rem',
            fontWeight: 700,
          }}
        />
      </View>
    </>
  );
}

export default IntelligibilityScore;
