import React from 'react';

import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';


export class SignInUp extends React.Component {
  // TODO: stateless func?
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, styles.text]} 
          keyboardType="email-address"
          autoCorrect={false}
          placeholder="email"
          onChangeText={(email) => this.props.setField('email', email)}
        />
        <TextInput 
          style={[styles.input, styles.text]} 
          secureTextEntry={true}
          autoCorrect={false}
          placeholder="password"
          onChangeText={(password) => this.props.setField('password', password)}
        />
        {this.getUserNameInput()}
        <TouchableOpacity
          style={[styles.input, styles.button]} 
          onPress={this.props.onSubmit}
        >
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableOpacity>

        <View style={styles.signup}>
          <Text style={styles.signupText}>{this.props.bottomText.question}</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate(this.props.bottomText.navigateTo)}}>
              <Text style={[styles.signupText, styles.signupButton]}>{this.props.bottomText.verb}</Text>
            </TouchableOpacity>
          <Text style={styles.signupText}>{this.props.bottomText.noun}</Text>
        </View>
      </View>
    );
  }

  getUserNameInput = () => {
    if (this.props.showUserName) {
      return (<TextInput
        style={[styles.input, styles.text]} 
        autoCorrect={false}
        placeholder="username"
        onChangeText={(name) => this.props.setField('name', name)}
      />)
    } else {
      return "";
    }
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
