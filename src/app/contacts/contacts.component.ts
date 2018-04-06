import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { Warehouse } from 'ngx-warehouse';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  submit(model) {
    // console.log(model);
    model = this.contacts.concat(model);
    this.warehouse.set('contacts', model).subscribe(
      (item) => {
        // do something with newly saved item
      },
      (error) => {
        // handle the error
      }
    )
  }

  ngOnInit() {
    this.warehouse.get('contacts').subscribe(
      (data) => {
        if (data) {
          this.contacts = data
        }
        else if (!data) {
          this.contacts = []
        }
        console.log(this.contacts)
      },
      (error) => {
        this.contacts = [],
        console.log(error, this.contacts)
      }
    )
  }

}
