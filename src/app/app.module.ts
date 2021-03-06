// Deps
import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';

// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// 3rd Party
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// App Services & Directives
import { SettingsService } from './core/settings.service';
import { WalletService } from './core/wallet.service';
import { DaemonService } from './core/daemon.service';
import { ElectronService } from './core/electron.service';
import { WebviewDirective } from './core/webview.directive';

// App Components 
import { AppComponent } from './app.component';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { ContactsModule } from './contacts/contacts.module';
import { MarketsModule } from './markets/markets.module';
import { MiningModule } from './mining/mining.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransfersModule } from './transfers/transfers.module';
import { SettingsModule } from './settings/settings.module';
import { WalletModule } from './wallet/wallet.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    LoginModule,
    HomeModule,
    ContactsModule,
    MiningModule,
    PaymentsModule,
    TransactionsModule,
    TransfersModule,
    SettingsModule,
    WalletModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WebviewDirective
  ],
  providers: [
    ElectronService,
    SettingsService,
    WalletService,
    DaemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
