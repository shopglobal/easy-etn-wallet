import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

export interface contacts {
  id: number;
  name: string;
  address: string;
  payid: string;
  created: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query('#cards', style({ opacity: 0, transform: 'translateX(-40px)' })),
        query('#cards', stagger('300ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
        query('#cards', [
          animate(1000, style('*'))
        ])
      ])
    ])
  ]
})
export class ContactsComponent implements OnInit {

  public contacts: contacts[] =
    [
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
    ]

  constructor() { }

  ngOnInit() {
  }

}
