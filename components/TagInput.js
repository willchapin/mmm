import React from 'react';
import { TextInput } from 'react-native';

export class TagInput extends React.Component {
  render() {
    return <TextInput 
      autoCorrect={false}
      placeholder="+ Add tag"
      onChangeText={this.props.onChangeText}
      style={{
        fontSize: 20,
        fontWeight: '300',
      }}
      value={this.props.value} 
    />
  }
}
