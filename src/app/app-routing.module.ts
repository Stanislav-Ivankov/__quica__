import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from "./pages/about/about.component";
import { CompanyDetailsComponent } from "./pages/company-details/company-details.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { UserListingsComponent } from "./pages/user-listings/user-listings.component";
import { UserSettingsComponent } from "./pages/user-settings/user-settings.component";
import { UserWalletComponent } from "./pages/user-wallet/user-wallet.component";
import { UserSavedListingsComponent } from "./pages/user-saved-listings/user-saved-listings.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";

const routes: Routes = [
	{
		path: "",
		component: LoginComponent
	},
	{
		path: "sign-up",
		component: SignUpComponent
	},
	{
		path: "about",
		component: AboutComponent
	},
	{
		path: "company-details/:id",
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
