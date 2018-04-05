import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MarketsRoutingModule } from './markets-routing.module';
import { MarketsComponent } from './markets.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MarketsRoutingModule
  ],
  declarations: [
    MarketsComponent
  ]
})
export class MarketsModule { }