import { CounterStore, counterStoreHydration } from '@stores/CounterStore';
import { SizeSwitcherStoreFactory } from '@stores/SizeSwitcherStore';

export type RootHydrationData = {
  counterStoreHydration: counterStoreHydration;
}

export class RootStore {
  counterStore: CounterStore;
  sizeSwitcherStore: ReturnType<typeof SizeSwitcherStoreFactory>

  constructor() {
    this.counterStore = new CounterStore(this);
    this.sizeSwitcherStore = SizeSwitcherStoreFactory(this);
  }

  hydrate(data: RootHydrationData) {
    if (data.counterStoreHydration)
      this.counterStore.hydrate(data.counterStoreHydration);
  }
}