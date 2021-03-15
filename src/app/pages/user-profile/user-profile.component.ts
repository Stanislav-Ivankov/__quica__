import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";
import { normalizePhoneNumber } from "../../utilities/utilities";
import { ThemePalette } from '@angular/material/core';

@Component({
	selector: 'quica-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	isProfileSaving = false;
	isProfilePictureLoading: boolean = false;
	isIDScanLoading: boolean = false;
	filledControlsCount: number = 0;

	percentage: number = 0;
	color: ThemePalette = "warn";
	messageColor: string = "red"

	profilePicture: string | ArrayBuffer | null = "";
	IDScan: string | ArrayBuffer | null = "";

	formData: FormData = new FormData();
	profileForm: FormGroup = new FormGroup({
		firstName: new FormControl(null, Validators.required),
		lastName: new FormControl(null),
		phoneNumber: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)])),
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required),
		dateOfBirth: new FormControl(null),
		placeOfBirth: new FormControl(null),
		gender: new FormControl(null),
		zipCode: new FormControl(null),
		city: new FormControl(null),
		street: new FormControl(null),
		houseNumber: new FormControl(null),
		bio: new FormControl(null),
		taxNumber: new FormControl(null)
	});

	constructor(private _httpClientService: HttpClient, private _routerService: Router, private _userService: UserService) { }

	ngOnInit() {
		this.profileForm.setValue({
			firstName: "Tom",
			lastName: null,
			phoneNumber: "1234567",
			email: "email@email.com",
			password: 1234567,
			dateOfBirth: null,
			placeOfBirth: null,
			gender: null,
			zipCode: null,
			city: null,
			street: null,
			houseNumber: null,
			bio: null,
			taxNumber: null
		});

		this.checkProfileCompetion();
	}

	public checkProfileCompetion(): void {
		Object.keys(this.profileForm.controls).forEach(key => {
			if (this.profileForm.controls[key].value) {
				this.filledControlsCount++;
			}
		});

		if (this.filledControlsCount <= 4) {
			this.percentage = 20;
			this.color = "warn";
			this.messageColor = "#F44336"
		} else if (this.filledControlsCount > 4 && this.filledControlsCount <= 6) {
			this.percentage = 35;
			this.color = "accent";
			this.messageColor = "#FF4081";
		} else if (this.filledControlsCount > 6 && this.filledControlsCount <= 8) {
			this.percentage = 50;
			this.color = "accent";
			this.messageColor = "#FF4081";
		} else if (this.filledControlsCount > 8 && this.filledControlsCount <= 10) {
			this.percentage = 65;
			this.color = "accent";
			this.messageColor = "#FF4081";
		} else if (this.filledControlsCount > 10 && this.filledControlsCount <= 12) {
			this.percentage = 80;
			this.color = "primary";
			this.messageColor = "#3F51B5";
		} else if (this.filledControlsCount > 12 && this.filledControlsCount <= 14) {
			this.percentage = 100;
			this.color = "primary";
			this.messageColor = "#3F51B5";
		}

		this.filledControlsCount = 0;
	}

	public uploadProfilePicture(event: Event): void {
		const inputElement = event.target as HTMLInputElement;

		if (!inputElement.files || !inputElement.files[0]) {
			return;
		}

		const fileReader = new FileReader();

		this.isProfilePictureLoading = true;

		this.formData.append("profilePicture", inputElement.files[0], inputElement.files[0].name);
		fileReader.readAsDataURL(inputElement.files[0]);

		fileReader.onload = () => {
			this.profilePicture = fileReader.result;
			this._userService.profilePictureChangeNotification.next(fileReader.result);
			this.isProfilePictureLoading = false;
		}
	}

	public removeProfilePicture(): void {
		this.profilePicture = "";
		this.formData.delete("profilePicture");
	}

	public uploadIDScan(event: Event): void {
		const inputElement = event.target as HTMLInputElement;

		if (!inputElement.files || !inputElement.files[0]) {
			return;
		}

		const fileReader = new FileReader();

		this.isIDScanLoading = true;

		this.formData.append("IDScan", inputElement.files[0], inputElement.files[0].name);
		fileReader.readAsDataURL(inputElement.files[0]);

		fileReader.onload = () => {
			this.IDScan = fileReader.result;
			this.isIDScanLoading = false;
		}
	}

	public removeIDScan(): void {
		this.IDScan = "";
		this.formData.delete("IDScan");
	}

	public saveProfile(): void {
		Object.keys(this.profileForm.controls).forEach(key => {
			if ("phoneNumber" === key) {
				this.formData.append(key, normalizePhoneNumber(this.profileForm.controls[key].value));
			} else {
				this.formData.append(key, this.profileForm.controls[key].value);
			}
		});

		this.isProfileSaving = true;
		this._httpClientService.post("https://jsonplaceholder.typicode.com/posts", this.formData).subscribe(
			() => this.isProfileSaving = false,
			() => this.isProfileSaving = false,
			() => this.isProfileSaving = false
		);
	}
}
