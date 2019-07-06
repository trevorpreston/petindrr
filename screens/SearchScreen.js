import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}>
        <Text>SEARCH</Text>
      </ScrollView>
    </View>
  );
}


SearchScreen.navigationOptions = {
  title: 'Search',
};


const styles = StyleSheet.create({
 
});
