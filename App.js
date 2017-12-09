import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { getClientInformation, login } from './src/Auth';
import { StackNavigator } from 'react-navigation';

class URLScreen extends React.Component {
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
                  url: this.state.text
                });
              })
              .catch(err => {
                this.setState({
                  errorMessage: `No ghost admin-panel in "${
                    this.state.text
                  }" found.`
                });
              });
          }}
        />
      </KeyboardAvoidingView>
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
        {this.state.errorMessage && (
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        )}
        <Button
          title="Next"
          onPress={() => {
            const { params } = this.props.navigation.state;
            login(
              this.state.email,
              this.state.password,
              params.url,
              params.clientSecret,
              params.clientId
            )
              .then(data => {
                console.log(data);
                if (data.access_token) {
                  AsyncStorage.setItem(
                    'userInfo',
                    JSON.stringify({
                      email: this.state.email,
                      url: params.url,
                      ...data
                    })
                  )
                    .then(() => this.props.navigation.navigate('PostList'))
                    .catch(err => console.log(err));
                } else {
                  this.setState({ errorMessage: 'Wrong email or password.' });
                }
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  errorMessage: 'Please check you network connection.'
                });
              });
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  },
  text: {
    color: 'grey'
  },
  errorText: {
    color: 'red'
  }
});

const RootNavigator = StackNavigator({
  URL: {
    screen: URLScreen
  },
  Login: {
    screen: LoginScreen
  },
  PostList: {
    screen: PostList
  }
});

export default RootNavigator;
