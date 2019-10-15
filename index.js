/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
// import App from '~/App';
import {name as appName} from './app.json';
import SplashScreen from '~/SplashScreen';

YellowBox.ignoreWarnings([
  'componentWillReceiveProps is deprecated',
  'componentWillReceive',
  'Setting Drawer',
]);

AppRegistry.registerComponent(appName, () => SplashScreen);
