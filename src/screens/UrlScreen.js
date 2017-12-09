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
import { getClientInformation, login } from '../Auth';

class UrlScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <Text style={styles.text}>Blogadress</Text>
        </View>
        <TextInput
          placeholder={'https://demo.ghost.io'}
          style={styles.textinput}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          keyboardType={'url'}
          autoCapitalize={'none'}
          returnKeyType={'done'}
        />
        {this.state.errorMessage && (
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        )}
        <Button
          title="Next"
          onPress={() => {
            getClientInformation(this.state.text)
              .then(data => {
                this.props.navigation.navigate('Login', {
                  ...data,
                  url: this.state.text,
                });
              })
              .catch(err => {
                this.setState({
                  errorMessage: `No ghost admin-panel in "${
                    this.state.text
                  }" found.`,
                });
              });
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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

export default UrlScreen;
