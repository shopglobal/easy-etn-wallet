import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { MarketsComponent } from './markets.component';

const routes: Routes = Route.withShell([
  { path: 'markets', component: MarketsComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MarketsRoutingModule { }