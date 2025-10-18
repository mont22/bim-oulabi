if (__DEV__) {
  require('./src/config/ReactotronConfig');
}

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import './global.css';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
