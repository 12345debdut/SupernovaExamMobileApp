import React from 'react';
import {Alert} from 'react-native';
import LoginScreen from './screens/login/index';
import Options from './screens/options/index';
import Profile from './screens/options/Profile';
import Profileac  from './screens/profile/index';
import Examwbjee from './screens/examwbjee/index.js';
import Examjeemain from './screens/examjeemain/index.js';
import Rating1 from './screens/Rating/Rating.js';
import Rating2 from './screens/Ratingje/Rating.js';
import Pdffile from './screens/Pdffile/Pdffile.js';
import { createStackNavigator, createAppContainer,createDrawerNavigator,DrawerItems } from 'react-navigation';
import {Provider} from 'react-redux';
import {Root} from 'native-base';
import store from './store/index';
const RootStack = createStackNavigator(
  {
    Home:LoginScreen,
    Options:Options,
    Profile:Profile,
    Profile1:Profileac,
    Examwbjee:Examwbjee,
    Examjeemain:Examjeemain,
    Rating:Rating1,
    Rating2:Rating2,
    Pdffile:Pdffile
  },
  {
    initialRouteName: 'Home',
  }
);
const initialstate={
  result:1
}
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
      return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
      );
  }
}
