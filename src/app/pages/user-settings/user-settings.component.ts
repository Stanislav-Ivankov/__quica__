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

	isLoading: boolean = true;
	isDeleting: boolean = false;

	constructor(private _httpService: HttpClient) { }

	ngOnInit(): void {
		this._httpService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(() => {
			this.userSettingsForms.setValue({
				"newSharesOfMyListings": true,
				"marketingEmails": false,
				"generalNewsAndProductAnnouncements": true,
				"newListingInAChosenCategory": false
			}, { onlySelf: true });

			this.isLoading = false;
		});
	}

	saveUserSettings(): void {
		this.isLoading = true;
		this._httpService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(() => {
			console.log(this.userSettingsForms.value);
			this.isLoading = false;
		});
	}

	deleteUserAccount(): void {
		this.isDeleting = true;
		this._httpService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(() => {
			console.log(this.userSettingsForms.value);
			this.isDeleting = false;
		});
	}
}
