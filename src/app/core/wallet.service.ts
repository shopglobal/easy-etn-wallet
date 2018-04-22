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
   * @param {boolean=} remember True to remember wallet settings across sessions.
   */
  saveWallet(wallet?: Wallet, remember?: boolean) : Observable<Wallet> {
    this._walletSettings = wallet;
    if (wallet) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(walletKey, JSON.stringify(wallet));
    } else {
      sessionStorage.removeItem(walletKey);
      localStorage.removeItem(walletKey);
    }
    return Observable.of(wallet);
  }

  createWallet() {
    console.log('Create wallet triggered')
    this.mywallet.create_wallet(this._walletSettings)
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

  openWallet() {
    console.log('Create wallet triggered')
    this.mywallet.open_wallet(this._walletSettings)
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

  closeWallet() {
    console.log('Close wallet triggered')
    this.mywallet.stop_wallet()
    .map((res) => res, console.log())
    .subscribe(console.log);
  }

}