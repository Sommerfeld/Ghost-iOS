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
    this.state = {
      text: JSON.parse(params.mobiledoc).cards[0][1].markdown,
      title: params.title,
    };
  }

  render() {
    const { showShortcuts, darkEditor } = this.props.store.uiStore;

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
          onChangeText={text => this.setState({ text })}
          placeholder="Write our awesome story"
          multiline
        />
        {showShortcuts && (
          <View style={styles.buttonBar}>
            <TouchableOpacity>
              <FontAwesome name="bold" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="italic" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="header" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="quote-left" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="list-ul" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="list-ol" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="link" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="picture-o" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="camera" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="eye" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="columns" size={24} color={DarkGrey} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="question-circle" size={24} color={DarkGrey} />
            </TouchableOpacity>
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
  },
  textInputDark: {
    flex: 1,
    backgroundColor: DarkGrey,
    color: White,
    padding: 8,
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
