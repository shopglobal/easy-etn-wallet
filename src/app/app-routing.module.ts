import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MinerComponent } from './components/miner/miner.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'transfers', component: TransfersComponent },
	{ path: 'payments', component: PaymentsComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'miner', component: MinerComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
