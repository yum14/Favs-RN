/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import Share from './src/Share';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('ShareMenuModuleComponent', () => Share);
