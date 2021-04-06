import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'quica-verify-number-modal',
	templateUrl: './verify-number-modal.component.html',
	styleUrls: ['./verify-number-modal.component.scss']
})
export class VerifyNumberModalComponent implements OnInit, OnDestroy {

	public isLoading = false;
	public verifySubscription$: Subscription = new Subscription();
	public queryParameters: Params = {};

	public verifyNumberForm: FormGroup = new FormGroup({
		verificationCode: new FormControl(null, Validators.required)
	});

	constructor(
		private _httpService: HttpClient,
		private _routerService: Router,
		private _activatedRouteService: ActivatedRoute,
		public modalReference: MatDialogRef<VerifyNumberModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		this.isLoading = true;
		this.queryParameters = this._activatedRouteService.snapshot.queryParams;

		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', this.data).subscribe(
			() => this.isLoading = false,
			() => this.isLoading = false,
			() => this.isLoading = false
		);
	}

	public verifyCode(): void {
		this.isLoading = true;
		this.verifySubscription$ = this._httpService.post('https://jsonplaceholder.typicode.com/posts', this.data).subscribe(
			() => {
				switch (this.queryParameters.Process) {
					case 'Buy':
					this._routerService.navigate(['/sign-up/register-buy'],
						{ state: { phoneNumber: this.data.phoneNumber }, queryParams: this._activatedRouteService.snapshot.queryParams });
					break;

					case 'Share':
						this._routerService.navigate(['/sign-up/register-share'],
							{ state: { phoneNumber: this.data.phoneNumber }, queryParams: this._activatedRouteService.snapshot.queryParams });
						break;

					default:
						this._routerService.navigate(['/sign-up/register'],
							{ state: { phoneNumber: this.data.phoneNumber }, queryParams: this._activatedRouteService.snapshot.queryParams });
						break;
				}

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
