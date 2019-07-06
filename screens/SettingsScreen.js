import React from 'react';
import { Text, ScrollView } from 'react-native';


export default function SettingsScreen() {
  return (
    <ScrollView>
      <Text>SETTINGS SCREEN</Text>
    </ScrollView>
  )
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
