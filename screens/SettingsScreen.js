import React, { Component } from 'react';
import { Text, ScrollView, View, TextInput, Switch} from 'react-native';

import { connect } from 'react-redux';
import { fetchInitialSettings, updateProfile, updateMinAge, updateMaxAge } from '../reducer';


class SettingsScreen extends Component {
  componentDidMount() {
    this.props.fetchInitialSettings()
    console.log('hi', this.props.userSettings)
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Adopter Profile</Text>
          <TextInput 
            value={this.props.userSettings && this.props.userSettings.profile }
            editable={true}
            multiline={true}
            onChangeText={text => this.props.updateProfile(text)}/>
          <Text>Preferences</Text>
          <Text>Cat</Text>
          <Switch
            disabled={false}
          />
          <Text>Dog</Text>
          <Text>Age</Text>
          <TextInput
            value={this.props.userSettings && this.props.userSettings.ageRange.min.toString()}
            style={{height: 40, width: 50, borderColor: 'gray', borderWidth: 1}}
            editable={true}
            onChangeText={text => this.props.updateMinAge(text)}
            onBlur={() => {this.props.userSettings && this.props.userSettings.ageRange.min === '' && this.props.updateMinAge(0)}}
            keyboardType={'numeric'}
            />
          <TextInput
            value={this.props.userSettings && this.props.userSettings.ageRange.max.toString()}
            style={{height: 40, width: 50, borderColor: 'gray', borderWidth: 1}}
            editable={true}
            onChangeText={text => this.props.updateMaxAge(text)}
            onBlur={() => {this.props.userSettings && this.props.userSettings.ageRange.max === '' && this.props.updateMaxAge(0)}}
            keyboardType={'numeric'}
            />
        </View>
      </ScrollView>
    )
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const mapStateToProps = state => {
  return { userSettings } = state;
};

const mapDispatchToProps = dispatch => ({
  fetchInitialSettings: () => dispatch(fetchInitialSettings()),
  updateProfile: val => dispatch(updateProfile(val)),
  updateMinAge: val => dispatch(updateMinAge(val)),
  updateMaxAge: val => dispatch(updateMaxAge(val))
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
