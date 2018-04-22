import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// ngx Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { WalletOpenComponent } from './wallet-open.component';
import { WalletCreateComponent } from './wallet-create.component';
import { WalletRestoreComponent } from './wallet-restore.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    WalletRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    NgSelectModule,
    NgbModule
  ],
  declarations: [
    WalletComponent,
    WalletOpenComponent,
    WalletCreateComponent,
    WalletRestoreComponent
  ]
})
export class WalletModule { }