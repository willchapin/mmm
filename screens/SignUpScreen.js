import React from 'react';

import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import _fetch from '../tasks/fetch';

export class SignUpScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  signin = async () => {

    const body = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });

    try {
      const json = await _fetch({
        path: 'users',
        method: 'POST',
        auth: false,
        body
      });

      if (!json.error) {
        this.props.navigation.navigate('SignIn');
      }

    } catch(e) {
      alert('Something went horribly wrong.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType="email-address"
          style={[styles.input, styles.text]} 
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
        <TextInput
          style={[styles.input, styles.text]} 
          autoCorrect={false}
          placeholder="username"
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TouchableOpacity
          style={[styles.input, styles.button]} 
          onPress={this.signin}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      
        <View style={styles.signup}>
          <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignIn')}}>
              <Text style={[styles.signupText, styles.signupButton]}>Sign in</Text>
            </TouchableOpacity>
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
