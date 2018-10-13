import React from 'react';

import { SignInUp } from '../components/SignInUp';
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

  signUp = async () => {
    const body = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
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
      <SignInUp
        navigation={this.props.navigation}
        showUserName={true}
        setField={(name, value) => this.setState({[name]: value })}
        onSubmit={this.signUp}
        buttonText="Sign up"
        bottomText={{
          navigateTo: "SignIn",
          question: "Already have an account? ",
          verb: "Sign in",
          noun: "",
        }}
      />
    );
  }
}