// Angular Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
// Servvices
import { SettingsService } from '../core/settings.service';
import { WalletService } from '../core/wallet.service';
import { DaemonService } from '../core/daemon.service';
// 3rd Party
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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

  wallet_open: boolean;
  wallet_height: number = 0;
  daemon_height: number = 0;
  progressType: string = 'warning';
  
  // States
  isLoading = false;
  isAlive: boolean = true;
  isSynced: boolean = false;

  // Form Config
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

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private progressConfig: NgbProgressbarConfig,
    private walletService: WalletService,
    private daemonService: DaemonService
  ) { }

  submit(model) {
    this.isLoading = true;
    this.walletService.saveWallet(model)
    .finally(() => {
      this.openWallet();
      this.getBlockHights();
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
    this.walletService.openWallet()
    .subscribe(response => {
      this.wallet_open = true;
      this.isLoading = false;
    }, error => {
      this.wallet_open = false;
      this.isLoading = true;
    });
  }

  getBlockHights() {
    Observable.timer(0, 8000)
    .takeWhile(() => this.isAlive || this.isSynced)
    .subscribe(() => {
      this.daemonService.getDaemonHeight()
      .map((response) => { this.daemon_height = response.height })
      this.walletService.getWalletHeight()
      .map((response) => { this.wallet_height = response.height })
      if (this.wallet_height = this.daemon_height) {
        this.isSynced = true;
        this.progressType = 'success';
      }
    })
  }

  ngOnInit() {
    this.getWallet();
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
