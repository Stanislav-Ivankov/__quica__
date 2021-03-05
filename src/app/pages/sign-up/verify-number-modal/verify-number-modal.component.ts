import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
	selector: 'quica-verify-number-modal',
	templateUrl: './verify-number-modal.component.html',
	styleUrls: ['./verify-number-modal.component.scss']
})
export class VerifyNumberModalComponent implements OnInit {
	isLoading: boolean = false;
	verifySubscription$: Subscription = new Subscription();
	verificationForm: FormGroup = new FormGroup({
		verificationCode: new FormControl(null, Validators.required)
	});

	constructor(private _httpService: HttpClient, public dialogRef: MatDialogRef<VerifyNumberModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		this.isLoading = true;
		this.verifySubscription$ = this._httpService.post("https://jsonplaceholder.typicode.com/posts", this.data.phoneNumber.phoneNumber)
			.subscribe(() => this.isLoading = false);
	}

	verifyCode() {
		this.isLoading = true;
		this.verifySubscription$ = this._httpService.post("https://jsonplaceholder.typicode.com/posts", {
			phoneNumber: this.data.phoneNumber.phoneNumber,
			verificationCode: 1234
		})
		.subscribe(() => this.isLoading = false);
	}

	resendCode() {
		this.isLoading = true;
		this.verifySubscription$.unsubscribe();
		this.verifySubscription$ = this._httpService.post("https://jsonplaceholder.typicode.com/posts", this.data.phoneNumber.phoneNumber).
			subscribe(() => this.isLoading = false);
	}

	closeModal() {
		this.dialogRef.close();
	}
}