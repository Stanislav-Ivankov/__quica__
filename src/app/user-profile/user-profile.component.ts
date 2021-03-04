import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from "../services/user.service";

@Component({
	selector: 'quica-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	isIDScanUploading: boolean = false;
	isIDScanPresent: boolean = false;
	isProfilePicturePresent: boolean = false;
	base64ProfilePictureURL: string | ArrayBuffer | null = "";
	base64IDScanURL: string | ArrayBuffer | null = "";

	profileForm: FormGroup = new FormGroup({
		userProfilePicture: new FormControl(""),
		firstName: new FormControl(""),
		lastName: new FormControl(""),
		phoneNumber: new FormControl(""),
		email: new FormControl(""),
		password: new FormControl(""),
		dateOfBirth: new FormControl(""),
		placeOfBirth: new FormControl(""),
		zipCode: new FormControl(""),
		city: new FormControl(""),
		street: new FormControl(""),
		houseNumber: new FormControl(""),
		bio: new FormControl(""),
		IDScan: new FormControl("")
	});

	constructor(private _userSerice: UserService) { }

	ngOnInit(): void { }

	public uploadProfilePicture(event: Event) {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.files) {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(inputElement.files[0]);

			fileReader.onprogress = () => {
				this.isIDScanUploading = true
			}

			fileReader.onload = () => {
				this.base64ProfilePictureURL = fileReader.result;
				this.isProfilePicturePresent = true;
				this._userSerice.profilePictureChangeNotification.emit(fileReader.result);
			}
		}
	}

	public uploadIDScan(event: Event): void {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.files) {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(inputElement.files[0]);

			fileReader.onprogress = () => {
				this.isIDScanUploading = true
			}

			fileReader.onload = () => {
				console.log(fileReader.result);
				
				this.base64IDScanURL = fileReader.result;
				this.isIDScanPresent = true;
				this.isIDScanUploading = false;
			}
		}
	}

	public submitProfileForm() {
		console.log(this.profileForm.value);
	}
}
