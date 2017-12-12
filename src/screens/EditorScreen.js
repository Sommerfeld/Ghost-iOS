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
  TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { FontAwesome } from '@expo/vector-icons';

import { LightGrey, GhostBlue, MidGrey, White, DarkGrey } from '../Colors';

@inject('store')
@observer
class EditorScreen extends React.Component {
  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    console.log(params);
    const markdown = JSON.parse(params.mobiledoc).cards[0][1].markdown;
    this.state = {
      text: markdown,
      title: params.title,
      selection: { start: 0, end: 0 },
    };
  }

  performShortcut = shortcut => {
    const { text, selection: { start, end } } = this.state;
    if (shortcut.type === 'annotateWords') {
      const mid = text.substring(start, end);
      const newCourser = mid.length ? end : end - shortcut.syntax.length;
      this.setState({
        text: `${text.substring(0, start)}${shortcut.syntax}${mid}${
          shortcut.syntax
        }${text.substring(end, text.length)}`,
        selection: {
          start: newCourser,
          end: newCourser,
        },
      });
    } else {
      alert(`unhandelt shortcut "${shortcut.name}"`);
    }
  };

  render() {
    const {
      showShortcuts,
      darkEditor,
      markdownShortcuts,
    } = this.props.store.uiStore;

    console.log(this.state.selection);

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={88}
        behavior="padding"
        style={styles.container}
      >
        <TextInput
          style={styles.titleInput}
          value={this.state.title}
          onChangeText={title => this.setState({ title })}
          placeholder="Post Title"
        />
        <TextInput
          style={darkEditor ? styles.textInputDark : styles.textInput}
          selectioncolor={GhostBlue}
          keyboardAppearance={darkEditor ? 'dark' : 'light'}
          dataDetectorTypes={'none'}
          value={this.state.text}
          selection={this.state.selection}
          onSelectionChange={event =>
            this.setState({ selection: event.nativeEvent.selection })
          }
          onChangeText={text => this.setState({ text })}
          placeholder="Write our awesome story"
          multiline
        />
        {showShortcuts && (
          <View style={styles.buttonBar}>
            {markdownShortcuts.map(shortcut => (
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center' }}
                onPress={() => this.performShortcut(shortcut)}
              >
                <View>
                  <FontAwesome
                    name={shortcut.icon}
                    size={24}
                    color={DarkGrey}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightGrey,
  },
  textInput: {
    flex: 1,
    backgroundColor: White,
    padding: 8,
    fontSize: 16,
  },
  textInputDark: {
    flex: 1,
    backgroundColor: DarkGrey,
    color: White,
    padding: 8,
    fontSize: 16,
  },
  titleInput: {
    backgroundColor: MidGrey,
    fontSize: 22,
    color: White,
    fontWeight: '600',
    height: 50,
    padding: 8,
  },
  buttonBar: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default EditorScreen;
