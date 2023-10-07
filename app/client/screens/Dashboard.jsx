import { Text, View } from 'react-native';
import LayoutHOC from '../components/layouts/LayoutHOC';
import Navbar from '../components/dashboard/Navbar';
import { HomeButton } from '../components/navigation/Buttons';
import NewWords from '../components/dashboard/NewWords';
import IntelligibilityScore from '../components/dashboard/IntelligibilityScore';
import MyResponsiveCalendar from '../components/dashboard/Calendar';
import LastWords from '../components/dashboard/LastWords';

const imageIntro = require('../assets/backgrounds/giveheart.svg');
const image = require('../assets/backgrounds/giveheart.svg');

const calendarData = [
  {
    value: 194,
    day: '2023-06-14',
  },
  {
    value: 322,
    day: '2023-04-21',
  },
  {
    value: 72,
    day: '2023-05-04',
  },
  {
    value: 337,
    day: '2023-09-26',
  },
  {
    value: 102,
    day: '2023-06-07',
  },
  {
    value: 190,
    day: '2017-12-08',
  },
  {
    value: 212,
    day: '2023-01-06',
  },
  {
    value: 295,
    day: '2017-11-09',
  },
  {
    value: 103,
    day: '2017-04-06',
  },
  {
    value: 138,
    day: '2023-08-05',
  },
  {
    value: 28,
    day: '2017-11-10',
  },
  {
    value: 24,
    day: '2018-04-19',
  },
  {
    value: 397,
    day: '2023-04-12',
  },
  {
    value: 91,
    day: '2018-05-13',
  },
  {
    value: 204,
    day: '2023-11-27',
  },
  {
    value: 240,
    day: '2018-01-10',
  },
  {
    value: 252,
    day: '2023-12-25',
  },
  {
    value: 61,
    day: '2023-04-19',
  },
  {
    value: 146,
    day: '2023-11-07',
  },
  {
    value: 342,
    day: '2017-01-13',
  },
  {
    value: 140,
    day: '2023-08-07',
  },
  {
    value: 292,
    day: '2017-02-21',
  },
  {
    value: 157,
    day: '2018-07-16',
  },
  {
    value: 27,
    day: '2023-05-27',
  },
  {
    value: 41,
    day: '2017-08-14',
  },
  {
    value: 329,
    day: '2023-08-18',
  },
  {
    value: 232,
    day: '2023-05-19',
  },
  {
    value: 213,
    day: '2018-02-19',
  },
  {
    value: 318,
    day: '2018-03-09',
  },
  {
    value: 120,
    day: '2023-09-08',
  },
  {
    value: 116,
    day: '2023-06-21',
  },
  {
    value: 371,
    day: '2017-05-06',
  },
  {
    value: 314,
    day: '2017-12-11',
  },
  {
    value: 308,
    day: '2023-08-30',
  },
  {
    value: 160,
    day: '2023-08-13',
  },
  {
    value: 367,
    day: '2023-09-07',
  },
  {
    value: 185,
    day: '2018-06-07',
  },
  {
    value: 137,
    day: '2023-10-11',
  },
  {
    value: 375,
    day: '2023-10-22',
  },
  {
    value: 175,
    day: '2018-04-23',
  },
  {
    value: 343,
    day: '2017-10-26',
  },
  {
    value: 91,
    day: '2017-12-27',
  },
  {
    value: 182,
    day: '2023-11-05',
  },
  {
    value: 9,
    day: '2023-08-03',
  },
  {
    value: 321,
    day: '2023-10-15',
  },
  {
    value: 306,
    day: '2023-11-17',
  },
  {
    value: 298,
    day: '2017-08-11',
  },
  {
    value: 396,
    day: '2018-01-20',
  },
  {
    value: 41,
    day: '2017-07-13',
  },
  {
    value: 373,
    day: '2023-08-15',
  },
  {
    value: 376,
    day: '2023-07-30',
  },
  {
    value: 115,
    day: '2023-03-19',
  },
  {
    value: 263,
    day: '2023-05-26',
  },
  {
    value: 3,
    day: '2017-08-04',
  },
  {
    value: 281,
    day: '2023-03-08',
  },
  {
    value: 363,
    day: '2023-04-19',
  },
  {
    value: 289,
    day: '2023-03-22',
  },
  {
    value: 361,
    day: '2023-03-03',
  },
  {
    value: 151,
    day: '2023-12-24',
  },
  {
    value: 107,
    day: '2017-12-17',
  },
  {
    value: 305,
    day: '2018-07-29',
  },
  {
    value: 200,
    day: '2018-03-08',
  },
  {
    value: 377,
    day: '2023-11-17',
  },
  {
    value: 396,
    day: '2017-03-29',
  },
  {
    value: 290,
    day: '2017-08-27',
  },
  {
    value: 67,
    day: '2023-07-20',
  },
  {
    value: 239,
    day: '2018-07-02',
  },
  {
    value: 281,
    day: '2017-01-24',
  },
  {
    value: 109,
    day: '2017-10-31',
  },
  {
    value: 26,
    day: '2023-05-18',
  },
  {
    value: 162,
    day: '2023-05-24',
  },
  {
    value: 377,
    day: '2017-05-30',
  },
  {
    value: 336,
    day: '2023-01-04',
  },
  {
    value: 137,
    day: '2017-05-20',
  },
  {
    value: 201,
    day: '2017-02-25',
  },
  {
    value: 132,
    day: '2023-10-25',
  },
  {
    value: 246,
    day: '2023-01-12',
  },
  {
    value: 266,
    day: '2017-03-04',
  },
  {
    value: 24,
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

const Dashboard = () => {
  return (
    <View className='flex justify-between w-full h-full bg-white'>
      <View className='flex w-full h-full flex-column'>
        <View className='flex flex-row p-5 pb-3 justify-between border-b border-lightgrey'>
          <HomeButton />
          <Navbar className='w-11/12 ' />
        </View>
        <View className='container mx-auto'>
          <View className=' p-10 pb-0'>
            <View className='flex flex-row justify-between'>
              {/* 10 last words learnt */}
              <View className='  '>
                <View className='p-4'>
                  <LastWords />
                </View>
              </View>

              {/* Intelligibility score */}
              <View className=''>
                <View className='p-4'>
                  <IntelligibilityScore data={avgIntelligibility} />
                </View>
              </View>

              {/* New words */}
              <View className=' '>
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
      </View>
    </View>
  );
};

export default LayoutHOC(Dashboard);
