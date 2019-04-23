import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { TransactionState, TransactionStore } from './transaction.store';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
@QueryConfig({
  sortByOrder: Order.DESC,
  sortBy: 'date'
})
export class TransactionQuery extends QueryEntity<TransactionState, Transaction> {

  constructor(protected store: TransactionStore) {
    super(store);
  }

}
