import React from 'react';
import { AsyncStorage, Text, ScrollView, StyleSheet, FlatList, View } from 'react-native';
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
    const [userId, token] = await Promise.all([
      AsyncStorage.getItem('userId'),
      AsyncStorage.getItem('token'),
    ]);

    const response = await fetch(
      `https://4e08607d.ngrok.io/users/${userId}/purchases`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    const json = await response.json();

    if (!json.error) {
      this.setState({
        purchases: json,
      });
    }
  }
  
  render() {

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.purchases}
          renderItem={({item}) => {
            return (
              <View key={item.id} style={styles.row}>
                <Text style={{flex: 1}}>
                  { new Date(item.timestamp).toDateString() }
                </Text>
                <Text style={{flex: 1}}>
                  { item.description }
                </Text>
                <Text style={{flex: 1}}>
                  { item.cost }
                </Text>
              </View>
            );
          }}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});
