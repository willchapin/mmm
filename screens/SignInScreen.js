import React from 'react';

import {
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import _fetch from '../tasks/fetch';

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

    const json = await _fetch({
      path: 'login',
      method: 'POST',
      body: body,
      auth: false
    });

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
          keyboardType="email-address"
          autoCorrect={false}
          placeholder="email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput 
          style={[styles.input, styles.text]} 
          secureTextEntry={true}
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp')}}>
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
    backgroundColor: '#6bbce5',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: '#bbb',
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
  },
  text: {
    color: '#555',
    fontSize: 20,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#555',
    fontSize: 20,
  },
  signup: {
    marginTop: 5,
    flexDirection: 'row',
  },
  signupText: {
    fontWeight: '200',
    color: '#555',
  },
  signupButton: {
    fontWeight: '400',
  },
});
