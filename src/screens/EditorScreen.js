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
import { ImagePicker } from 'expo';
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

  performShortcut = async shortcut => {
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
    } else if (shortcut.name === 'picture') {
      const imageData = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        base64: true,
      });
      if (imageData.cancelled === false) {
        var formData = new FormData();
        formData.append('uploadimage', {
          uri: imageData.uri,
          name: imageData.uri.split('/').pop(),
          type: 'image/jpg',
        });
        const data = await AsyncStorage.getItem('userInfo');
        const clientInfo = JSON.parse(data);
        const res = await fetch(
          'http://207.154.225.34/ghost/api/v0.1/uploads/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${clientInfo.access_token}`,
            },
            body: formData,
          }
        );
        if (res.status === 200) {
          const imageurl = await res.text();
          const mid = text.substring(start, end);
          const newCourser = mid.length ? end : end - imageurl.length - 3;
          this.setState(
            {
              text: `${text.substring(
                0,
                start
              )}![${mid}](${imageurl})${text.substring(end, text.length)}`,
              selection: {
                start: newCourser,
                end: newCourser,
              },
            },
            () => {
              this.textInput.focus();
            }
          );
        }
      }
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
          ref={textInput => (this.textInput = textInput)}
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
                key={shortcut.name}
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
