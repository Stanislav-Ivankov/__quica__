import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";
import { LoginService } from "../../services/login.service";

@Component({
	selector: 'quica-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public isUserLoggedIn: boolean | null = false;
	public userProfilePicture: string | ArrayBuffer | null = "";

	constructor(private _userService: UserService, private _loginService: LoginService, private _routerService: Router) { }

	ngOnInit() {
		this._userService.profilePictureChangeNotification.subscribe((payload: string | ArrayBuffer | null) => this.userProfilePicture = payload);
		this._loginService.loggedStatus.subscribe((payload: boolean) => this.isUserLoggedIn = payload);
	}

	logout() {
		localStorage.removeItem('Username');
		this._loginService.loggedStatus.emit(false);
		this._routerService.navigate(['/']);
	}
}
