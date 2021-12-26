import { RootStore, RootStoreHydration } from '@stores/RootStore';
import { enableStaticRendering } from 'mobx-react-lite';
import { createContext, ReactNode, useContext, useEffect } from 'react';

enableStaticRendering(typeof window === 'undefined');

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

export function useRootStore() {
  const context = useContext(StoreContext);

  if (context === undefined)
    throw new Error('useRootStore must be used within RootStoreProvider');

  return context;
}

export function useCounterStore() {
  const { counterStore } = useRootStore();
  return counterStore;
}

export function useSizeSwitcherStore() {
  const { sizeSwitcherStore } = useRootStore();
  return sizeSwitcherStore;
}

export const RootStoreProvider = ({
  children,
  hydrationData
}: {
  children: ReactNode,
  hydrationData?: RootStoreHydration
}) => {
  store = initializeStore(hydrationData);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore;

  if (initialData) {
    _store.hydrate(initialData);
  }

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
}