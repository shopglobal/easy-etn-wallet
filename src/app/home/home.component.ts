import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from 'rx-monero-wallet';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface transactions {
  id: number;
  date: string;
  type: string;
  status: string;
  amount: string;
  txhash: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query('#items', style({ opacity: 0, transform: 'translateX(-40px)' })),
        query('#items', stagger('300ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
        query('#items', [
          animate(1000, style('*'))
        ])
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
export class HomeComponent implements OnInit {

  url = makeUrl('http', 'localhost', '8080', 'json_rpc');
  wallet = Wallet(this.url);
  balance: any;
  balance_unlocked: any;
  address: any;
  isCopied: boolean = false;
  isLoading: boolean = false;
  isOffline: boolean = false;

  public transactions: transactions[] = [
    {
      id: 1,
      date: '2018-03-19 14:23:45',
      type: 'Received',
      status: 'Completed',
      amount: '40.45',
      txhash: '6fbddbdb1cbe5b95ecd3b9517649493b8f9523d2c0d17af17b1c00e37f542786'
    },
    {
      id: 2,
      date: '2018-03-18 14:23:45',
      type: 'Received',
      status: 'Failed',
      amount: '40.45',
      txhash: '8c82611ba33c00b8f86f2f84b30e68a669af0f5adbd5040a0bf44f870b3864c5'
    },
    {
      id: 3,
      date: '2018-03-10 14:23:45',
      type: 'Sent',
      status: 'Completed',
      amount: '60.34',
      txhash: '0e3e14d92ac6005de587144e8905c7188eab4e65b6114be08e3d326c6fb4d20d'
    },
    {
      id: 4,
      date: '2018-02-11 14:23:45',
      type: 'Received',
      status: 'Pending',
      amount: '11.76',
      txhash: '62bdfcf96e7b2e95f29c977227dc049a4e7a78f760c4bccb3e72455d9940eb64'
    }
  ];

  constructor(private modalService: NgbModal) { 
  }

  // Modal Window
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  getWalletBalance() {
    // Get Wallet Balance
    this.isLoading = true;
    this.isOffline = true;
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
          this.balance = null;
          this.balance_unlocked = null;
          this.isOffline = true;
          this.isLoading = false;
          console.log('Error while fetching balance');
        }
      }
    )
  }

  getWalletAddress() {
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

  ngOnInit() {
  
    this.getWalletBalance();
    this.getWalletAddress();
    
    // // Get the current transfers to this wallet
    // const autoRefresher = (refreshInterval: number) =>
    // Observable.timer(0, refreshInterval)

    // const streamtransfers = () => autoRefresher(1000)
    //   .flatMap(() => this.wallet.get_transfers({ pool: true }))
    //   .map((res) => res.pool)
    //   .filter((pool) => pool != undefined)
    //   .subscribe(console.log,
    //             console.error,
    //             () => console.log('finished'))

    // streamtransfers();
  }

}