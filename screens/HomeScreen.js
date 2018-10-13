import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { MinimalTextInput } from '../components/MinimalTextInput'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>I bought a </Text>
          <MinimalTextInput
            autoCorrect={false}
            onChangeText={(description) => this.props.screenProps.updateFieldValue('description', description)}
            placeholder='thing'
            value={this.props.screenProps.description.value}
            error={this.props.screenProps.description.error}
          />
          <Text style={styles.text}> for </Text>
          <MinimalTextInput 
            autoCorrect={false}
            style={[styles.text, styles.input]}
            keyboardType='numeric'
            returnKeyType='done'
            placeholder='0'
            onChangeText={(cost) => this.props.screenProps.updateFieldValue('cost', cost)}
            value={this.props.screenProps.cost.value}
            error={this.props.screenProps.cost.error}
          />
          <Text style={styles.text}> cents just now.</Text>
        </View>
        <Button
          onPress={this.props.screenProps.onSave}
          title="Save"
        >
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#6bbce5',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 40,
    fontWeight: '100',
  }
});
