import React from 'react';
import { TextInput } from 'react-native';

export class MinimalTextInput extends React.Component {
  render() {
    return <TextInput 
      autoCorrect={false}
      keyboardType={this.props.keyboardType}
      returnKeyType={this.props.returnKeyType}
      placeholder={this.props.placeholder}
      onChangeText={this.props.onChangeText}
      value={this.props.value}
      style={{
        fontSize: 80,
        fontStyle: 'italic',
        fontWeight: '200',
        borderBottomWidth: this.props.error ? 1 : 0,
        borderBottomColor: 'red',
      }}
    />
  }
}
