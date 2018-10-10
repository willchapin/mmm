import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
import { SignInScreen } from '../screens/SignInScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  Main: MainTabNavigator,
}, {
  initialRouteName: 'AuthLoading',
});