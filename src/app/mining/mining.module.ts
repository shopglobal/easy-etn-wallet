import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MiningRoutingModule } from './mining-routing.module';
import { MiningComponent } from './mining.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MiningRoutingModule
  ],
  declarations: [
    MiningComponent
  ]
})
export class MiningModule { }