import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { normalizePhoneNumber } from '../../../utilities/utilities';

@Component({
	selector: 'quica-verify-number-modal',
	templateUrl: './verify-number-modal.component.html',
	styleUrls: ['./verify-number-modal.component.scss']
})
export class VerifyNumberModalComponent implements OnInit, OnDestroy {

	isLoading: boolean | null = null;
	verifySubscription$: Subscription = new Subscription();

	OTPForm: FormGroup = new FormGroup({
		verificationCode: new FormControl(null, Validators.required)
	});

	constructor(
		private _httpService: HttpClient,
		public modalReference: MatDialogRef<VerifyNumberModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
		this.isLoading = true;
		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', {
			phoneNumber: normalizePhoneNumber(this.data.phoneNumber)
		}).subscribe(
			() => this.isLoading = false,
			() => this.isLoading = false,
			() => {}
		);
	}

	ngOnDestroy() {
		this.verifySubscription$.unsubscribe();
	}

	verifyCode() {
		this.isLoading = true;
		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', {
			phoneNumber: normalizePhoneNumber(this.data.phoneNumber),
			verificationCode: this.OTPForm.value.verificationCode
		}).subscribe(
			() => { this.isLoading = false; this.modalReference.close(); },
			() => this.isLoading = false,
			() => {}
		);
	}

	resendCode() {
		this.isLoading = true;
		this.verifySubscription$.unsubscribe();
		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', {
			phoneNumber: normalizePhoneNumber(this.data.phoneNumber)
		}).subscribe(
			() => this.isLoading = false,
			() => this.isLoading = false,
			() => {}
		);
	}

	closeModal() {
		this.verifySubscription$.unsubscribe();
		this.modalReference.close();
	}
}
