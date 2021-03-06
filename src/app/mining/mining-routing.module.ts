import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { MiningComponent } from './mining.component';

const routes: Routes = Route.withShell([
  { path: 'mining', component: MiningComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MiningRoutingModule { }