import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserInfoStore, UserInfoState } from './user-info.store';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SessionQuery } from '../session/session.query';
import { UserInfoService } from './user-info.service';

@Injectable({providedIn: 'root'})
export class UserInfoQuery extends Query<UserInfoState> {

  constructor(
    protected store: UserInfoStore,
    private sessionQuery: SessionQuery,
    private userInfoService: UserInfoService
  ) {
    super(store);
    // Update user info on token changes
    this.sessionQuery.selectToken().pipe(
      switchMap((token) => {
        if (token) {
          return this.userInfoService.getUserInfo();
        } else {
          this.userInfoService.clear();
          return of(null);
        }
      })
    ).subscribe();
  }

  selectUserInfo(): Observable<UserInfoState | null> {
    return this.select().pipe(map(res => res.id ? res : null));
  }
}
