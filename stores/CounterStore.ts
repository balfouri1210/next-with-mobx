import { action, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "@stores/RootStore";

export type counterStoreHydration = {
  start: number;
}

export class CounterStore {
  root: RootStore;
  counter: number = 0;
  size: 'BIG' | 'SMALL' = 'SMALL';
  status: 'STOPPED' | 'STARTED' | 'PAUSED' = 'STOPPED';
  timer: number | undefined;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      counter: observable,
      size: observable,
      status: observable,

      start: action,
      pause: action,
      stop: action,
      resume: action
    })
  }

  start() {
    if (!this.timer)
      this.startInterval();
  }

  pause() {
    this.status = 'PAUSED';
    clearInterval(this.timer);
    this.timer = undefined;
  }

  stop() {
    this.status = 'STOPPED';
    clearInterval(this.timer);
    this.counter = 0;
    this.timer = undefined;
  }

  resume() {
    if (!this.timer)
      this.startInterval();
  }
  
  startInterval() {
    this.status = 'STARTED';
    this.timer = window.setInterval(() => {
      runInAction(() => {
        this.counter += 1;
      })
    }, 1000);
  }

  hydrate(data?: counterStoreHydration) {
    if (data) this.counter = data.start;
  }
}