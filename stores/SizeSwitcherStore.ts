import { makeAutoObservable } from 'mobx';
import { RootStore } from '@stores/RootStore';

export function sizeSwitcherStoreFactory(root: RootStore) {
  return makeAutoObservable({
    makeStopwatchSmall: () => {
      root.counterStore.size = 'SMALL';
    },

    makeStopwatchBig: () => {
      root.counterStore.size = 'BIG';
    }
  })
}