import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'quica-user-settings',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
	userSettingsForms: FormGroup;

	constructor() {
		this.userSettingsForms = new FormGroup({
			newSharesOfMyListings: new FormControl(null),
			marketingEmails: new FormControl(null),
			generalNewsAndProductAnnouncements: new FormControl(null),
			newListingInAChosenCategory: new FormControl(null)
		});
	}

	ngOnInit(): void {
		this.userSettingsForms.setValue({
			"newSharesOfMyListings": true,
			"marketingEmails": false,
			"generalNewsAndProductAnnouncements": true,
			"newListingInAChosenCategory": false
		}, { onlySelf: true });
	}

	saveUserSettingsHandler(): void {
		console.log(this.userSettingsForms.value);
	}

	deleteUserAccountHandler(): void {
		console.log('DELETE ACCOUNT');
	}
}
