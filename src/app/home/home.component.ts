import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from 'rx-monero-wallet';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query('#items', style({ opacity: 0, transform: 'translateX(-40px)' }), {optional: true}),
        query('#items', stagger('300ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), {optional: true}),
        query('#items', [
          animate(1000, style('*'))
        ], {optional: true})
      ])
    ]),
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
export class HomeComponent implements OnInit, OnDestroy {

  // Wallet Connect
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  wallet = Wallet(this.url);
  interval; // 30 seconds
  balance: string;
  balance_unlocked: string;
  address: string;
  transactions: Array<any> = [];
  transactionsIn: Array<any> = [];
  transactionsOut: Array<any> = [];
  transactionsPending: Array<any> = [];
  transactionsFailed: Array<any> = [];
  transactionsPool: Array<any> = [];

  // States
  isAlive: boolean = true;
  isCopied: boolean = false;
  isLoading: boolean = false;
  isOffline: boolean = true;

  constructor(
    private modalService: NgbModal
  ) { }

  // Modal Window
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  getWalletBalance() {
    // Get Wallet Balance
    this.isLoading = true;
    this.wallet.getbalance()
    .map(
      (response) => {
        this.balance = (response.balance / 100).toFixed(2);
        this.balance_unlocked = (response.unlocked_balance / 100).toFixed(2);
      }
    )
    .subscribe(
      {
        next: (response) => {
          this.balance;
          this.balance_unlocked;
          this.isLoading = false;
          console.log(this.balance, this.balance_unlocked);
        },
        error: (error) => {
          this.balance;
          this.balance_unlocked;
          this.isLoading = false;
          console.log('Error while fetching balance');
        }
      }
    )
  }

  getWalletAddress() {
    // Get Wallet Address
    this.isLoading = true;
    this.wallet.getaddress()
    .map(
      (response) => {
        this.address = response.address;
        }
    )
    .subscribe(
      {
        next: (response) => {
          this.address;
          this.isOffline = false;
          this.isLoading = false;
          console.log(this.address);
        },
        error: (error) => {
          this.address = null;
          this.isOffline = true;
          this.isLoading = false;
          console.log('Error while fetching wallet address');
        }
      }
    )
  }

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
    .map(
      (response) => 
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

  copyAddress(address: string){
    let textarea = document.createElement('textarea');
    textarea.value = address;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      this.isCopied = true;
      console.log('Copying address command was ' + msg);
    } catch (err) {
      this.isCopied = false;
      console.log('Oops, unable to copy address');
    }
    document.body.removeChild(textarea);
  }

  getSettings() {
    // this.warehouse.get('settings').subscribe(
    //   data => {
    //     let settings = JSON.parse(JSON.stringify(data));
    //     this.interval = settings.refresh;
    //     //console.log(this.interval);
    //     //console.log(data);
    //   },
    //   error => console.log(error)
    // );
  }

  ngOnInit() {
    // this.getSettings();
    // Observable.timer(0, this.interval)
    // .takeWhile(() => this.isAlive)
    // .subscribe(() => {
    //   this.getWalletBalance();
    //   this.getWalletAddress();
    //   this.getWalletTransactions();
    //   }
    // )
    // console.log(this.interval);
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
