import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Warehouse } from 'ngx-warehouse';
import { makeUrl, Wallet } from 'rx-monero-wallet';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query('#cards', style({ opacity: 0, transform: 'translateX(-40px)' }), {optional: true}),
        query('#cards', stagger('300ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), {optional: true}),
        query('#cards', [
          animate(1000, style('*'))
        ], {optional: true})
      ])
    ])
  ]
})
export class ContactsComponent implements OnInit {

  // Wallet Connect
  url = makeUrl('http', 'localhost', '8080', 'json_rpc');
  wallet = Wallet(this.url);
  interval = 30000; // 30 seconds
  closeResult: string;

  constructor(
    public warehouse: Warehouse,
    private modalService: NgbModal
  ) {}

  contacts: any[];

  // Form Config
  form = new FormGroup({});
  model: any = {
    created: Date.now()
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'name',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Display Name',
            placeholder: 'John Citizen',
            required: true,
          }
        },
        {
          className: 'col-6',
          key: 'payid',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Payment ID (Optional)',
            placeholder: '034346653344545',
            required: false,
          }
        },
        {
          className: 'col-12',
          key: 'address',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Wallet Address',
            placeholder: 'etnkGmQZG1c1g8nXSe9qR6foYDdZxySnNS8odiHtLuB8WqhGQHEcsv17rUUyiW8wnagTKkcw29gQyNPSHnprf8Nz7sYNs2Mf2g',
            required: true,
          }
        }
      ]
    }
  ];

  // Modal Window
  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  // On Submit
  submit(model) {
    this.wallet.add_address_book(this.model)
    .map((res) => res)
    .subscribe(console.log);
  }

  // Get Contacts
  GetAddressBookContacts() {
    this.wallet.get_address_book({
      entries: [0,1]
    })
    .map((res) => res)
    .subscribe(console.log)
  }

  ngOnInit() {
    this.GetAddressBookContacts();
  }

}
