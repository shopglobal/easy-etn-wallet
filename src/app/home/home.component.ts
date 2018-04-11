import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from '../core/wallet.service';
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
  interval = 120000; // 30 seconds
  balance: any = 0.00;
  balance_unlocked: any = 0.00;
  address: string;
  transactionsAll: any;
  transactionsIn: any;
  transactionsOut: any;
  transactionsPending: any;
  transactionsFailed: any;
  transactionsPool: any;

  // States
  isAlive: boolean = true;
  isCopied: boolean = false;
  isLoading: boolean = false;
  isOffline: boolean = true;

  constructor(private modalService: NgbModal) { 
  }

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
        this.balance = (response.balance / 100);
        this.balance_unlocked = (response.unlocked_balance / 100);
      }
    )
    .subscribe(
      {
        next: (response) => {
          this.balance;
          this.balance_unlocked;
          this.isOffline = false;
          this.isLoading = false;
          console.log(this.balance, this.balance_unlocked);
        },
        error: (error) => {
          this.balance = 0.00;
          this.balance_unlocked = 0.00;
          this.isOffline = true;
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
          this.isLoading = false;
          console.log(this.address);
        },
        error: (error) => {
          this.address = null;
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
          this.transactionsIn = response.in;
          this.transactionsOut = response.out;
          this.transactionsPending = response.pending;
          this.transactionsFailed = response.failed;
          this.transactionsPool = response.pool;
          // join all transactions into one
          this.transactionsAll = this.transactionsIn.
          concat(
            this.transactionsOut,
            this.transactionsPending,
            this.transactionsFailed,
            this.transactionsPool
          )
        }
    )
    .subscribe(
      {
        next: (response) => {
          this.transactionsAll;
          this.isLoading = false;
          console.log(this.transactionsAll);
        },
        error: (error) => {
          this.transactionsAll = null;
          this.isLoading = false;
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

  ngOnInit() {
    Observable.timer(0, this.interval)
    .takeWhile(() => this.isAlive)
    .subscribe(() => {
      this.getWalletBalance();
      this.getWalletAddress();
      this.getWalletTransactions();
      }
    )
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
