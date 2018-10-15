import React from 'react';
import { Text, ScrollView, StyleSheet, FlatList, SectionList, View } from 'react-native';

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
        <SectionList
          sections={this.props.screenProps.purchases}
          renderItem={({item}) => <Text style={styles.item}>{item.cost}¢ | {item.description}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(_, index) => index}
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
  sectionHeader: {
    fontWeight: 'bold',
  }
});
