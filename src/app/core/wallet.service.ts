import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// 3rd Party 
import { makeUrl, Wallet, Atomic, Xmr, generatePaymentId } from 'rx-monero-wallet';

export interface Wallet {
  filename: string;
  password: string;
  language: string;
}

const walletKey = 'wallet';

@Injectable()
export class WalletService {
  
  // Wallet Connect
  url = makeUrl('http', '66.175.216.72', '80', 'json_rpc');
  mywallet = Wallet(this.url);

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
   */
  saveWallet(wallet?: Wallet) : Observable<Wallet> {
    this._walletSettings = wallet;
    if (wallet) {
      const storage = sessionStorage;
      storage.setItem(walletKey, JSON.stringify(wallet));
    } else {
      sessionStorage.removeItem(walletKey);
    }
    return Observable.of(wallet);
  }

  createWallet() {
    return this.mywallet.create_wallet(this._walletSettings)
  }

  openWallet() {
    return this.mywallet.open_wallet(this._walletSettings)
  }

  closeWallet() {
    return this.mywallet.stop_wallet()
  }

  getWalletHeight() {
    return this.mywallet.getheight()
  }

  getAddress() {
    return this.mywallet.getaddress()
  }

}