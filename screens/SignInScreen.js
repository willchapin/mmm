import React from 'react';

import { AsyncStorage } from 'react-native';
import { SignInUp } from '../components/SignInUp';
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
    } else {
      alert('Invalid email or password');
    }
  };

  render() {
    return (
      <SignInUp
        navigation={this.props.navigation}
        setField={(name, value) => this.setState({[name]: value })}
        onSubmit={this.signin}
        buttonText="Sign in"
        bottomText={{
          navigateTo: "SignUp",
          question: "Not one of us? ",
          verb: "Sign up",
          noun: " for an account",
        }}
      />
    );
  }
}