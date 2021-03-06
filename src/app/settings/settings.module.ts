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
    NgbModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }