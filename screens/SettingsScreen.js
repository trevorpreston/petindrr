import React, { Component } from 'react';
import { Text, ScrollView, View, TextInput, Switch} from 'react-native';

import { connect } from 'react-redux';
import { fetchInitialSettings, updateProfile } from '../reducer';


class SettingsScreen extends Component {
  componentDidMount() {
    this.props.fetchInitialSettings()
    console.log('TEST')
    console.log(this.props.userSettings)
  }

  updateProfile(text) {
    console.log(text)

    this.props.updateProfile(text)
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
            onChangeText={text => this.updateProfile(text)}/>
          <Text>Preferences</Text>
          <Text>Cat</Text>
          <Switch
            disabled={false}
          />
          <Text>Dog</Text>
          <Text>Age</Text>
          <TextInput 
          style={{height: 40, width: 50, borderColor: 'gray', borderWidth: 1}}/>
          <TextInput style={{height: 40, width: 50, borderColor: 'gray', borderWidth: 1}} />
        </View>
        {/* <Text>{JSON.stringify(this.props.userSettings)}</Text> */}

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
  updateProfile: (val) => dispatch(updateProfile(val))
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
