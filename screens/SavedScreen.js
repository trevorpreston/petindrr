import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, AsyncStorage, View, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import { withNavigationFocus } from "react-navigation";

class SavedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: [],
      modalVisible: false,
      selectedIndex: null
    }
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

  updateModal(visibility, selected) {
    this.setState({ modalVisible: visibility, selectedIndex: selected }, () => {console.log(this.state.modalVisible)})
  }

  renderDetails() {
    let selectedPet = this.state.saved[this.state.selectedIndex]
    return (
      <Modal
      transparent={false}
      visible={this.state.modalVisible}
      style={{height: 50, width: 100, backgroundColor: 'black', marginTop: 20}}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <Text>I AM THE MODAL</Text>
      <View>
        <Image source={{uri: selectedPet.img}} style={{height: 200, width: 200}}/>
        <Text>{selectedPet.name} , {selectedPet.age} yr, {selectedPet.sex}</Text>
        <Text>{selectedPet.profile}</Text>
      </View>
      <TouchableOpacity onPress={() => this.updateModal(false, null)}>
        <Text>Close</Text>
      </TouchableOpacity>
      </Modal>
    )
  }

  renderSaved() {
      return this.state.saved.map((save, i) => {
        return (
          <TouchableHighlight 
            key={i} 
            onPress={() => this.updateModal(true, i)}
            underlayColor="white">
            <View>
              <Image source={{uri: save.img}} style={{height: 200, width: 200}}/>
              <Text>{save.name} , {save.age} yr, {save.sex}</Text>
              <Text numberOfLines={2}>{save.profile}</Text>
            </View>
          </TouchableHighlight>
        )
      })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>SAVED SCREEN</Text>
        {this.state.saved && this.renderSaved()}
        {this.state.modalVisible && this.renderDetails()}
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


