import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export function SizeSwitcherStoreFactory (root: RootStore) {
  return makeAutoObservable({
    setSizeToBig: () => {
      root.counterStore.size = 'BIG';
    },

    setSizeToSmall: () => {
      root.counterStore.size = 'SMALL';
    }
  });
}