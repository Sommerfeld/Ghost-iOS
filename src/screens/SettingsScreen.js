import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
  SectionList,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Constants, Util, LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-settings-outline" size={32} color={tintColor} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
  }

  componentDidMount() {
    this.fetchConfig();
  }

  fetchConfig = async () => {
    this.setState({ refreshing: true });

    try {
      const data = await AsyncStorage.getItem('userInfo');
      const clientInfo = JSON.parse(data);
      const json = await fetch(
        `${clientInfo.url}/ghost/api/v0.1/settings/?type=blog`,
        {
          headers: {
            Authorization: `Bearer ${clientInfo.access_token}`,
          },
        }
      ).then(res => res.json());
      const settings = json.settings.reduce((accumulator, currentValue) => {
        accumulator[currentValue.key] = currentValue.value;
        return accumulator;
      }, {});
      settings.url = clientInfo.url;
      this.setState({ settings });
    } catch (error) {
      console.error(error);
    }

    this.setState({ refreshing: false });
  };

  renderBlogItem = ({ item }) => {
    return (
      <TouchableHighlight
        style={{
          margin: 8,
          backgroundColor: '#fff',
          borderRadius: 4,
          overflow: 'hidden',
        }}
        underlayColor="#9cd7f7"
        onPress={() => {}}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            style={{ width: 60, height: 60, padding: 8 }}
            source={{ uri: item.url + item.icon }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 22,
              color: '#15171a',
              fontWeight: '600',
            }}
          >
            {item.title}
          </Text>
          <LinearGradient
            colors={['#4a4a4a', '#33383b']}
            style={{
              margin: 8,
              padding: 4,
              borderRadius: 4,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                backgroundColor: 'transparent',
              }}
            >
              ACTIVE
            </Text>
          </LinearGradient>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <SectionList
        refreshing={this.state.refreshing}
        onRefresh={this.fetchConfig}
        ListFooterComponent={() => (
          <View>
            <Text style={{ color: '#738a94', padding: 8, textAlign: 'center' }}>
              Version {Constants.manifest.version}
              {'\n'}
              Expo Verison {Constants.expoVersion}
              {'\n'}
              Device Year {Constants.deviceYearClass}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={{}}>
            <Text style={{ color: '#738a94', padding: 8 }}>
              {section.title.toUpperCase()}
            </Text>
          </View>
        )}
        automaticallyAdjustContentInsets={true}
        sections={[
          {
            data: this.state.settings ? [this.state.settings] : [],
            title: 'Blogs',
          },
        ]}
        keyExtractor={item => item}
        renderItem={this.renderBlogItem}
      />
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
});

export default SettingsScreen;
