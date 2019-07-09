import React, { Component } from 'react';
import { Text, ScrollView, View, TextInput, Switch} from 'react-native';

import { connect } from 'react-redux';
import { fetchInitialSettings, updateProfile, updateMinAge, updateMaxAge, togglePetPreference } from '../reducers/userReducer';


class SettingsScreen extends Component {
  componentDidMount() {
    this.props.fetchInitialSettings()
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Adopter Profile</Text>
          <TextInput 
            value={this.props.profile}
            editable={true}
            multiline={true}
            onChangeText={text => this.props.updateProfile(text)}/>
          <Text>Preferences</Text>
          <Text>Cat</Text>
          <Switch
            value={this.props.typePreference === 'dog' ? true: false}
            onValueChange={(val) => { val === true ? this.props.togglePetPreference('dog') : this.props.togglePetPreference('cat')}}
            disabled={false}
          />
          <Text>Dog</Text>
          <Text>Age</Text>
          <TextInput
            value={this.props.ageRange.min.toString()}
            style={{height: 40, width: 50, borderColor: 'gray', borderWidth: 1}}
            editable={true}
            onChangeText={text => this.props.updateMinAge(text)}
            onBlur={() => {this.props.ageRange.min === '' && this.props.updateMinAge(0)}}
            keyboardType={'numeric'}
            />
          <TextInput
            value={this.props.ageRange.max.toString()}
            style={{height: 40, width: 50, borderColor: 'gray', borderWidth: 1}}
            editable={true}
            onChangeText={text => this.props.updateMaxAge(text)}
            onBlur={() => {this.props.ageRange.max === '' && this.props.updateMaxAge(0)}}
            keyboardType={'numeric'}
            />
        </View>
      </ScrollView>
    )
  }
}

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
