import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';

import _fetch from '../tasks/fetch';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

const ListStack = createStackNavigator({
  List: ListScreen,
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  )
};

const Navigator = createBottomTabNavigator({
  HomeStack,
  ListStack,
});

export default class MainTabNavigator extends React.Component {
  static router = Navigator.router;

  initialDescription = {
    value: '',
    error: null
  };

  initialCost = {
    value: '',
    error: null
  };

  constructor(props) {
    super(props);

    this.state = {
      purchases: [],
      description: {...this.initialDescription},
      cost: {...this.initialCost}
    };
  }

  updateDescription = (description) => {
    this.setState({description: {value: description}});
  };

  updateCost = (cost) => {
    this.setState({cost: {value: cost}});
  };

  async componentDidMount() {
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

  async onSave() {
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
      this.updateState(json);
      this.props.navigation.navigate('ListStack');
    }
  }

  updateState(purchase) {
    // add purchase and reset description / cost
    const purchases = [...this.state.purchases];
    purchases.push(purchase);

    this.setState({
      purchases,
      description: this.initialDescription,
      cost: this.initialCost
    });
  }

  render() {
    return (
      <Navigator
        navigation={this.props.navigation}
        screenProps={{
          purchases: this.state.purchases,
          description: this.state.description,
          cost: this.state.cost,
          updateDescription: this.updateDescription.bind(this),
          updateCost: this.updateCost.bind(this),
          onSave: this.onSave.bind(this),
        }}
      />
    );
  }
}