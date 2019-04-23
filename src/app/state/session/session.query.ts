import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SessionQuery extends Query<SessionState> {

  constructor(
    protected store: SessionStore,
  ) {
    super(store);
  }

  selectToken() {
    return this.store._select(store => store.token).pipe(
      startWith(this.store._value().token),
      distinctUntilChanged((a, b) => a === b),
    );
  }

}
