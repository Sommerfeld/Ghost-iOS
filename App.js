import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getClientInformation } from './src/Auth';
import { StackNavigator } from 'react-navigation';

class URLScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Blogadress</Text>
        <TextInput
          placeholder={'https://demo.ghost.io'}
          style={styles.textinput}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          keyboardType={'url'}
          autoCapitalize={'none'}
        />
        {this.state.errorMessage && (
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        )}
        <Button
          title="Next"
          onPress={() => {
            getClientInformation(this.state.text)
              .then(data => {
                console.log(data);
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
      </View>
    );
  }
}
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          keyboardAppearance="dark"
          placeholder={'email'}
          placeholderTextColor={'grey'}
          style={styles.textinput}
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          returnKeyType={'next'}
          onSubmitEditing={() => {
            this.textinput2.focus();
          }}
        />
        <TextInput
          keyboardAppearance="dark"
          ref={textInput => {
            this.textinput2 = textInput;
          }}
          placeholder={'password'}
          placeholderTextColor={'grey'}
          style={styles.textinput}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          keyboardType={'default'}
          autoCapitalize={'none'}
          secureTextEntry={true}
          returnKeyType={'done'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 350,
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

const RootNavigator = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  URL: {
    screen: URLScreen,
  },
});

export default RootNavigator;
