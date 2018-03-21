import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

export interface wallet {
  address: string;
  payid: string;
  balance: string;
  available: string;
  updated: string;
}

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
    ])
  ]
})
export class HomeComponent implements OnInit {

  isCopied: boolean = false;

  public wallet: wallet[] =
    [
      {
        address: 'etn47f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8662e3f1482',
        payid: 'f6e418dd00062204',
        balance: '43.41',
        available: '43.41',
        updated: '2018-03-20 14:23:45',
      }
    ]

  public transactions: transactions[] =
    [
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
    ]

  constructor() { }

  ngOnInit() {
  }

}
