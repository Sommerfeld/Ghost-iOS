import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { GhostBlue } from './src/Colors';

import URLScreen from './src/screens/UrlScreen';
import LoginScreen from './src/screens/LoginScreen';
import PostsScreen from './src/screens/PostsScreen';
import EditorScreen from './src/screens/EditorScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const TabsNavigator = TabNavigator(
  {
    PostList: {
      screen: PostsScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: GhostBlue,
    },
  }
);

const RootNavigator = StackNavigator(
  {
    Tabs: {
      screen: TabsNavigator,
    },
    URL: {
      screen: URLScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Editor: {
      screen: EditorScreen,
    },
  },
  {
    initialRouteName: 'Tabs',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4f8fb',
      },
    },
  }
);

export default RootNavigator;
