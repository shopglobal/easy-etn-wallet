import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

import { MomentModule } from 'angular2-moment';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TransactionsRoutingModule,
    DataTablesModule,
    MomentModule,
    NgSelectModule,
    NgbModule
  ],
  declarations: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }