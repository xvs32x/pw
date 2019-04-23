import { Component, OnInit, ChangeDetectionStrategy, HostBinding, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../../../../state/session/session.service';
import { SessionQuery } from '../../../../state/session/session.query';
import { SessionStore } from '../../../../state/session/session.store';
import { ErrorStateMatcher } from '@angular/material';

class RegisterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-auth-register-form',
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <mat-form-field>
        <input matInput formControlName="email" placeholder="Email">
        <mat-error *ngIf="form.controls.email.hasError('email')">Email address is not correct</mat-error>
        <mat-error *ngIf="form.controls.email.hasError('required')">Email address is required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="username" placeholder="Username">
        <mat-error *ngIf="form.controls.username.hasError('required')">Username is required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="password" type="password" placeholder="Password">
        <mat-error *ngIf="form.controls.password.hasError('required')">Password is required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="confirmPassword" type="password" placeholder="Confirm password" [errorStateMatcher]="matcher">
        <mat-error *ngIf="form.hasError('confirmInvalid')">Passwords do not match</mat-error>
      </mat-form-field>
      <app-error *ngIf="err$ | async as err">{{err?.error}}</app-error>
      <button mat-raised-button color="primary" [disabled]="isLoading$ | async">Register</button>
    </form>
  `,
  styles: [
    'form > * {width: 100%}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthRegisterFormComponent implements OnInit, OnDestroy {
  @HostBinding('class') cssClass = 'container container-small';
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl()
  }, {validators: [this.validatePasswords]});
  err$: Observable<HttpErrorResponse> = this.sessionQuery.selectError();
  isLoading$: Observable<boolean> = this.sessionQuery.selectLoading();
  matcher = new RegisterErrorStateMatcher();

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
    this.sessionService.register(this.form.value).subscribe();
  }

  validatePasswords(form: FormGroup) {
    return form.controls.password.value === form.controls.confirmPassword.value ? null : {confirmInvalid: true};
  }

}
