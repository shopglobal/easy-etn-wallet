// Angular 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

// 3rd Party 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { QRCodeModule } from 'angularx-qrcode';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    NgbModule,
    MomentModule,
    QRCodeModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }