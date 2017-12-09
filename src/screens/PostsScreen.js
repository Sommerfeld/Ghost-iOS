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
  TouchableHighlight,
} from 'react-native';
import { Svg } from 'expo';
import moment from 'moment';
import { getClientInformation, login } from '../Auth';

class PostList extends React.Component {
  static navigationOptions = {
    title: 'Your stories',
    tabBarIcon: ({ tintColor }) => (
      <Svg width={32} height={32}>
        <Svg.Path
          d="M28.688 0H3.313c-.375 0-.625.313-.625.688v30.625c0 .375.25.688.625.688h25.375c.375 0 .625-.313.625-.688V.688c0-.375-.25-.688-.625-.688zM28 30.688H4V1.313h3.313v1.375h-.625v2.625h2.625V2.688h-.625V1.313h4v1.375H12v2.625h2.688V2.688H14V1.313h4v1.375h-.688v2.625H20V2.688h-.688V1.313h4v1.375h-.625v2.625h2.625V2.688h-.625V1.313H28zM23.313 9.313H8.688c-.375 0-.688.313-.688.688s.313.688.688.688h14.625c.375 0 .688-.313.688-.688s-.313-.688-.688-.688zm0 4H8.688c-.375 0-.688.313-.688.688s.313.688.688.688h14.625c.375 0 .688-.313.688-.688s-.313-.688-.688-.688zm0 4H8.688c-.375 0-.688.313-.688.688s.313.688.688.688h14.625c.375 0 .688-.313.688-.688s-.313-.688-.688-.688zm0 4H8.688c-.375 0-.688.313-.688.688s.313.688.688.688h14.625c.375 0 .688-.313.688-.688s-.313-.688-.688-.688zm0 4H8.688c-.375 0-.688.313-.688.688s.313.688.688.688h14.625c.375 0 .688-.313.688-.688s-.313-.688-.688-.688z"
          stroke="none"
          fill={tintColor}
        />
      </Svg>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    this.setState({ refreshing: true });

    try {
      const data = await AsyncStorage.getItem('userInfo');
      const clientInfo = JSON.parse(data);
      const { posts } = await fetch(
        `${
          clientInfo.url
        }/ghost/api/v0.1/posts/?status=all&include=author,tags&formats=plaintext`,
        {
          headers: {
            Authorization: `Bearer ${clientInfo.access_token}`,
          },
        }
      ).then(res => res.json());
      this.setState({ posts });
    } catch (error) {
      console.error(error);
    }

    this.setState({ refreshing: false });
  };

  render() {
    if (!this.state.posts) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this.fetchPosts}
        automaticallyAdjustContentInsets={true}
        data={this.state.posts}
        keyExtractor={item => item.uuid}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Editor')}
            underlayColor="#9cd7f7"
            style={{ margin: 8, backgroundColor: 'white' }}
          >
            <View>
              {item.feature_image && (
                <Image
                  style={{ width: '100%', aspectRatio: 21 / 9 }}
                  source={{ uri: item.feature_image }}
                />
              )}
              <View style={{ padding: 8 }}>
                <Text
                  style={{ fontSize: 22, color: '#15171a', fontWeight: '600' }}
                >
                  {item.title}{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: '300', paddingBottom: 8 }}
                >
                  {item.plaintext}
                </Text>
                <Text style={{ color: '#738a94', fontWeight: '300' }}>
                  <Text
                    style={{ color: item.status === 'draft' ? 'red' : 'black' }}
                  >
                    {item.status}
                  </Text>{' '}
                  by {item.author.name} -{' '}
                  {moment(item.published_at).from(moment.utc())}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
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

export default PostList;
