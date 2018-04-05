import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../core/route.service';
import { PaymentsComponent } from './payments.component';

const routes: Routes = Route.withShell([
  { path: 'payments', component: PaymentsComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PaymentsRoutingModule { }