import { IDatabase, ITask } from 'pg-promise';

export interface TransactionRunnerFn {
  <T>(callback: TransactionCallback): Promise<T>;
}

export interface TransactionCallback {
  <T>(transaction: ITask<unknown>): Promise<T>;
}

export function createTransactionRunner(
  db: IDatabase<unknown>
): TransactionRunnerFn {
  return async <T>(callback: TransactionCallback): Promise<T> => {
    return db.tx<T>(async (transaction) => callback(transaction));
  };
}
