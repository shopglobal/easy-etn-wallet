// Angular Core
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
// Servvices
import { WalletService } from '../core/wallet.service';
// 3rd Party
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.scss'],
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
export class WalletCreateComponent implements OnInit {

  // Form Config
  isLoading = false; // States
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'filename',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Wallet name',
            placeholder: 'MyWallet',
            required: true,
          },
        },
        {
          className: 'col-6',
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Wallet password',
            placeholder: 'Password1',
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'language',
          type: 'select',
          templateOptions: {
            label: 'Wallet language',
            options: [
              { label: 'English', value: 'English' }
            ],
          },
        },
      ],
    },
  ];

  constructor(private walletService: WalletService) { }

  submit(model) {
    this.isLoading = true;
    this.walletService.saveWallet(model)
    .finally(() => {
      this.isLoading = false;
      console.log('Form submit completed');
    })
    .subscribe(wallet => {
      console.log(wallet);
    }, error => {
      console.log(error);
    });
  }

  getWallet() {
    if (this.walletService.wallet) {
      this.model = this.walletService.wallet;
      console.log('Get app settings triggered');
    }
  }

  openWallet() {
    this.walletService.openWallet();
  }

  closeWallet() {
    this.walletService.closeWallet();
  }

  ngOnInit() {
    this.getWallet();
  }

}
