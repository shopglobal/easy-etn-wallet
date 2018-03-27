import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

export interface contacts {
  id: number;
  name: string;
  address: string;
  payid: string;
  created: string;
}

@Component({
  selector: 'app-payments',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
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
export class PaymentsComponent implements OnInit {

  selectedContacts: contacts[] = [];
  scheduleType: any;
  scheduleFrequency: any;
  scheduleStartDate: any;
  scheduleStartTime: any = { hour: null, minute: null };
  meridian = true;
  spinners = false;

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

  constructor() { }

  onChange($event) {
    console.log($event);
    this.selectedContacts = Object.assign({}, this.selectedContacts, 
      {
        id: $event.id,
        name: $event.name,
        address: $event.address,
        payid: $event.payid,
        created: $event.created
      }
    );
    console.log(this.selectedContacts);
  }

  ngOnInit() {
  }

}
