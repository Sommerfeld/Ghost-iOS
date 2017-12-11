import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  Image,
  Switch,
} from 'react-native';
import { observer, inject } from 'mobx-react/native';

import { LightGrey } from '../Colors';

@inject('store')
@observer
class ShortcutsScreen extends React.Component {
  static navigationOptions = {
    title: 'Shotcuts',
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    var { showShortcuts } = this.props.store.uiStore;
    return (
      <View style={styles.container}>
        <Switch
          value={showShortcuts}
          onValueChange={() =>
            (this.props.store.uiStore.showShortcuts = !showShortcuts)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
  },
  text: {
    color: 'grey',
  },
  errorText: {
    color: 'red',
  },
});

export default ShortcutsScreen;
