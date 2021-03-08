import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'quica-user-settings',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
	userSettingsForms: FormGroup = new FormGroup({
		newSharesOfMyListings: new FormControl(null),
		marketingEmails: new FormControl(null),
		generalNewsAndProductAnnouncements: new FormControl(null),
		newListingInAChosenCategory: new FormControl(null)
	});

	isSavingChanges: boolean = false;
	isDeletingAccount: boolean = false;

	constructor(private _httpService: HttpClient) { }

	ngOnInit() {
		this.isSavingChanges = true;
		this._httpService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(() => {
			this.userSettingsForms.setValue({
				"newSharesOfMyListings": true,
				"marketingEmails": false,
				"generalNewsAndProductAnnouncements": true,
				"newListingInAChosenCategory": false
			}, { onlySelf: true });

			this.isSavingChanges = false;
		});
	}

	saveUserSettings(): void {
		this.isSavingChanges = true;
		this._httpService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(() => {
			this.isSavingChanges = false;
		});
	}

	deleteUserAccount(): void {
		this.isDeletingAccount = true;
		this._httpService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(() => {
			this.isDeletingAccount = false;
		});
	}
}
