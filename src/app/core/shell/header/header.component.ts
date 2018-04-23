// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// 3rd Party
import { NgbModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from 'rx-monero-wallet';
import { Observable } from 'rxjs';
// Services
import { AuthenticationService } from '../../authentication/authentication.service';
import { SettingsService } from '../../settings.service';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SettingsService, NgbDropdownConfig] 
})

export class HeaderComponent implements OnInit, OnDestroy {

  // Wallet Connect
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  wallet = Wallet(this.url);

  // States
  isAlive: boolean = true;
  isOffline: boolean = true;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public config: NgbDropdownConfig,
    public settingsService: SettingsService,
    public walletServices: WalletService
  ) { 
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-right';
    config.autoClose = true;
  }

  logout() {
    this.walletServices.closeWallet()
    this.authenticationService.logout()
    .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  getWalletAddress() {
    this.wallet.getaddress()
    .map((res) => res.address)
    .subscribe(
      {
        next: (response) => {
          this.isOffline = false;
          //this.playOnlineAudio();
        },
        error: (error) => {
          this.isOffline = true;
          //this.playOfflineAudio();
        }
      }
    )
  }

  playOfflineAudio() {
    let audio = new Audio();
    audio.src = "./assets/offline.wav";
    audio.load();
    audio.play();
  }

  playOnlineAudio() {
    let audio = new Audio();
    audio.src = "./assets/online.wav";
    audio.load();
    audio.play();
  }

  getSettings() {
    console.log('Get app settings triggered');
  }

  ngOnInit() {
    // // Subscribe to routes
    this.route.params.subscribe( params => { const key = <string>params['key']; } );
    
    // // Check wallet status
    Observable.timer(0, this.settingsService.application.interval)
    .takeWhile(() => this.isAlive)
    .subscribe(() => {
      this.getWalletAddress();
      }
    );
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
