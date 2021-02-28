/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import RNBootSplash from 'react-native-bootsplash';

RNBootSplash.hide({fade: true});
import React from 'react';
import AppNavigator from './src/config/navigation';

const App = () => {
  return <AppNavigator />;
};
export default App;
