import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { WalletComponent } from './wallet.component';

const routes: Routes = Route.withShell([
  { path: 'wallet', component: WalletComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WalletRoutingModule { }