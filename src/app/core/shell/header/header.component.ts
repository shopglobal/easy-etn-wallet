import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication/authentication.service';
import { makeUrl, Wallet } from 'rx-monero-wallet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Wallet Connect
  url = makeUrl('http', 'localhost', '8080', 'json_rpc');
  wallet = Wallet(this.url);
  interval = 15000; // 15 seconds

  // States
  alive: boolean = true;
  isOffline: boolean = true;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    config: NgbDropdownConfig
  ) { 
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-right';
    config.autoClose = true;
  }

  logout() {
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
        },
        error: (error) => {
          this.isOffline = true;
        }
      }
    )
  }

  ngOnInit() {
    // Subscribe to routes
    this.route.params.subscribe( params => { const key = <string>params['key']; } );

    // Check wallet status
    Observable.timer(0, this.interval)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.getWalletAddress();
      }
    );

  }

  ngOnDestroy(){
    this.alive = false; // switches your Observable off
  }

}
