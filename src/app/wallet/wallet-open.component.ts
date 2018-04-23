// Angular Core
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
// Servvices
import { WalletService } from '../core/wallet.service';
// 3rd Party
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-wallet-open',
  templateUrl: './wallet-open.component.html',
  styleUrls: ['./wallet-open.component.scss'],
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
export class WalletOpenComponent implements OnInit {

  // Form Config
  isLoading = false; // States
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'filename',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Wallet Name',
            placeholder: 'MyWallet',
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Wallet Password',
            placeholder: 'Password1',
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'language',
          type: 'select',
          templateOptions: {
            label: 'Wallet Language',
            options: [
              { label: 'English', value: 'English' }
            ],
          },
        },
        {
          className: 'col-12',
          key: 'remember',
          type: 'checkbox',
          templateOptions: {
            label: 'Remember Settings?',
          },
        },
      ],
    },
  ];

  constructor(
    private walletService: WalletService,
    private router: Router
  ) { }

  submit(model) {
    this.isLoading = true;
    this.walletService.saveWallet(model)
    .finally(() => {
      this.isLoading = false;
      this.walletService.openWallet();
      console.log('Form submit completed');
    })
    .subscribe(wallet => {
      console.log(wallet);
      this.router.navigate(['/home'], { replaceUrl: true });
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

  ngOnInit() {
    this.getWallet();
  }

}
