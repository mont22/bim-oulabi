import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (typeof global.self === 'undefined') {
  global.self = global;
}

AppRegistry.registerComponent(appName, () => App);
