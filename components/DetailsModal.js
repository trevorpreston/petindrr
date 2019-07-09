import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, AsyncStorage, View, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';

export default props => {
  return (
    <Modal
    transparent={false}
    visible={props.modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}>
      <View style={styles.modal}>
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <Image source={{uri: props.selectedPet.img}} style={{height: 300, width: 300}}/>
            <Text style={styles.petHeader} h2>{props.selectedPet.name} , {props.selectedPet.age} yr, {props.selectedPet.sex}</Text>
            <Text style={{display: 'flex'}}>{props.selectedPet.profile}</Text>
            <Button
              onPress={() => props.updateModal(false, null)}
              title='close'
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: { 
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  cardContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa'
  },

  cardContent: {
    flexDirection: 'column',
    height: 500,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  profile: {
    flex: 1,
    marginTop: 100
  },

  petHeader: {
    fontSize: 25
  }
})