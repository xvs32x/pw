import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  token;
}

export function createInitialState(): SessionState {
  return {
    token: null,
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'session'})
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  setToken(token: string) {
    this._setState(state => ({...state, token}));
  }

}

