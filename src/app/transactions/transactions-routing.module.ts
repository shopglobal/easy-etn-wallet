import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = Route.withShell([
  { path: 'transactions', component: TransactionsComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransactionsRoutingModule { }