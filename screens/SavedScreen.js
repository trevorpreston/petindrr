import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, AsyncStorage, View } from 'react-native';
import { withNavigationFocus } from "react-navigation";

class SavedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: []
    }

    this.renderSaved = this.renderSaved.bind(this)
  }

  componentDidMount() {
    this.fetchSaved();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.fetchSaved();
    }
  }

  async fetchSaved() {
    try {
      const saved = JSON.parse(await AsyncStorage.getItem('saved'));
      this.setState({
        saved: saved
      }, () => {
        console.log('state updated to ', this.state.saved)
      })

    } catch (error) {
        console.log(error)
    }
  }

  renderSaved() {
      return this.state.saved.map( (save, i) => {
        return (
          <View key={i}>
            <Image source={{uri: save.img}} style={{height: 200, width: 200}}/>
            <Text>{save.name} , {save.age} yr, {save.sex}</Text>
            <Text numberOfLines={2}>{save.profile}</Text>
          </View>
        )
      })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>SAVED SCREEN</Text>
        {this.state.saved && this.renderSaved()}
      </ScrollView>
    );
  }
}

SavedScreen.navigationOptions = {
  title: 'Saved',
};

export default withNavigationFocus(SavedScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


