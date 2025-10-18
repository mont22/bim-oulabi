import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Domain Marketplace',
    host: 'localhost', // Change this to your computer's IP if testing on a physical device
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: {veto: () => false},
    overlay: false,
  })
  .use(reactotronRedux())
  .connect();

// Clear Reactotron on each app load during development
if (__DEV__) {
  reactotron.clear?.();
}

// @ts-ignore - Add Reactotron to console for easy access
console.tron = reactotron;

export default reactotron;
