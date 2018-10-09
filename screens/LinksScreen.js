import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  static navigationOptions = {
    title: 'Links',
  };

  async componentDidMount() {

    const response = await fetch(
      'https://4e08607d.ngrok.io/users/9',
      {
        method: 'GET',
        //body: JSON.stringify({
        //  email: 'tommywiseau@ohhimark.says',
        //  password: 'Tommy123',
        //}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 0a4c1aee7e85f92ff95194332489028b',
        }
      }
    );

    const json = await response.json();
    alert(JSON.stringify(json));

    // const response = await fetch('https://facebook.github.io/react-native/movies.json');
    // const json = await response.json();
    // this.setState({
    //   movies: json.movies,
    // });
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
        <Text>HIHIHIH</Text>
        { this.state.movies.map(movie => (<Text key={movie.id}>{ movie.title }</Text>)) }
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
