import { ID } from '@datorama/akita';

export interface Transaction {
  id: ID;
  date: number;
  username: string;
  amount: number;
  balance: number;
}

/**
 * A factory function that creates Transaction
 */
export function createTransaction(params: Partial<Transaction>) {
  return {

  } as Transaction;
}
