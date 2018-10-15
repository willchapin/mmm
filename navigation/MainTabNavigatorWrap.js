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
      tagNames: [],
      description: this.getInitialField(),
      cost: this.getInitialField(),
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
    purchases.unshift(purchase);

    this.setState({
      purchases,
      description: this.getInitialField(),
      cost: this.getInitialField(),
      tagNames: []
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
        tagNames: this.state.tagNames,
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

  formatPurchases = (purchases) => {
    const byDate = {};

    purchases.forEach((purchase) => {
      const isoDate = new Date(purchase.timestamp).toISOString();
      const date = isoDate.split('T')[0];

      byDate[date] = byDate[date] || {title: date, data: []};
      byDate[date].data.push(purchase);
    });

    return Object.values(byDate);
  }

  onChangeText = (index, tagName) => {
    let tagNames = this.state.tagNames;

    if (!tagName) { 
      tagNames.splice(index, 1);
    } else {
      tagNames[index] = tagName;
    }

    this.setState({tagNames});
  }

  render() {
    return (
      <MainTabNavigator
        navigation={this.props.navigation}
        screenProps={{
          purchases: this.formatPurchases(this.state.purchases),
          description: this.state.description,
          cost: this.state.cost,
          tagNames: this.state.tagNames,
          onSave: this.onSave,
          updateFieldValue: (name, value) => {this.setState({[name]: {value}})},
          onChangeText: this.onChangeText
        }}
      />
    );
  }
}