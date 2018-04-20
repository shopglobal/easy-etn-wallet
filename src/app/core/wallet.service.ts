import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface Wallet {
  filename: string;
  password: string;
  language: string;
}

const walletKey = 'wallet';

@Injectable()
export class WalletService {

  public _walletSettings: Wallet;
  
  constructor() {
    this._walletSettings = JSON.parse(sessionStorage.getItem(walletKey) || localStorage.getItem(walletKey));
  }


   /**
   * Gets the wallet settings.
   * @return {Wallet} wallet settings null
   */
  get wallet(): Wallet {
    return this._walletSettings;
  }

   /**
   * Sets the wallet settings.
   * The wallet settings may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the wallet settings are only persisted for the current session.
   * @param {Wallet=} wallet The wallet settings.
   * @param {boolean=} remember True to remember wallet settings across sessions.
   */
  setWallet(wallet?: Wallet, remember?: boolean) : Observable<Wallet> {
    this._walletSettings = wallet || null;
    if (wallet) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(walletKey, JSON.stringify(wallet));
    } else {
      sessionStorage.removeItem(walletKey);
      localStorage.removeItem(walletKey);
    }
    return Observable.of(wallet);
  }
    
}

// createWallet() {
//   console.log('Create wallet triggered')
//   this.wallet.create_wallet(this.model)
//   .map((res) => res, console.log())
//   .subscribe(console.log);
// }

// openWallet() {
//   console.log('Open wallet triggered')
//   this.wallet.open_wallet(this.model)
//   .map((res) => res, console.log())
//   .subscribe(console.log);
// }

// closeWallet() {
//   console.log('Close wallet triggered')
//   this.wallet.stop_wallet()
//   .map((res) => res, console.log())
//   .subscribe(console.log);
// }