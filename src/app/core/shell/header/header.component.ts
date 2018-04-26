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

  // States
  isAlive: boolean = true;
  isOffline: boolean = true;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public dropdownConfig: NgbDropdownConfig,
    public settingsService: SettingsService,
    public walletServices: WalletService
  ) { 
    // customize default values of dropdowns used by this component tree
    dropdownConfig.placement = 'bottom-right';
    dropdownConfig.autoClose = true;
  }

  logout() {
    this.walletServices.closeWallet()
    this.authenticationService.logout()
    .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  getWalletAddress() {
    this.walletServices.getAddress()
    .subscribe(() => {
      this.isOffline = false;
    }, error => {
      this.isOffline = true;
    })
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

  ngOnInit() {
    // Subscribe to routes
    this.route.params.subscribe( params => { const key = <string>params['key'] } );

    // Check wallet status
    Observable.timer(0, this.settingsService.application.interval)
    .takeWhile(() => this.isAlive)
    .subscribe(() => this.getWalletAddress())
  }

  ngOnDestroy(){
    this.isAlive = false; // switches your Observable off
  }

}
