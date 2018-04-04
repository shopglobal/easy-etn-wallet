import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Warehouse } from 'ngx-warehouse';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
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
export class SettingsComponent implements OnInit {

  constructor(public warehouse: Warehouse) { }

  // Form Config
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'firstname',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'First Name',
            placeholder: 'John',
            required: true,
          }
        },
        {
          className: 'col-6',
          key: 'lastname',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Last Name',
            placeholder: 'Citizen',
            required: true,
          }
        },
        {
          className: 'col-6',
          key: 'wallet',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Wallet Address',
            placeholder: 'etnkGmQZG1c1g8nXSe9qR6foYDdZxySnNS8odiHtLuB8WqhGQHEcsv17rUUyiW8wnagTKkcw29gQyNPSHnprf8Nz7sYNs2Mf2g',
            required: true,
          }
        },
        {
          className: 'col-6',
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Wallet Password',
            placeholder: 'Password1',
            required: true,
          }
        }
      ]
    }
  ];

  submit(model) {
    // console.log(model);
    this.warehouse.set('settings', model).subscribe(
      (item) => {
        // do something with newly saved item
      },
      (error) => {
        // handle the error
      }
    )
  }

  ngOnInit() {
    this.warehouse.get('settings').subscribe(
      (data) => {
        if (data) {
          this.model = data
        }
        else if (!data) {
          this.model = {}
        }
        console.log(this.model)
      },
      (error) => {
        this.model = {},
        console.log(error, this.model)
      }
    )
  }

}
