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

  makeTags = (tags) => {
    if (!tags || tags.length === 0) { return '';}

    return ' | ' + tags.map((tag) => tag.name).join(', ');
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <SectionList
          sections={this.props.screenProps.purchases}
          renderItem={({item}) => <Text style={styles.item}>{item.cost}¢ | {item.description}{this.makeTags(item.tags)}</Text>}
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
    flexWrap: 'nowrap',
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#6bbce5',
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    fontWeight: 'bold',
  }
});
