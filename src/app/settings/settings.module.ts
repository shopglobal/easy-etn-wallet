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

// App Data Storage
import { NgxWarehouseModule, WarehouseConfig, DRIVER_TYPE } from 'ngx-warehouse';

const config: WarehouseConfig = {
  driver: DRIVER_TYPE.DEFAULT,
  name: 'Easy ETN Wallet',
  version: 1.0,
  storeName: 'key_value_pairs', // Should be alphanumeric, with underscores.
  description: 'Unoffical Electroneum Desktop Wallet'
};

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    NgSelectModule,
    NgbModule,
    NgxWarehouseModule.configureWarehouse(config)
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }