import { AsyncStorage } from 'react-native';
import { observable, action, runInAction, autorun } from 'mobx';

class UiStore {
  @observable darkEditor = false;
  @observable showShortcuts = true;
  @observable markdownShortcuts = [];
}

export default UiStore;
