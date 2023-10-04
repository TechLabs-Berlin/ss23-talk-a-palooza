import LayoutHOC from './LayoutHOC';
import { Text } from 'react-native';

const Loader = () => {
  return (
    <>
      <Text>Loading...</Text>
    </>
  );
};
export default LayoutHOC(Loader);
