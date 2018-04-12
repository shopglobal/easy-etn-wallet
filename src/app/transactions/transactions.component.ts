import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from 'rx-monero-wallet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
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

  // Wallet Connect
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  wallet = Wallet(this.url);
  interval = 120000; // 30 seconds

  // Table Settings
  dtOptions: any = {};

  // Transaction defaults
  transactions: Array<any> = [];
  transactionsIn: Array<any> = [];
  transactionsOut: Array<any> = [];
  transactionsPending: Array<any> = [];
  transactionsFailed: Array<any> = [];
  transactionsPool: Array<any> = [];

  // States
  isAlive: boolean = true;
  isLoading: boolean = false;
  isOffline: boolean = true;

  constructor() { }

  getWalletTransactions() {
    // Get Wallet Address
    this.isLoading = true;
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
          this.isLoading = false;
          console.log(this.transactions);
        },
        error: (error) => {
          this.transactions;
          this.isLoading = false;
          console.log(this.transactions);
          console.log('Error while fetching wallet transactions');
        }
      }
    )
  }

  ngOnInit() {
    this.dtOptions = {
      // Use this attribute to enable the responsive extension
      responsive: true
    };
    Observable.timer(0, this.interval)
    .takeWhile(() => this.isAlive)
    .subscribe(() => {this.getWalletTransactions()})
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
