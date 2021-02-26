import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from "./about/about.component";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserListingsComponent } from "./user-listings/user-listings.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { UserWalletComponent } from "./user-wallet/user-wallet.component";
import { UserSavedListingsComponent } from "./user-saved-listings/user-saved-listings.component";

const routes: Routes = [
	{
		path: "about",
		component: AboutComponent
	},
	{
		path: "company-details",
		component: CompanyDetailsComponent
	},
	{
		path: "user-profile",
		component: UserProfileComponent
	},
	{
		path: "user-listings",
		component: UserListingsComponent
	},
	{
		path: "user-settings",
		component: UserSettingsComponent
	},
	{
		path: "user-wallet",
		component: UserWalletComponent
	},
	{
		path: "user-saved-listings",
		component: UserSavedListingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
