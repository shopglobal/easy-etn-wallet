import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { makeUrl, Wallet } from 'rx-monero-wallet';
import { Observable, } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity:0}),
          animate(500, style({opacity:1}))
        ])
      ]
    )
  ]
})
export class TransactionsComponent implements OnInit {

  @ViewChild('myTransactions') table: any;

  // Wallet Connect
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  wallet = Wallet(this.url);
  interval = 120000; // 30 seconds

  // Transaction defaults
  transactions: any[] = [];
  temp = [];
  transactionsIn: Array<any> = [];
  transactionsOut: Array<any> = [];
  transactionsPending: Array<any> = [];
  transactionsFailed: Array<any> = [];
  transactionsPool: Array<any> = [];
  expanded: any = {};
  timeout: any;

  // States
  isAlive: boolean = true;
  isLoading: boolean = false;

  constructor() {}

  updateFilter(event) {
    const val = event.target.value.toString().toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.amount.toString().toLowerCase().indexOf(val) !== -1 || !val ||
             d.txid.toString().toLowerCase().indexOf(val) !== -1 || !val ||
             d.payment_id.toString().toLowerCase().indexOf(val) !== -1 || !val
    });

    // update the rows
    this.transactions = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getRowClass(row) {
    return {
      'received': row.type === 'in',
      'sent': row.type === 'out'
    };
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onRefresh() {
    this.getWalletTransactions();
  }

  getWalletTransactions() {
    // Get Wallet Address
    this.isLoading = true;
    this.transactions = [];
    this.wallet.get_transfers(
      {
        "in": true,
        "out": true,
        "failed": true,
        "pending": true,
        "pool":true
      }
    )
    .map((response) => 
      {
        // Add new property for each type of transaction
        if (response.in !== undefined) {
          this.transactionsIn = response.in;
          this.transactionsIn.forEach(function(obj) { obj.status = "Completed"; });
        }
        if (response.out !== undefined) {
          this.transactionsOut = response.out;
          this.transactionsOut.forEach(function(obj) { obj.status = "Completed"; });
        }
        if (response.pending !== undefined) {
          this.transactionsPending = response.pending;
          this.transactionsPending.forEach(function(obj) { obj.status = "Pending"; });
        }
        if (response.failed !== undefined) {
          this.transactionsFailed = response.failed;
          this.transactionsFailed.forEach(function(obj) { obj.status = "Failed"; });
        }
        if (response.pool !== undefined) {
          this.transactionsPool = response.pool;
          this.transactionsPool.forEach(function(obj) { obj.status = "Pool"; });
        }
      }
    )
    .subscribe(
      {
        next: (response) => {
          // Rset all transactions
          this.transactions = [];
          // Merge transactions if they exsit
          if (this.transactionsIn !== undefined) {
            Array.prototype.push.apply(this.transactions, this.transactionsIn);
          }
          if (this.transactionsOut !== undefined) {
            Array.prototype.push.apply(this.transactions, this.transactionsOut);
          }
          if (this.transactionsPending !== undefined) {
            Array.prototype.push.apply(this.transactions, this.transactionsPending);
          }
          if (this.transactionsFailed !== undefined) {
            Array.prototype.push.apply(this.transactions, this.transactionsFailed);
          }
          if (this.transactionsPool !== undefined) {
            Array.prototype.push.apply(this.transactions, this.transactionsPool);
          }
          this.transactions = JSON.parse(JSON.stringify(this.transactions));
          this.transactions = [...this.transactions];
          this.temp = [...this.transactions];
          console.log('Loading transactions');
        },
        error: (error) => {
          this.isLoading = false;
          console.log('Error while fetching transactions' + error);
        },
        complete: () => {
          this.isLoading = false;
          console.log('Loading transactions complete');
        }
      }
    )
  }

  ngOnInit() {
    Observable.timer(0, this.interval)
    .takeWhile(() => this.isAlive)
    .subscribe(() => {this.getWalletTransactions()})
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
