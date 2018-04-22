import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { WalletOpenComponent } from './wallet-open.component';
import { WalletCreateComponent } from './wallet-create.component';
import { WalletRestoreComponent } from './wallet-restore.component';

const routes: Routes = [
  { path: 'wallet', component: WalletComponent },
  { path: 'wallet-open',  component: WalletOpenComponent },
  { path: 'wallet-create', component: WalletCreateComponent },
  { path: 'wallet-restore', component: WalletRestoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WalletRoutingModule { }