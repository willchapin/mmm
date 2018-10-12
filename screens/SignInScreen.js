import React from 'react';

import {
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

export class SignInScreen extends React.Component {

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
      'https://4e08607d.ngrok.io/login',
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
          style={[styles.input, styles.text]} 
          autoCorrect={false}
          placeholder="email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput 
          style={[styles.input, styles.text]} 
          autoCorrect={false}
          placeholder="password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <TouchableOpacity
          style={[styles.input, styles.button]} 
          onPress={this.signin}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      
        <View style={styles.signup}>
          <Text style={styles.signupText}>Not one of us? </Text>
            <TouchableOpacity onPress={() => {return; this.props.navigation.navigate('SignUp')}}>
              <Text style={[styles.signupText, styles.signupButton]}>Sign up</Text>
            </TouchableOpacity>
          <Text style={styles.signupText}> for an account</Text>
        </View>
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
    backgroundColor: '#689',
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
  },
  text: {
    color: '#ccc',
    fontSize: 20,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#467',
    fontSize: 20,
  },
  signup: {
    marginTop: 5,
    flexDirection: 'row',
  },
  signupText: {
    fontWeight: '200',
    color: '#bbb',
  },
  signupButton: {
    fontWeight: '400',
  },
});
