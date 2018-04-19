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
      template: '<h5 class="card-title mb-3">Wallet Information</h5>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'wallet_name',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Wallet Name',
            placeholder: 'MyWallet',
            required: true,
          }
        },
        {
          className: 'col-4',
          key: 'wallet_password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Wallet Password',
            placeholder: 'Password1',
            required: true,
          }
        },
        {
          key: 'wallet_lang',
          type: 'select',
          templateOptions: {
            label: 'Wallet Language',
            options: [
              {label: 'English', value: 'English'}
            ],
          },
        }
      ]
    },
    {
      template: '<hr class="bg-light my-3" /><h5 class="card-title mb-3">App Configuration</h5>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'app_dislay',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Display Name',
            placeholder: 'User',
            required: true,
          }
        },
        {
          key: 'app_interval',
          type: 'select',
          templateOptions: {
            label: 'Refresh Interval',
            options: [
              {label: '30 Seconds', value: '30000'}
            ],
          },
        },
        {
          className: 'col-4',
          key: 'app_sounds',
          type: 'checkbox',
          templateOptions: {
            label: 'Enable Sounds?',
          }
        },
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

  createWallet() {
    console.log('Create wallet triggered')
    this.wallet.create_wallet(this.mysettings)
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

  openWallet() {
    console.log('Open wallet triggered')
    this.wallet.open_wallet(this.mysettings)
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

  closeWallet() {
    console.log('Close wallet triggered')
    this.wallet.stop_wallet()
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

  getSettings() {
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

  ngOnInit() {
    this.getSettings();
  }

}
