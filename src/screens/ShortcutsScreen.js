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
import { FontAwesome } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react/native';
import shotcuts from '../Shortcuts';

import { LightGrey, DarkGrey } from '../Colors';

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
    var {
      showShortcuts,
      allShortcuts,
      disabledShortcuts,
    } = this.props.store.uiStore;

    return (
      <View style={styles.container}>
        <Switch
          value={showShortcuts}
          onValueChange={() =>
            (this.props.store.uiStore.showShortcuts = !showShortcuts)
          }
        />
        <FlatList
          data={allShortcuts}
          keyExtractor={item => item.name}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  padding: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                }}
              >
                <FontAwesome name={item.icon} size={24} color={DarkGrey} />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 22,
                    color: '#15171a',
                    fontWeight: '300',
                    padding: 8,
                  }}
                >
                  {item.name}
                </Text>
                <Switch
                  value={item.enabled}
                  onValueChange={() => {
                    if (item.enabled) {
                      disabledShortcuts.push(item.name);
                    } else {
                      const i = disabledShortcuts.indexOf(item.name);
                      if (i != -1) {
                        disabledShortcuts.splice(i, 1);
                      }
                    }
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightGrey,
  },
});

export default ShortcutsScreen;
