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
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { RegisterBuyComponent } from "./pages/sign-up/register-buy/register-buy.component";
import { RegisterShareComponent } from "./pages/sign-up/register-share/register-share.component";
import { RegisterComponent } from "./pages/sign-up/register/register.component";

import { AuthenticateGuard } from "./guards/authenticate.guard";
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
	{
		path: "",
		component: MainPageComponent
	},
	{
		path: "checkout/:id",
		component: CheckoutComponent
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "sign-up",
		component: SignUpComponent
	},
	{
		path: "sign-up/register-buy",
		component: RegisterBuyComponent
	},
	{
		path: "sign-up/register-share",
		component: RegisterShareComponent
	},
	{
		path: "sign-up/register",
		component: RegisterComponent
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
