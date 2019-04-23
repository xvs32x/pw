import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { User, UserListService } from '../../../shared/services/user-list/user-list.service';
import { debounceTime, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionQuery } from '../../../../state/transaction/transaction.query';
import { UserInfoQuery } from '../../../../state/user-info/user-info.query';
import { tap } from 'rxjs/internal/operators/tap';
import { TransactionService } from '../../../../state/transaction/transaction.service';
import { TransactionStore } from '../../../../state/transaction/transaction.store';
import { Transaction } from '../../../../state/transaction/transaction.model';

@Component({
  selector: 'app-transaction-form',
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <mat-form-field>
        <input matInput formControlName="name" [matAutocomplete]="auto" placeholder="Username">
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let option of filteredOptions | async" [value]="option.name">
            {{option.name}}
          </mat-option>
        </mat-autocomplete>
        <mat-error *ngIf="form.controls.name.hasError('required')">Name is required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="amount" placeholder="Amount" type="number">
        <mat-error *ngIf="form.controls.amount.hasError('required')">Amount is required</mat-error>
        <mat-error *ngIf="form.controls.amount.hasError('isBigger')">Your balance is too small</mat-error>
      </mat-form-field>
      <app-error *ngIf="err$ | async as err">{{err?.error}}</app-error>
      <button mat-raised-button color="primary" [disabled]="isLoading$ | async">Send wings</button>
    </form>
  `,
  styles: [
    'form > * {width: 100%}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required])
  });
  isLoading$: Observable<boolean> = this.transactionQuery.selectLoading();
  err$: Observable<HttpErrorResponse> = this.transactionQuery.selectError();
  filteredOptions: Observable<User[]> = this.form.controls.name.valueChanges.pipe(
    filter(x => x && x.length > 0),
    debounceTime(200),
    switchMap(name => this.userListService.find(name))
  );
  destroy$ = new Subject();

  constructor(
    private userListService: UserListService,
    private transactionQuery: TransactionQuery,
    private transactionService: TransactionService,
    private transactionStore: TransactionStore,
    private userInfoQuery: UserInfoQuery,
  ) {
    // Validate balance is not too small
    this.form.controls.amount.valueChanges.pipe(
      switchMap(() => this.validateAmount(this.form.controls.amount)),
      filter(x => !!x),
      tap(err => this.form.controls.amount.setErrors(err)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.transactionStore.setError(null);
  }

  submit() {
    this.transactionService.upsert(this.form.value).pipe(
      tap(() => this.clear())
    ).subscribe();
  }

  validateAmount(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userInfoQuery.selectUserInfo().pipe(
      map(x => x ? x.balance : 0),
      map(b => b >= control.value ? null : {isBigger: true}),
    );
  }

  repeat(transaction: Transaction) {
    this.clear();
    this.form.reset({
      name: transaction.username,
      amount: transaction.amount * -1
    });
  }

  clear() {
    this.form.reset();
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].setErrors(null);
      }
    }
  }

}
