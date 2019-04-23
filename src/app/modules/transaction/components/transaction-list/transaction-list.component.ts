import { Component, OnInit, ChangeDetectionStrategy, ViewChild, EventEmitter, Output } from '@angular/core';
import { TransactionService } from '../../../../state/transaction/transaction.service';
import { TransactionQuery } from '../../../../state/transaction/transaction.query';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Transaction } from '../../../../state/transaction/transaction.model';
import { map } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-transaction-list',
  template: `
    <h3>History</h3>
    <mat-form-field>
      <input matInput (keyup)="filter$.next($event.target.value)" placeholder="Filter by name">
    </mat-form-field>
    <table mat-table matSort [dataSource]="transactions$ | async">
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Date / time</th>
        <td mat-cell *matCellDef="let element"> {{element.date}} </td>
      </ng-container>
      <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Correspondent Name</th>
        <td mat-cell *matCellDef="let element"> {{element.username}} </td>
      </ng-container>
      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Transaction amount</th>
        <td mat-cell *matCellDef="let element"> {{element.amount}} </td>
      </ng-container>
      <ng-container matColumnDef="balance">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Resulting balance</th>
        <td mat-cell *matCellDef="let element"> {{element.balance}} </td>
      </ng-container>
      <ng-container matColumnDef="repeat">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Repeat</th>
        <td mat-cell *matCellDef="let element">
          <button *ngIf="element.amount < 0" (click)="this.repeat.next(element)" mat-icon-button>
            <mat-icon aria-label="Repeat">refresh</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [
    'table {width: 100%}',
    'h3 {margin-top: 50px;}',
    'mat-form-field {width: 100%}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit {
  @Output() repeat: EventEmitter<Transaction> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  transactions$: Observable<MatTableDataSource<Transaction>>;
  displayedColumns: string[] = ['date', 'username', 'amount', 'balance', 'repeat'];
  filter$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private transactionService: TransactionService,
    private transactionQuery: TransactionQuery,
  ) {
    this.transactionService.load().subscribe();
  }

  ngOnInit() {
    this.transactions$ = combineLatest(
      this.transactionQuery.selectAll(),
      this.filter$,
    ).pipe(
      map(([res, filter]) => {
        const data = new MatTableDataSource(res);
        data.sort = this.sort;
        data.sortingDataAccessor = (item, prop) => item[prop];
        data.filter = filter;
        return data;
      })
    );
  }

}
