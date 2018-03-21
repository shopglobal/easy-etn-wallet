import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public transactions: transactions[] =
    [
      {
        id: 1,
        date: '2018-03-20 14:23:45',
        type: 'Received',
        status: 'Completed',
        amount: '10.07',
        txhash: '47f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8662e3f1482f690'
      },
      {
        id: 2,
        date: '2018-03-19 14:23:45',
        type: 'Received',
        status: 'Completed',
        amount: '40.45',
        txhash: '57f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8662e3f1482f694'
      },
      {
        id: 3,
        date: '2018-03-18 14:23:45',
        type: 'Received',
        status: 'Failed',
        amount: '40.45',
        txhash: '57f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8662e3f1482f694'
      },
      {
        id: 4,
        date: '2018-03-10 14:23:45',
        type: 'Sent',
        status: 'Completed',
        amount: '60.34',
        txhash: 'n7f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8662e3f1482f696'
      },
      {
        id: 5,
        date: '2018-02-11 14:23:45',
        type: 'Received',
        status: 'Pending',
        amount: '11.76',
        txhash: '87f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8662e3f1482f697'
      }
    ]

  constructor() { }

  ngOnInit() {
  }

}
