import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionArray = this.transactions;

    const initialValue = { income: 0, outcome: 0, total: 0 };

    const balance = transactionArray.reduce(function (
      newBalance,
      currentTransaction,
    ) {
      if (currentTransaction.type === 'income') {
        newBalance.income += currentTransaction.value;
      }
      if (currentTransaction.type === 'outcome') {
        newBalance.outcome += currentTransaction.value;
      }
      newBalance.total = newBalance.income - newBalance.outcome;

      return newBalance;
    },
    initialValue);

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
