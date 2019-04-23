import { Injectable } from '@angular/core';
import { ID, Store, StoreConfig } from '@datorama/akita';

export interface UserInfoState {
  id?: ID;
  name?: string;
  email?: string;
  balance?: number;
}

export function createInitialState(): UserInfoState {
  return {};
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user-info'})
export class UserInfoStore extends Store<UserInfoState> {

  constructor() {
    super(createInitialState());
  }

  changeBalance(amount: number) {
    return this._setState(state => ({...state, balance: state.balance + amount}));
  }

}

