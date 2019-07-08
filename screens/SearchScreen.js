import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image, PanResponder, AsyncStorage } from 'react-native';

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
            style={[this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute"
              }
            ]}
          >
          <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{uri: item.img}} />
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
        height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
        }]}
    >
      <Image
        style={{
          flex: 1,
          height: null,
          width: null,
          resizeMode: "cover",
          borderRadius: 20
        }}
        source={{uri: item.img}}
      />
    </Animated.View>
    )
  }


  render() {
    return (
        <View style={styles.container}>
          {this.props.pets && this.renderCards(this.props.pets) }
        </View>
    );
  }
}


SearchScreen.navigationOptions = {
  title: 'Search',
};

const mapStateToProps = state => {
  return { pets } = state.pet
};

const mapDispatchToProps = dispatch => ({
  fetchInitialPets: () => dispatch(fetchInitialPets()),
});


const styles = StyleSheet.create({
 
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
