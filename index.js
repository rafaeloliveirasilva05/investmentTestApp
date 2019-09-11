if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import {YellowBox} from 'react-native';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Routes from './src/navigation'

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

AppRegistry.registerComponent(appName, () => Routes);
