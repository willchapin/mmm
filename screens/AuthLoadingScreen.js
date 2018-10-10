import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';

export class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    const [userId, token] = await Promise.all([
      AsyncStorage.getItem('userId'),
      AsyncStorage.getItem('token'),
    ]);

    const loggedin = await fetch(
      `https://4e08607d.ngrok.io/users/${userId}/auth`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    const json = await loggedin.json();

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
