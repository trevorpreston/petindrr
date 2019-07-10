import React, { Component } from 'react';
import { Text, ScrollView, View, TextInput, Switch, StyleSheet} from 'react-native';

import { connect } from 'react-redux';
import { fetchInitialSettings, updateProfile, updateMinAge, updateMaxAge, togglePetPreference } from '../reducers/userReducer';


class SettingsScreen extends Component {
  componentDidMount() {
    this.props.fetchInitialSettings()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileWrapper}>
          <Text style={styles.header}>Adopter Profile</Text>
          <TextInput 
            value={this.props.profile}
            editable={true}
            multiline={true}
            onChangeText={text => this.props.updateProfile(text)}
            style={styles.profile}/>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.header}>Preferences</Text>
          <View style={styles.detailsWrapper}>
            <Text>Animal</Text>
            <View style={styles.switchWrapper}>
              <Text>Cat</Text>
              <Switch
                value={this.props.typePreference === 'dog' ? true: false}
                onValueChange={(val) => { val === true ? this.props.togglePetPreference('dog') : this.props.togglePetPreference('cat')}}
                disabled={false}
                style={{margin: 6}}
              />
              <Text>Dog</Text>
            </View>
          </View>
          <View style={styles.detailsWrapper}>
            <Text>Age</Text>
            <View style={styles.ageWrapper}>
              <TextInput
                value={ this.props.ageRange.min === 0 ? 'min': this.props.ageRange.min.toString()}
                style={styles.ageInput}
                editable={true}
                onChangeText={text => this.props.updateMinAge(text)}
                onBlur={() => {this.props.ageRange.min === '' && this.props.updateMinAge(0)}}
                keyboardType={'numeric'}
                />
              <TextInput
                value={this.props.ageRange.max === 0 ? 'max' : this.props.ageRange.max.toString()}
                style={styles.ageInput}
                editable={true}
                onChangeText={text => this.props.updateMaxAge(text)}
                onBlur={() => {this.props.ageRange.max === '' && this.props.updateMaxAge(0)}}
                keyboardType={'numeric'}
                />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },

  profileWrapper: {
    flex: 1,
  },

  detailsContainer: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },

  profile: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10
  },

  header: {
    fontSize: 25
  },

  petSelect: {
    flexDirection: 'row',
  },

  detailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },

  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  ageWrapper: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  ageInput: { 
    height: 40, 
    width: 100, 
    borderColor: '#d6d7da',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 6
  }
})

const mapStateToProps = state => {
  return { profile, typePreference, ageRange} = state.user.userSettings;
};

const mapDispatchToProps = dispatch => ({
  fetchInitialSettings: () => dispatch(fetchInitialSettings()),
  updateProfile: val => dispatch(updateProfile(val)),
  updateMinAge: val => dispatch(updateMinAge(val)),
  updateMaxAge: val => dispatch(updateMaxAge(val)),
  togglePetPreference: val => dispatch(togglePetPreference(val))
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
