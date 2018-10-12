import React from 'react';

import {
  AsyncStorage,
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';

export class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signin = async () => {

    const body = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    const response = await fetch(
      'https://573f7f58.ngrok.io/login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      }
    );

    const json = await response.json();

    if (json.userId && json.token) {
      await Promise.all([
        AsyncStorage.setItem('userId', json.userId.toString()),
        AsyncStorage.setItem('token', json.token.toString()),
      ]);

      this.props.navigation.navigate('AuthLoading');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input} 
          autoCorrect={false}
          placeholder="email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput 
          style={styles.input} 
          autoCorrect={false}
          placeholder="password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <Button title="Sign in!" onPress={this.signin} />
        <Button title="Sign in!" onPress={this.signin} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#467',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  input: {
    fontSize: 30,
    fontStyle: 'italic',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
