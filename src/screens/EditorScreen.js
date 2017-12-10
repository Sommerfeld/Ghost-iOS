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
} from 'react-native';

class EditorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={88}
        behavior="padding"
        style={styles.container}
      >
        <TextInput
          style={styles.textinput}
          placeholder="Write our awesome story"
          multiline
        />
        <View style={styles.buttonBar} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  textinput: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonBar: {
    height: 50,
  },
});

export default EditorScreen;
