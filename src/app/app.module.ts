import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { AboutComponent } from './about/about.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListingsComponent } from './user-listings/user-listings.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { UserSavedListingsComponent } from './user-saved-listings/user-saved-listings.component';
import { SavedListingsTableComponent } from './user-saved-listings/saved-listings-table/saved-listings-table.component';
import { SoldListingsTableComponent } from './user-listings/sold-listings-table/sold-listings-table.component';
import { ActiveListingsTableComponent } from './user-listings/active-listings-table/active-listings-table.component';
import { ItemsWaitingToBeSoldTableComponent } from './user-wallet/items-waiting-to-be-sold-table/items-waiting-to-be-sold-table.component';
import { ItemsSharedWaitingApprovalPaymentComponent } from './user-wallet/items-shared-waiting-approval-payment/items-shared-waiting-approval-payment.component';
import { PendingDealsSellsComponent } from './user-wallet/pending-deals-sells/pending-deals-sells.component';
import { PendingDealsBuysComponent } from './user-wallet/pending-deals-buys/pending-deals-buys.component';
import { PaymentHistoryComponent } from './user-wallet/payment-history/payment-history.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
=======
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { AboutComponent } from './pages/about/about.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserListingsComponent } from './pages/user-listings/user-listings.component';
import { UserWalletComponent } from './pages/user-wallet/user-wallet.component';
import { UserSavedListingsComponent } from './pages/user-saved-listings/user-saved-listings.component';
import { SavedListingsTableComponent } from './pages/user-saved-listings/saved-listings-table/saved-listings-table.component';
>>>>>>> Fix some structures

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from "@angular/material/paginator";
import { HttpClientModule } from "@angular/common/http";
import { MatSortModule } from "@angular/material/sort";
<<<<<<< HEAD
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
=======
import { SoldListingsTableComponent } from './pages/user-listings/sold-listings-table/sold-listings-table.component';
import { ActiveListingsTableComponent } from './pages/user-listings/active-listings-table/active-listings-table.component';
import { ItemsWaitingToBeSoldTableComponent } from './pages/user-wallet/items-waiting-to-be-sold-table/items-waiting-to-be-sold-table.component';
import { ItemsSharedWaitingApprovalPaymentComponent } from './pages/user-wallet/items-shared-waiting-approval-payment/items-shared-waiting-approval-payment.component';
import { PendingDealsSellsComponent } from './pages/user-wallet/pending-deals-sells/pending-deals-sells.component';
import { PendingDealsBuysComponent } from './pages/user-wallet/pending-deals-buys/pending-deals-buys.component';
import { PaymentHistoryComponent } from './pages/user-wallet/payment-history/payment-history.component';
>>>>>>> Fix some structures

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		CompanyDetailsComponent,
		AboutComponent,
		UserSettingsComponent,
		UserProfileComponent,
		UserListingsComponent,
		UserWalletComponent,
		UserSavedListingsComponent,
		SavedListingsTableComponent,
		SoldListingsTableComponent,
		ActiveListingsTableComponent,
		ItemsWaitingToBeSoldTableComponent,
		ItemsSharedWaitingApprovalPaymentComponent,
		PendingDealsSellsComponent,
		PendingDealsBuysComponent,
		PaymentHistoryComponent,
		ListingDetailsComponent,
		SignUpComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatGridListModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatMenuModule,
		MatChipsModule,
		MatListModule,
		MatExpansionModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatProgressBarModule,
		MatPaginatorModule,
		HttpClientModule,
		MatSortModule,
		MatSelectModule,
		MatNativeDateModule,
		MatDatepickerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
