import { Text, View } from 'react-native';
// Import utilities
// import {  hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
  return (
    <View className='flex flex-col m-4 bg-white border rounded-sm shadow-lg col-span-full dark:bg-slate-800 border-slate-200 dark:border-slate-700'>
      <View className='px-5 pt-5'>
        <Text className='mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100'>
          Acme Plus
        </Text>
        <Text className='mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500'>
          Sales
        </Text>
        <View className='flex items-start'>
          <Text className='mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100'>
            $24,780
          </Text>
          <Text className='text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full'>
            +49%
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DashboardCard01;
