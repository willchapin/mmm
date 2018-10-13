import React from 'react';
import { Text, ScrollView, StyleSheet, FlatList, View } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  formatDate = (timestamp) => {
    const isoDate = new Date(timestamp).toISOString();
    const [date, time] = isoDate.split('T');
    const [h, m] = time.split(':');

    return h + ':' + m + ' ' + date;
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.props.screenProps.purchases}
          renderItem={({item}) => {
            return (
              <View key={item.id} style={styles.row}>
                <Text style={styles.item}>
                  { item.cost }
                </Text>
                <Text style={styles.item}>
                  { item.description }
                </Text>
                <Text style={{flex: 2}}>
                  { this.formatDate(item.timestamp) }
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
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#6bbce5',
    width: '100%',
    height: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
});
