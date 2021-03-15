import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { AboutComponent } from './pages/about/about.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { UserListingsComponent } from './pages/user-listings/user-listings.component';
import { UserWalletComponent } from './pages/user-wallet/user-wallet.component';
import { UserSavedListingsComponent } from './pages/user-saved-listings/user-saved-listings.component';
import { SavedListingsTableComponent } from './pages/user-saved-listings/saved-listings-table/saved-listings-table.component';
import { SoldListingsTableComponent } from './pages/user-listings/sold-listings-table/sold-listings-table.component';
import { ActiveListingsTableComponent } from './pages/user-listings/active-listings-table/active-listings-table.component';
import { ItemsWaitingToBeSoldTableComponent } from './pages/user-wallet/items-waiting-to-be-sold-table/items-waiting-to-be-sold-table.component';
import { ItemsSharedWaitingApprovalPaymentComponent } from './pages/user-wallet/items-shared-waiting-approval-payment/items-shared-waiting-approval-payment.component';
import { PendingDealsSellsComponent } from './pages/user-wallet/pending-deals-sells/pending-deals-sells.component';
import { PendingDealsBuysComponent } from './pages/user-wallet/pending-deals-buys/pending-deals-buys.component';
import { PaymentHistoryComponent } from './pages/user-wallet/payment-history/payment-history.component';
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { VerifyNumberModalComponent } from './pages/sign-up/verify-number-modal/verify-number-modal.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RegisterBuyComponent } from './pages/sign-up/register-buy/register-buy.component';
import { RegisterShareComponent } from './pages/sign-up/register-share/register-share.component';
import { RegisterComponent } from './pages/sign-up/register/register.component';
import { VeificationEmailComponent } from './pages/sign-up/veification-email/veification-email.component';
import { SuccessSimilarListingsComponent } from './pages/success-similar-listings/success-similar-listings.component';

import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ShareComponent } from './pages/share/share.component';

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
		LoginComponent,
		SignUpComponent,
		VerifyNumberModalComponent,
		MainPageComponent,
		CheckoutComponent,
		RegisterBuyComponent,
		RegisterShareComponent,
		RegisterComponent,
		VeificationEmailComponent,
		SuccessSimilarListingsComponent,
		ShareComponent
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
		MatDatepickerModule,
		MatSelectModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatDialogModule,
		MatStepperModule,
		MatSnackBarModule,
		MatDividerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
