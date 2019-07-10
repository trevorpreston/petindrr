import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = {
  defaultNavigationOptions: {
    headerStyle: {
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      height: 10
    }
  }
}

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);


SearchStack.path = '';

SearchStack.navigationOptions = {
  tabBarLabel: 'Search'
};

const SavedStack = createStackNavigator(
  {
    Saved: SavedScreen,
  },
  config
);

SavedStack.navigationOptions = {
  tabBarLabel: 'Saved',
};


SavedStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.path = '';

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
};

const options = {
  showIcon: false,
  activeBackgroundColor: '#d6d7da',
  style: {
    alignItems: 'center',
    shadowColor: 'transparent',
    borderTopWidth: 0,
    width: 300,
    alignSelf: 'center'
  },
  tabStyle: {
    padding: 4
  },
  labelStyle: {
    fontSize: 18,
  },
}

const tabNavigator = createBottomTabNavigator({
  SearchStack,
  SavedStack,
  SettingsStack,
}, { tabBarOptions: options } );

tabNavigator.path = '';

export default tabNavigator;
