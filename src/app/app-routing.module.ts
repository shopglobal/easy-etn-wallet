import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MiningComponent } from './components/mining/mining.component';
import { MarketsComponent } from './components/markets/markets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'transfers', component: TransfersComponent },
	{ path: 'payments', component: PaymentsComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'mining', component: MiningComponent },
	{ path: 'markets', component: MarketsComponent },
	{ path: 'settings', component: SettingsComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
