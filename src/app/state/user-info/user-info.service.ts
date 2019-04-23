import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfoState, UserInfoStore } from './user-info.store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserInfoService {

  constructor(
    private userInfoStore: UserInfoStore,
    private http: HttpClient,
  ) {
  }

  getUserInfo(): Observable<{ user_info_token: UserInfoState }> {
    return this.http.get<{ user_info_token: UserInfoState }>('api/api/protected/user-info').pipe(
      tap(res => this.userInfoStore._setState(state => ({...state, ...res.user_info_token})))
    );
  }

  clear() {
    this.userInfoStore._setState(() => ({}));
  }
}
