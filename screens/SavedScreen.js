import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, AsyncStorage, View, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import DetailsModal from '../components/DetailsModal'

class SavedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: [],
      modalVisible: false,
      selectedIndex: null
    }

    this.updateModal = this.updateModal.bind(this);
  }

  componentDidMount() {
    this.fetchSaved();
  }

  componentDidUpdate(prevProps) {
    // refresh saved pets every time we navigate to the "Saved" sreen:
    if (prevProps.isFocused !== this.props.isFocused) {
      this.fetchSaved();
    }
  }

  async fetchSaved() {
    try {
      const saved = JSON.parse(await AsyncStorage.getItem('saved'));
      this.setState({
        saved: saved
      })
    } catch(error) {
        console.log(error)
    }
  }

  updateModal(visibility, selected) {
    this.setState({ modalVisible: visibility, selectedIndex: selected }, () => {console.log(this.state.modalVisible)})
  }

  renderDetails() {
    let selectedPet = this.state.saved[this.state.selectedIndex];
    return (
      <DetailsModal 
        modalVisible={this.state.modalVisible} 
        selectedPet={selectedPet}
        updateModal={this.updateModal}
      />
    )
  }

  renderSaved() {
      return this.state.saved.map((save, i) => {
        return (
          <TouchableHighlight 
            key={i} 
            onPress={() => this.updateModal(true, i)}
            style={styles.savedCard}
            >
            <View style={styles.cardContent}>
              <Image source={{uri: save.img}} style={styles.thumbnail}/>
              <View style={styles.petInfo}>
                <Text style={styles.petHeader}>{save.name} , {save.age} yr, {save.sex}</Text>
                <Text numberOfLines={2}>{save.profile}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )
      })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.saved && this.renderSaved()}
        {this.state.modalVisible && this.renderDetails()}
      </ScrollView>
    );
  }
}

export default withNavigationFocus(SavedScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  savedCard: {
    borderWidth: 1,
    borderColor: '#d6d7da',
    borderRadius: 1,
    padding: 5,
    margin: 5
  },

  thumbnail: {
    height: 100,
    width: 100
  },

  cardContent: {
    flexDirection: 'row'
  },

  petInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
    fontSize: 12,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  petHeader: {
    fontSize: 20
  }
});


