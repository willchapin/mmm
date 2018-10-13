import React from 'react';
import { AsyncStorage, Button, Text, View, StyleSheet } from 'react-native';
import { MinimalTextInput } from '../components/MinimalTextInput'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>I bought a </Text>
        <MinimalTextInput
          autoCorrect={false}
          onChangeText={(description) => this.props.screenProps.updateDescription(description)}
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
          onChangeText={(cost) => this.props.screenProps.updateCost(cost)}
          value={this.props.screenProps.cost.value}
          error={this.props.screenProps.cost.error}
        />
        <Text style={styles.text}>cents just now.</Text>
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
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#6bbce5',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 80,
    fontWeight: '100'
  }
});
