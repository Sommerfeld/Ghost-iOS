import { AsyncStorage } from 'react-native';
import { observable, action, runInAction, autorun, computed } from 'mobx';
import shortcuts from '../Shortcuts';

class UiStore {
  @observable darkEditor = false;
  @observable showShortcuts = true;
  @observable disabledShortcuts = [];

  @computed
  get markdownShortcuts() {
    return shortcuts.filter(
      shortcut => this.disabledShortcuts.indexOf(shortcut.name) === -1
    );
  }

  @computed
  get allShortcuts() {
    return shortcuts.map(shortcut => {
      return {
        ...shortcut,
        enabled: this.disabledShortcuts.indexOf(shortcut.name) === -1,
      };
    });
  }
}

export default UiStore;
