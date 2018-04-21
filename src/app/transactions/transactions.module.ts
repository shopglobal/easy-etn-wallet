import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MomentModule } from 'angular2-moment';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TransactionsRoutingModule,
    MomentModule,
    NgSelectModule,
    NgbModule,
    NgxDatatableModule
  ],
  declarations: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }