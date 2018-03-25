import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

export interface contacts {
  id: number;
  name: string;
  address: string;
  payid: string;
  created: string;
}

export interface walletdata {
  address: string;
  payid: string;
  balance: string;
  available: string;
  updated: string;
}

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
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
export class TransfersComponent implements OnInit {

  paymentType: any;

  public walletdata: walletdata[] = [
    {
      address: 'etnkGmQZG1c1g8nXSe9qR6foYDdZxySnNS8odiHtLuB8WqhGQHEcsv17rUUyiW8wnagTKkcw29gQyNPSHnprf8Nz7sYNs2Mf2g',
      payid: 'f6e418dd00062204',
      balance: '43.41',
      available: '43.41',
      updated: '2018-03-20 14:23:45',
    }
  ];

  public contacts: contacts[] = [
    {
      id: 1,
      name: 'John Doe',
      address: 'etn47f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a8',
      payid: '034346653344545',
      created: '2018-03-20 14:23:45'
    },
    {
      id: 2,
      name: 'Jane Citizen',
      address: 'etn47f7cff7a5e671884629c93b368cb18f58a993f4b19c2a53a9',
      payid: '034346653344545',
      created: '2018-03-10 14:23:45'
    }
  ];

  contactsId: any;

  constructor() { }

  ngOnInit() {
  }

}
