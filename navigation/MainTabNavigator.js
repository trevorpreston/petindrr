import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);


SearchStack.path = '';

const SavedStack = createStackNavigator(
  {
    Saved: SavedScreen,
  },
  config
);


SavedStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  SearchStack,
  SavedStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
