import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function SavedScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>SAVED SCREEN</Text>
    </ScrollView>
  );
}

SavedScreen.navigationOptions = {
  title: 'Saved',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


