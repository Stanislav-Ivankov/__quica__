import { Component, OnInit } from '@angular/core';

import { UserService } from "../services/user.service";

@Component({
	selector: 'quica-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public isLogged: boolean = false;
	public profilePicture: string = "";

	constructor(private _userService: UserService) { }

	ngOnInit() {
		this._userService.profilePictureChangeNotification.subscribe((profilePicture: string) => {
			this.profilePicture = profilePicture;
		});
	}
}
