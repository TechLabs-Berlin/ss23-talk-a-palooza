import { Text, View } from 'react-native';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveTimeRange } from '@nivo/calendar';

const MyResponsiveCalendar = ({ data }) => (
  <View className='flex  flex-col col-span-fullm-4'>
    <View className='px-5 pt-5'>
      <Text className='text-lg font-semibold text-primary-dark'>
        Last year at a glance
      </Text>
    </View>
    <View className='h-48'>
      <ResponsiveTimeRange
        data={data}
        from='2023-01-01'
        to='2023-12-31'
        emptyColor='#eeeeee'
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor='#ffffff'
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </View>
  </View>
);

export default MyResponsiveCalendar;
