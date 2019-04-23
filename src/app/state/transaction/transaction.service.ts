import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionStore } from './transaction.store';
import { catchError, tap } from 'rxjs/operators';
import { Transaction } from './transaction.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { UserInfoStore } from '../user-info/user-info.store';

@Injectable({providedIn: 'root'})
export class TransactionService {

  constructor(
    private transactionStore: TransactionStore,
    private userInfoStore: UserInfoStore,
    private http: HttpClient
  ) {
  }

  load(): Observable<{trans_token: Transaction[]}> {
    return this.http.get<{trans_token: Transaction[]}>('api/api/protected/transactions').pipe(
      tap(res => this.transactionStore.set(res.trans_token))
    );
  }

  upsert(payload: Transaction): Observable<{trans_token: Transaction}> {
    this.transactionStore.setLoading(true);
    return this.http.post<{trans_token: Transaction}>('api/api/protected/transactions', payload).pipe(
      tap(x => this.transactionStore.upsert(x.trans_token.id , x.trans_token)),
      tap(x => this.userInfoStore.changeBalance(x.trans_token.amount)),
      tap(() => this.transactionStore.setLoading(false)),
      catchError((err) => {
        this.transactionStore.setLoading(false);
        this.transactionStore.setError(err);
        return of(err);
      })
    );
  }

}
