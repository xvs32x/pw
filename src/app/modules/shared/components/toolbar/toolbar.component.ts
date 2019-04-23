import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionQuery } from '../../../../state/session/session.query';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <ng-content></ng-content>
        <div class="spacer"></div>
        <app-user-info></app-user-info>
      </mat-toolbar-row>
      <mat-toolbar-row class="flex">
        <ng-container *ngIf="token$ | async as token else isGuest">
          <button class="flex-1" routerLink="/transaction" mat-button>Transactions</button>
          <button class="flex-1" routerLink="/auth" mat-button>Logout</button>
        </ng-container>
        <ng-template #isGuest>
          <button class="flex-1" routerLink="/auth" mat-button>Login</button>
          <button class="flex-1" routerLink="/auth/register" mat-button>Register</button>
        </ng-template>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  token$: Observable<string> = this.sessionQuery.selectToken();
  constructor(private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
  }

}
