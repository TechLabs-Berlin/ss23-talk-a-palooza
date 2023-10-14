import { View } from 'react-native';
import NewWords from './NewWords';
import IntelligibilityScore from './IntelligibilityScore';
import MyResponsiveCalendar from './Calendar';
import LastWords from './LastWords';

const calendarData = [
  {
    value: 1,
    day: '2023-06-14',
  },
  {
    value: 3,
    day: '2023-04-21',
  },
  {
    value: 7,
    day: '2023-05-04',
  },
  {
    value: 7,
    day: '2023-09-26',
  },
  {
    value: 1,
    day: '2023-06-07',
  },
  {
    value: 1,
    day: '2017-12-08',
  },
  {
    value: 2,
    day: '2023-01-06',
  },
  {
    value: 5,
    day: '2017-11-09',
  },
  {
    value: 3,
    day: '2017-04-06',
  },
  {
    value: 8,
    day: '2023-08-05',
  },
  {
    value: 8,
    day: '2017-11-10',
  },
  {
    value: 4,
    day: '2018-04-19',
  },
  {
    value: 7,
    day: '2023-04-12',
  },
  {
    value: 9,
    day: '2018-05-13',
  },
  {
    value: 4,
    day: '2023-11-27',
  },
  {
    value: 2,
    day: '2018-01-10',
  },
  {
    value: 5,
    day: '2023-12-25',
  },
  {
    value: 6,
    day: '2023-04-19',
  },
  {
    value: 6,
    day: '2023-11-07',
  },
  {
    value: 3,
    day: '2017-01-13',
  },
  {
    value: 4,
    day: '2023-08-07',
  },
  {
    value: 2,
    day: '2017-02-21',
  },
  {
    value: 5,
    day: '2018-07-16',
  },
  {
    value: 7,
    day: '2023-05-27',
  },
  {
    value: 4,
    day: '2017-08-14',
  },
  {
    value: 3,
    day: '2023-08-18',
  },
  {
    value: 3,
    day: '2023-05-19',
  },
  {
    value: 3,
    day: '2018-02-19',
  },
  {
    value: 8,
    day: '2018-03-09',
  },
  {
    value: 2,
    day: '2023-09-08',
  },
  {
    value: 6,
    day: '2023-06-21',
  },
  {
    value: 7,
    day: '2017-05-06',
  },
  {
    value: 4,
    day: '2017-12-11',
  },
  {
    value: 3,
    day: '2023-08-30',
  },
  {
    value: 6,
    day: '2023-08-13',
  },
  {
    value: 6,
    day: '2023-09-07',
  },
  {
    value: 8,
    day: '2018-06-07',
  },
  {
    value: 3,
    day: '2023-10-11',
  },
  {
    value: 3,
    day: '2023-10-22',
  },
  {
    value: 5,
    day: '2018-04-23',
  },
  {
    value: 4,
    day: '2017-10-26',
  },
  {
    value: 9,
    day: '2017-12-27',
  },
  {
    value: 2,
    day: '2023-11-05',
  },
  {
    value: 9,
    day: '2023-08-03',
  },
  {
    value: 3,
    day: '2023-10-15',
  },
  {
    value: 6,
    day: '2023-11-17',
  },
  {
    value: 8,
    day: '2017-08-11',
  },
  {
    value: 6,
    day: '2018-01-20',
  },
  {
    value: 4,
    day: '2017-07-13',
  },
  {
    value: 7,
    day: '2023-08-15',
  },
  {
    value: 6,
    day: '2023-07-30',
  },
  {
    value: 5,
    day: '2023-03-19',
  },
  {
    value: 3,
    day: '2023-05-26',
  },
  {
    value: 3,
    day: '2017-08-04',
  },
  {
    value: 8,
    day: '2023-03-08',
  },
  {
    value: 3,
    day: '2023-04-19',
  },
  {
    value: 8,
    day: '2023-03-22',
  },
  {
    value: 6,
    day: '2023-03-03',
  },
  {
    value: 5,
    day: '2023-12-24',
  },
  {
    value: 7,
    day: '2017-12-17',
  },
  {
    value: 5,
    day: '2018-07-29',
  },
  {
    value: 2,
    day: '2018-03-08',
  },
  {
    value: 7,
    day: '2023-11-17',
  },
  {
    value: 6,
    day: '2017-03-29',
  },
  {
    value: 9,
    day: '2017-08-27',
  },
  {
    value: 6,
    day: '2023-07-20',
  },
  {
    value: 3,
    day: '2018-07-02',
  },
  {
    value: 8,
    day: '2017-01-24',
  },
  {
    value: 9,
    day: '2017-10-31',
  },
  {
    value: 2,
    day: '2023-05-18',
  },
  {
    value: 2,
    day: '2023-05-24',
  },
  {
    value: 7,
    day: '2017-05-30',
  },
  {
    value: 3,
    day: '2023-01-04',
  },
  {
    value: 7,
    day: '2017-05-20',
  },
  {
    value: 2,
    day: '2017-02-25',
  },
  {
    value: 3,
    day: '2023-10-25',
  },
  {
    value: 6,
    day: '2023-01-12',
  },
  {
    value: 2,
    day: '2017-03-04',
  },
  {
    value: 4,
    day: '2023-05-18',
  },
];

const avgIntelligibility = [
  {
    id: 'Online',
    data: [
      {
        x: 'Vegetables',
        y: 63,
      },
    ],
  },
];

const Summary = () => {
  return (
    <View className='container mx-auto'>
      <View className='p-10 pb-0 '>
        <View className='flex flex-row justify-between'>
          {/* 10 last words learnt */}
          <View className='flex items-center w-72'>
            <View className='p-4'>
              <LastWords />
            </View>
          </View>

          {/* Intelligibility score */}
          <View className='flex items-center w-72'>
            <View className='p-4'>
              <IntelligibilityScore data={avgIntelligibility} />
            </View>
          </View>

          {/* New words */}
          <View className='flex items-center w-72'>
            <View className='p-4'>
              <NewWords />
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View className=''>
          <View className=''>
            <MyResponsiveCalendar data={calendarData} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Summary;
