import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image, PanResponder, AsyncStorage, Text, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { fetchInitialPets } from '../reducers/petReducer';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentIndex: 0
    }

    /* Configure Animate instance: */
    this.position = new Animated.ValueXY();
    this.rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
   })

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }

  componentDidMount() {
    this.props.fetchInitialPets();
    // NOTE: for testing purposes, the cache is cleared when the phone is booted up.  
    // Comment out the line below if you want data to persist across sessions:
    this.clearSaved();  
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
         this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            speed: 30
          }).start(() => {
            this.savePet(this.props.pets[this.state.currentIndex]);
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            speed: 30
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
             toValue: { x: 0, y: 0 },
             speed: 30
             }).start()
          }
      }})
  }

  /* saving */
  async clearSaved() {
    try {
      await AsyncStorage.removeItem('saved');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  async savePet(newSave) {
    const existingSaved = await AsyncStorage.getItem('saved');
    let newSaved = JSON.parse(existingSaved);

    if( !newSaved ){
      newSaved = [];
    }
    
    if (newSaved.filter(pet => pet.id === newSave.id).length === 0) {
      newSaved.push(newSave)
    }

    await AsyncStorage.setItem('saved', JSON.stringify(newSaved) )
      .then( ()=>{
      } )
      .catch( ()=>{
      } )
  }

  /* Rendering: */
  renderCards(pets) {
    return pets.map( (pet, key) => {
      if (key < this.state.currentIndex) {
        return null;
      } else if (key == this.state.currentIndex) {
        return this.renderDynamicCard(pet, key)
      } else {
        return this.renderStaticCard(pet, key)
      }
    }).reverse()
  }

  renderDynamicCard(item, key) {
    return (
        <Animated.View
            {...this.PanResponder.panHandlers}
            key={key}
            style={[this.rotateAndTranslate, styles.card]}
          >
          {this.renderCard(item)}
        </Animated.View>
    )
  }

  renderStaticCard(item, key){
    return (
    <Animated.View
      key={key}
      style={[{
        opacity: this.nextCardOpacity,
        transform: [{ scale: this.nextCardScale }],
        }, styles.card]}
    >
      {this.renderCard(item)}
    </Animated.View>
    )
  }

  renderCard(item) {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.cardImage}
          source={{uri: item.img}}
        />
        <Text>{item.name} , {item.age} yr, {item.sex}</Text>
        <ScrollView>
          <Text>{item.profile}</Text>
        </ScrollView>
      </View>
    )
  }

  render() {
    return (
        <View>
          {this.props.pets && this.renderCards(this.props.pets) }
        </View>
    );
  }
}



const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute',
    backgroundColor: 'white'
  },

  cardImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  }
});


const mapStateToProps = state => {
  return { pets } = state.pet
};

const mapDispatchToProps = dispatch => ({
  fetchInitialPets: () => dispatch(fetchInitialPets()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
