import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider, observer } from 'mobx-react/native';

import { GhostBlue } from './src/Colors';
import store from './src/Store';

import URLScreen from './src/screens/UrlScreen';
import LoginScreen from './src/screens/LoginScreen';
import PostsScreen from './src/screens/PostsScreen';
import EditorScreen from './src/screens/EditorScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ShortcutsScreen from './src/screens/ShortcutsScreen';

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
    Shortcuts: {
      screen: ShortcutsScreen,
    },
  },
  {
    initialRouteName: 'Tabs',
    navigationOptions: {
      headerTintColor: GhostBlue,
      headerStyle: {
        backgroundColor: '#f4f8fb',
      },
    },
  }
);

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
