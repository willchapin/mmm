import React from 'react';
import { AsyncStorage } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import _fetch from '../tasks/fetch';

export default class MainTabNavigatorWrap extends React.Component {
  static router = MainTabNavigator.router;

  getInitialField = () => {
    return {
      value: '',
      error: null
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      purchases: [],
      description: this.getInitialField(),
      cost: this.getInitialField()
    };
  }

  componentDidMount = async() => {
    const userId = await AsyncStorage.getItem('userId')

    const json = await _fetch({
      path: `users/${userId}/purchases`,
      method: 'GET'
    });

    if (!json.error) {
      this.setState({
        purchases: json,
      });
    }
  }

  updateStateAndReset = (purchase) => {
    // add purchase and reset description / cost
    const purchases = [...this.state.purchases];
    purchases.push(purchase);

    this.setState({
      purchases,
      description: this.getInitialField(),
      cost: this.getInitialField()
    });
  }

  onSave = async () => {
    const userId = await AsyncStorage.getItem('userId');

    const json = await _fetch({
      path: `users/${userId}/purchases`,
      method: 'POST',
      body: JSON.stringify({
        description: this.state.description.value,
        cost: this.state.cost.value,
        tagIds:[1,2,3],
      }),
    });

    if (json.error) {
      const newState = {...this.state};

      json.error.details.forEach((error) => {
        newState[error.path[0]].error = error.message;
      });

      this.setState(newState);
    } else {
      this.updateStateAndReset(json);
      this.props.navigation.navigate('ListStack');
    }
  }

  formatPurchases = (purchase) => {
    return purchase;
  }

  render() {
    return (
      <MainTabNavigator
        navigation={this.props.navigation}
        screenProps={{
          purchases: this.formatPurchases(this.state.purchases),
          description: this.state.description,
          cost: this.state.cost,
          updateFieldValue: (name, value) => {this.setState({[name]: value})},
          onSave: this.onSave,
        }}
      />
    );
  }
}