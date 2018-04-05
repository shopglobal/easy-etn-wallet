import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { TransfersComponent } from './transfers.component';

const routes: Routes = Route.withShell([
  { path: 'transfers', component: TransfersComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransfersRoutingModule { }