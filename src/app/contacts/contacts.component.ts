import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Warehouse } from 'ngx-warehouse';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from '../core/wallet.service';
import { JsonPipe } from '@angular/common';
import { toArray } from 'rxjs/operator/toArray';

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
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  wallet = Wallet(this.url);
  interval = 120000; // 30 seconds
  closeResult: string;
  contacts;

  constructor(
    public warehouse: Warehouse,
    private modalService: NgbModal
  ) {}

  // Form Config
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'description',
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
          key: 'payment_id',
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
    this.modalService.open(content, { size: 'sm', centered: true });
  }

  // On Submit
  submit(model) {
    this.wallet.add_address_book(this.model)
    .map((response) => {
      console.log(response)
      console.log('Contact created')
    })
    .subscribe(console.log);
  }

  // Get Contacts
  GetAddressBookContacts() {
    this.wallet.get_address_book({
      entries: [0]
    })
    .map(
      (response) => {
        this.contacts = response.entries;
        console.log(this.contacts);
        }
    )
    .subscribe(console.log)
  }

  // Delete Contact
  DeleteAddressBookContact(id) {
    this.wallet.delete_address_book({
      index: id
    })
    .map((response) => {
      console.log(response)
      console.log('Contact deleted')
    })
    .subscribe(console.log)
  }

  ngOnInit() {
    this.GetAddressBookContacts();
  }

}
