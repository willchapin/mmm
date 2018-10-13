import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigatorWrap from './MainTabNavigatorWrap';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  Main: MainTabNavigatorWrap,
}, {
  initialRouteName: 'AuthLoading',
});