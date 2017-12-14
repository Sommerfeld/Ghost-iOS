import { AsyncStorage } from 'react-native';
import { observable, action, runInAction, autorun } from 'mobx';

class PostStore {
  @observable posts = [];
  @observable fetchingPosts = false;

  @action
  async fetchPosts() {
    this.fetchingPosts = true;

    try {
      const data = await AsyncStorage.getItem('userInfo');
      const clientInfo = JSON.parse(data);
      const { posts } = await fetch(
        `${
          clientInfo.url
        }/ghost/api/v0.1/posts/?status=all&staticPages=all&include=author,tags&formats=plaintext,mobiledoc`,
        {
          headers: {
            Authorization: `Bearer ${clientInfo.access_token}`,
            'App-Pragma': 'no-cache',
          },
        }
      ).then(res => res.json());
      runInAction(() => {
        this.posts = posts;
      });
    } catch (error) {
      console.error(error);
    }

    this.fetchingPosts = false;
  }
}

export default PostStore;
