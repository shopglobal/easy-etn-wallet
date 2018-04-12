import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Warehouse } from 'ngx-warehouse';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from 'rx-monero-wallet';

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

  // Wallet Connect
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  wallet = Wallet(this.url);
  filename: string = 'mywallet.etn';
  password: string  = 'password1';
  language: string  = 'English';
  mysettings = {
    filename: this.filename,
    password: this.password,
    language: this.language
  }

  constructor(public warehouse: Warehouse) { }

  // Form Config
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      template: '<h5 class="card-title mb-3">Your Details</h5>',
    },
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
          key: 'email',
          type: 'input',
          templateOptions: {
            label: 'Email',
            type: 'email',
            placeholder: 'you@youremail.com',
            required: true,
          }
        }
      ]
    },
    {
      template: '<hr class="bg-light my-3" /><h5 class="card-title mb-3">Wallet Information</h5>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
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
        },
      ]
    },
    {
      template: '<hr class="bg-light my-3" /><h5 class="card-title mb-3">App Configuration</h5>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'refresh',
          type: 'input',
          templateOptions: {
            type: 'number',
            placeholder: '30',
            addonRight: {
              text: 'Seconds',
            },
            label: 'Refresh Interval',
            required: true,
          }
        },
        {
          className: 'col-6 my-auto mx-auto',
          key: 'sounds',
          type: 'checkbox',
          templateOptions: {
            label: 'Enable Sounds?',
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

  createNewWallet() {
    console.log('create wallet triggered')
    this.wallet.create_wallet(this.mysettings)
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

  openNewWallet() {
    console.log('open wallet triggered')
    this.wallet.open_wallet(this.mysettings)
    .map((res) => res, console.log())
    .subscribe(console.log);
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
