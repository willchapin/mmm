import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { MinimalTextInput } from '../components/MinimalTextInput'

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.initState = {
      description: {
        value: '',
        error: null
      },
      cost: {
        value: '',
        error: null
      },
    };

    this.state = this.initState;
  }

  static navigationOptions = {
    header: null
  };

  save = async () => {
    const response = await fetch(
      'https://4e08607d.ngrok.io/users/26/purchases',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 0a4c1aee7e85f92ff95194332489028b',
        },
        body: JSON.stringify({
          description: this.state.description.value,
          cost: this.state.cost.value,
          tagIds: [0,1,2]
        }),
      }
    );

    const json = await response.json();

    if (json.error) {
      const newState = {...this.state};

      json.error.details.forEach((error) => {
        newState[error.path[0]].error = error.message;
      });

      this.setState(newState);
    } else {
      this.setState(this.initState);
      this.props.navigation.navigate('ListStack');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>I bought a </Text>
        <MinimalTextInput
          autoCorrect={false}
          onChangeText={(description) => this.setState({description: { value: description }})}
          placeholder='thing'
          value={this.state.description.value}
          error={this.state.description.error}
        />
        <Text style={styles.text}> for </Text>
        <MinimalTextInput 
          autoCorrect={false}
          style={[styles.text, styles.input]}
          keyboardType='numeric'
          returnKeyType='done'
          placeholder='0'
          onChangeText={(cost) => this.setState({cost: { value: cost }})}
          value={this.state.cost.value}
          error={this.state.cost.error}
        />
        <Text style={styles.text}>cents just now.</Text>
        <Button
          onPress={this.save}
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
    backgroundColor: '#467',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 80,
    fontWeight: '100'
  }
});
