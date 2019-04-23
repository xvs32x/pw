import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Transaction } from './transaction.model';

export interface TransactionState extends EntityState<Transaction> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'transaction' })
export class TransactionStore extends EntityStore<TransactionState, Transaction> {

  constructor() {
    super({loading: false});
  }

}

