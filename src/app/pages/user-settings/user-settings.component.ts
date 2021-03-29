import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'quica-user-settings',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

	public isSavingChanges: boolean = false;
	public isDeletingAccount: boolean = false;

	public userSettingsForms: FormGroup = new FormGroup({
		newSharesOfMyListings: new FormControl(null),
		usefulMarketingEmails: new FormControl(null),
		productAnnouncements: new FormControl(null),
		newListingsThatInterestMe: new FormControl(null),
		language: new FormControl(null)
	});

	constructor(private _httpClientService: HttpClient) { }

	ngOnInit() {
		this._httpClientService.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(
			() => {
				this.userSettingsForms.setValue({
					newSharesOfMyListings: true,
					usefulMarketingEmails: false,
					productAnnouncements: true,
					newListingsThatInterestMe: false,
					language: "english"
				}, { onlySelf: true });
			},
			() => {},
			() => {}
		);
	}

	public saveUserSettings(): void {
		this.isSavingChanges = true;
		this._httpClientService.post('https://jsonplaceholder.typicode.com/posts', this.userSettingsForms.value).subscribe(
			() => this.isSavingChanges = false,
			() => this.isSavingChanges = false,
			() => this.isSavingChanges = false
		);
	}

	public deleteUserAccount(): void {
		this.isDeletingAccount = true;
		this._httpClientService.post('https://jsonplaceholder.typicode.com/posts', this.userSettingsForms.value).subscribe(
			() => this.isDeletingAccount = false,
			() => this.isDeletingAccount = false,
			() => this.isDeletingAccount = false
		);
	}
}
