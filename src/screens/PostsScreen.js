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
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { observer, inject } from 'mobx-react/native';

import { getClientInformation, login } from '../Auth';
import { Red, MidGrey, DarkGrey, LightGrey } from '../Colors';

@inject('store')
@observer
class PostList extends React.Component {
  static navigationOptions = {
    title: 'Your stories',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-paper' : 'ios-paper-outline'}
        size={32}
        color={tintColor}
      />
    ),
    headerRight: (
      <TouchableOpacity>
        <LinearGradient
          colors={['#a9d142', '#9abf3b']}
          style={{
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontWeight: '400',
              color: '#fff',
              textShadowColor: '#000',
              textShadowRadius: 1,
            }}
          >
            New story
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.store.postStore.fetchPosts();
  }

  render() {
    if (!this.props.store.postStore.posts) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <SafeAreaView style={{ backgroundColor: LightGrey }}>
        <FlatList
          style={{ backgroundColor: LightGrey }}
          refreshing={this.props.store.postStore.fetchingPosts}
          onRefresh={this.props.store.postStore.fetchPosts}
          automaticallyAdjustContentInsets={true}
          data={this.props.store.postStore.posts}
          keyExtractor={item => item.uuid}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Editor', item)}
              underlayColor={MidGrey}
              style={{
                margin: 8,
                marginTop: index === 0 ? 8 : 0,
                backgroundColor: 'white',
                borderRadius: 4,
                overflow: 'hidden',
              }}
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
                    style={{
                      fontSize: 22,
                      color: '#15171a',
                      fontWeight: '600',
                    }}
                  >
                    {item.title}{' '}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: '300',
                      paddingBottom: 8,
                      color: '#15171a',
                      letterSpacing: 0.2,
                    }}
                  >
                    {item.plaintext}
                  </Text>
                  <Text
                    style={{
                      color: '#738a94',
                      fontWeight: '300',
                      letterSpacing: 0.2,
                    }}
                  >
                    <Text
                      style={{
                        color: item.status === 'draft' ? Red : '#15171a',
                      }}
                    >
                      {item.status}
                    </Text>{' '}
                    by{' '}
                    <Text style={{ color: '#15171a' }}>{item.author.name}</Text>{' '}
                    - {moment(item.published_at).from(moment.utc())}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
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
