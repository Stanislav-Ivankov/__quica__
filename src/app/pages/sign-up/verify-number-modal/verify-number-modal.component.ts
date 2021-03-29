import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
	selector: 'quica-verify-number-modal',
	templateUrl: './verify-number-modal.component.html',
	styleUrls: ['./verify-number-modal.component.scss']
})
export class VerifyNumberModalComponent implements OnInit, OnDestroy {

	public isLoading: boolean = false;
	public verifySubscription$: Subscription = new Subscription();

	public verifyNumberForm: FormGroup = new FormGroup({
		verificationCode: new FormControl(null, Validators.required)
	});

	constructor(private _httpService: HttpClient, public modalReference: MatDialogRef<VerifyNumberModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		this.isLoading = true;

		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', this.data).subscribe(
			() => this.isLoading = false,
			() => this.isLoading = false,
			() => this.isLoading = false
		);
	}

	public verifyCode(): void {
		this.isLoading = true;
		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', { ...this.data, ...this.verifyNumberForm.value }).subscribe(
			() => {
				this.isLoading = false;
				this.modalReference.close();
			},
			() => this.isLoading = false,
			() => this.isLoading = false
		);
	}

	public resendCode(): void {
		this.isLoading = true;
		this.verifySubscription$.unsubscribe();
		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', this.data).subscribe(
			() => this.isLoading = false,
			() => this.isLoading = false,
			() => this.isLoading = false
		);
	}

	public closeModal(): void {
		this.verifySubscription$.unsubscribe();
		this.modalReference.close();
	}

	ngOnDestroy() {
		this.verifySubscription$.unsubscribe();
	}
}
