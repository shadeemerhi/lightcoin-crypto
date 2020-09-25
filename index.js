class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for(let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Need to check if valid amount
    if (this.validate()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}

class Withdrawal extends Transaction {

  get value () {
    return -this.amount;
  }

  validate() {
    return this.amount <= this.account.balance;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  validate() {
    return true;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();


const t2 = new Withdrawal(110.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
console.log('Transactions: ', myAccount.transactions);
