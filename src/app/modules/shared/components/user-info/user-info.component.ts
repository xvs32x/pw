import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserInfoQuery } from '../../../../state/user-info/user-info.query';
import { Observable } from 'rxjs';
import { UserInfoState } from '../../../../state/user-info/user-info.store';

@Component({
  selector: 'app-user-info',
  template: `
    <div *ngIf="userInfo$ | async as user">
      <div>{{user.balance}} PW</div>
      <div><small>{{user.name}}</small></div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {
  userInfo$: Observable<UserInfoState> = this.userInfoQuery.selectUserInfo();
  constructor(
    private userInfoQuery: UserInfoQuery,
  ) {
  }

  ngOnInit() {
  }

}
