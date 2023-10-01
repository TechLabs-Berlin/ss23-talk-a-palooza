import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/dashboard/Navbar';
import { HomeButton } from '../components/navigation/Buttons';

const imageIntro = require('../assets/images/giveheart.svg');
const image = require('../assets/images/giveheart.svg');

const Dashboard = () => {
  return (
    <>
      <View className='container flex min-h-full'>
        <View className='container flex p-2 bg-white w-100 bg-opacity-80'>
          <View className='flex flex-row justify-between'>
            <View className='flex ml-0 mr-0'>
              <HomeButton />
            </View>
            <Navbar />
          </View>
          <View className='flex flex-col'>
            <View className='flex-1 border ml-0 mr-5 mt-0 mb-5 px-4 border-solid border-[#ddd]'>
              <Text className='mt-[-15px] mr-[-15px] ml-[-15px] text-sm font-normal mb-[15px] px-[15px] py-3 border-b-[#ddd] border-b border-solid'>
                Clean CSS Code
              </Text>
              <Text>Aaa</Text>
            </View>
            <View>
              <Text>Font Awesome</Text>
              <Text>Some Content</Text>
            </View>
            <View>
              <Text>Some Content</Text>
              <Text>Some Content</Text>
            </View>
          </View>

          <View className='flex-grid'>
            <View>
              <Text>Headline</Text>
              <Text>Some Content</Text>
            </View>
            <View>
              <Text>Headline</Text>
              <Text>Some Content</Text>
            </View>
          </View>

          <View className='flex-grid'>
            <View>
              <Text>Headline</Text>
              <Text>Some Content</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  app: {
    // marginHorizontal: 'auto',
    width: '100%',
    // maxHeight: 768,
    // textAlign: 'center',
    justifyContent: 'flex-start',
  },
});
