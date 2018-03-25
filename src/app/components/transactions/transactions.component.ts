import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

export interface transactions {
  id: number;
  date: string;
  type: string;
  status: string;
  amount: string;
  txhash: string;
}

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

  dtOptions: DataTables.Settings = {};

  public transactions: transactions[] =
    [
      {
        id: 1,
        date: '2018-03-20 14:23:45',
        type: 'Received',
        status: 'Completed',
        amount: '10.07',
        txhash: '60f1ee7c483469b4e92b8868c9b1205935b1b77ac59fb666148c7520365ba207'
      },
      {
        id: 2,
        date: '2018-03-19 14:23:45',
        type: 'Received',
        status: 'Completed',
        amount: '40.45',
        txhash: '6fbddbdb1cbe5b95ecd3b9517649493b8f9523d2c0d17af17b1c00e37f542786'
      },
      {
        id: 3,
        date: '2018-03-18 14:23:45',
        type: 'Received',
        status: 'Failed',
        amount: '40.45',
        txhash: '8c82611ba33c00b8f86f2f84b30e68a669af0f5adbd5040a0bf44f870b3864c5'
      },
      {
        id: 4,
        date: '2018-03-10 14:23:45',
        type: 'Sent',
        status: 'Completed',
        amount: '60.34',
        txhash: '0e3e14d92ac6005de587144e8905c7188eab4e65b6114be08e3d326c6fb4d20d'
      },
      {
        id: 5,
        date: '2018-02-11 14:23:45',
        type: 'Received',
        status: 'Pending',
        amount: '11.76',
        txhash: '62bdfcf96e7b2e95f29c977227dc049a4e7a78f760c4bccb3e72455d9940eb64'
      }
    ]

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10
    };
  }

}
