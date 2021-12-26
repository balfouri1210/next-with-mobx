import { action, observable, makeObservable, runInAction } from 'mobx';
import { RootStore } from '@stores/RootStore';

export type CounterHydration = {
  start: number;
}

export class CounterStore {
  root: RootStore;
  counter: number = 0;
  size: 'BIG' | 'SMALL' = 'SMALL';
  state: 'STOPPED' | 'STARTED' | 'PAUSED' = 'STOPPED';
  timer: number | undefined;

  constructor(root: RootStore) {
    this.root = root;

    makeObservable(this, {
      counter: observable,
      size: observable,
      state: observable,

      start: action,
      pause: action,
      stop: action,
      resume: action,
      hydrate: action
    });
  }

  start() {
    if (!this.timer)
      this.startInterval();
  }

  pause() {
    this.state = 'PAUSED';
    window.clearInterval(this.timer);
  }

  stop() {
    this.state = 'STOPPED';
    window.clearInterval(this.timer);
  }

  resume() {
    this.startInterval();
  }

  startInterval() {
    this.state = 'STARTED';
    this.timer = window.setInterval(() => {
      runInAction(() => {
        this.counter += 1;
      });
    }, 1000);
  }

  hydrate(data?: CounterHydration) {
    if (data) this.counter = data.start;
  }
}