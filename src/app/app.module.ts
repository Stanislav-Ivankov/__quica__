import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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
import { SoldListingsTableComponent } from './user-listings/sold-listings-table/sold-listings-table.component';
import { ActiveListingsTableComponent } from './user-listings/active-listings-table/active-listings-table.component';

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
		ActiveListingsTableComponent
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
		MatSortModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
