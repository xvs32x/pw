import { Component, OnInit, ChangeDetectionStrategy, HostBinding, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../../../state/session/session.service';
import { Observable } from 'rxjs';
import { SessionQuery } from '../../../../state/session/session.query';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionStore } from '../../../../state/session/session.store';

@Component({
  selector: 'app-auth-login-form',
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <mat-form-field>
        <input matInput formControlName="email" placeholder="Email">
        <mat-error *ngIf="form.controls.email.hasError('required')">Email address is required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="password" type="password" placeholder="Password">
        <mat-error *ngIf="form.controls.password.hasError('required')">Password is required</mat-error>
      </mat-form-field>
      <app-error *ngIf="err$ | async as err">{{err?.error}}</app-error>
      <button mat-raised-button color="primary" [disabled]="isLoading$ | async">Login</button>
    </form>
  `,
  styles: [
    'form > * {width: 100%}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLoginFormComponent implements OnInit, OnDestroy {
  @HostBinding('class') cssClass = 'container container-small';
  form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  err$: Observable<HttpErrorResponse> = this.sessionQuery.selectError();
  isLoading$: Observable<boolean> = this.sessionQuery.selectLoading();

  constructor(
    private sessionService: SessionService,
    private sessionQuery: SessionQuery,
    private sessionStore: SessionStore,
  ) {
    this.sessionService.logout();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sessionStore.setError(null);
  }

  submit() {
    this.sessionService.login(this.form.value).subscribe();
  }

}
