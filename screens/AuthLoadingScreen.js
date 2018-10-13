import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';

import _fetch from '../tasks/fetch';

export class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    const userId = await AsyncStorage.getItem('userId');

    const json = await _fetch({
      path: `users/${userId}/auth`,
      method: 'GET',
    });

    this.props.navigation.navigate(json.auth ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
