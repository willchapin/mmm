import React from 'react';
import { Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
    };
  }

  static navigationOptions = {
    header: null
  }

  async componentDidMount() {

    const response = await fetch(
      'https://4e08607d.ngrok.io/users/26/purchases',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 0a4c1aee7e85f92ff95194332489028b',
        }
      }
    );

    const json = await response.json();

    this.setState({
      purchases: json,
    });
  }
  
  render() {

    return (
      <ScrollView style={styles.container}>
       <FlatList
          data={this.state.purchases}
          renderItem={({item}) => <Text key={item.id}>{new Date(item.timestamp).toDateString()} | {item.description}</Text>}
          keyExtractor={(item) => item.id.toString() }
        />
      </ScrollView>
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
});
