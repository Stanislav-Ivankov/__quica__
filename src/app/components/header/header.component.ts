import { Component, OnInit } from '@angular/core';

import { UserService } from "../../services/user.service";

@Component({
	selector: 'quica-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public isUserLoggedIn: boolean | null = null;
	public userProfilePicture: string | ArrayBuffer | null = null;

	constructor(private _userService: UserService) { }

	ngOnInit() { }
}
