import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { fetchInitialPets } from '../reducers/petReducer';


export class SearchScreen extends Component {
  componentDidMount() {
    this.props.fetchInitialPets()
  }
  render() {
    return (
      <ScrollView
          style={styles.container}>
          <View style={styles.container}>
          <Text>SEARCH</Text>
        </View>
      </ScrollView>
    );
  }
}


SearchScreen.navigationOptions = {
  title: 'Search',
};

const mapStateToProps = state => {
  return { pets } = state
};

const mapDispatchToProps = dispatch => ({
  fetchInitialPets: () => dispatch(fetchInitialPets()),
});


const styles = StyleSheet.create({
 
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
