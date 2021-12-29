import { RootHydrationData, RootStore } from "@stores/RootStore"
import { enableStaticRendering } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react"

enableStaticRendering(typeof window === 'undefined');

let store: RootStore;
const RootContext = createContext<RootStore | undefined>(undefined);

export const useRootStore = () => {
  const context = useContext(RootContext);

  if (context === undefined) throw new Error('fuck!');

  return context;
}

export const useCounterStore = () => {
  const { counterStore } = useRootStore();
  return counterStore;
}

export const useSizeSiwtcherStore = () => {
  const { sizeSwitcherStore } = useRootStore();
  return sizeSwitcherStore;
}

export const RootStoreProvider = ({
  children,
  hydrationData
}: {
  children: ReactNode,
  hydrationData?: RootHydrationData
}) => {
  store = initiateStore(hydrationData);

  return (
    <RootContext.Provider value={store}>
      {children}
    </RootContext.Provider>
  )
}

function initiateStore(initialData?: RootHydrationData): RootStore {
  let _store = store ?? new RootStore();

  if (initialData)
    _store.hydrate(initialData);

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
}