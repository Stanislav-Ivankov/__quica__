import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'quica-register-buy',
	templateUrl: './register-buy.component.html',
	styleUrls: ['./register-buy.component.scss']
})
export class RegisterBuyComponent implements OnInit {

	isIDScanLoading = false;
	isStripeVerifyLoading = false;
	queryParameters: Params = {};
	isChecked = false;
	passwordVisible = false;

	phoneNumber = '';
	IDScan: string | ArrayBuffer | null = '';
	StripeStatus = false;

	formData: FormData = new FormData();

	generalInformation: FormGroup = new FormGroup({
		firstName: new FormControl(null, Validators.required),
		lastName: new FormControl(null, Validators.required),
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required),
		dateOfBirth: new FormControl(null, Validators.required),
		placeOfBirth: new FormControl(null),
		gender: new FormControl(null),
		zipCode: new FormControl(null),
		city: new FormControl(null),
		street: new FormControl(null),
		houseNumber: new FormControl(null)
	});

	IDType: FormGroup = new FormGroup({
		typeOfID: new FormControl(null, Validators.required)
	});

	paymentOptions: FormGroup = new FormGroup({
		isStripeConnected: new FormControl(null, Validators.required)
	});

	GDPRConsent: FormGroup = new FormGroup({
		acceptedTermsAndConditions: new FormControl(null, Validators.required)
	});

	summaryForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(window.history.state.phoneNumber, Validators.required),
		firstName: new FormControl(null, Validators.required),
		lastName: new FormControl({ value: null, disabled: true }, Validators.required),
		email: new FormControl({ value: null, disabled: true }, Validators.required),
		password: new FormControl({ value: null, disabled: true }, Validators.required),
		dateOfBirth: new FormControl({ value: null, disabled: true }, Validators.required),
		typeOfID: new FormControl(null, Validators.required),
		placeOfBirth: new FormControl({ value: null, disabled: true }),
		street: new FormControl({ value: null, disabled: true })
	});

	constructor(
		private _httpClientService: HttpClient,
		private _activatedRouteService: ActivatedRoute,
		private _routerService: Router,
		private _sharedService: SharedService, private _snackBar: MatSnackBar) {}

	@ViewChild('STEPPER')
	stepper!: MatStepper;

	ngOnInit() {
		this.phoneNumber = window.history.state.phoneNumber;
		this.queryParameters = this._activatedRouteService.snapshot.queryParams;
	}

	public uploadIDScan(event: Event): void {
		const inputElement = event.target as HTMLInputElement;

		if (!inputElement.files || !inputElement.files[0]) {
			return;
		}

		const fileReader = new FileReader();

		this.isIDScanLoading = true;

		this.formData.append('IDScan', inputElement.files[0], inputElement.files[0].name);
		fileReader.readAsDataURL(inputElement.files[0]);

		fileReader.onload = () => {
			this.IDScan = fileReader.result;
			this.isIDScanLoading = false;
		};
	}

	public removeIDScan(event: Event): void {
		event.stopPropagation();
		this.IDScan = '';
		this.formData.delete('IDScan');
	}

	public connectStripe(): void {
		this.isStripeVerifyLoading = true;
		this._httpClientService.post('https://jsonplaceholder.typicode.com/posts', { phoneNumber: this.phoneNumber }).subscribe(
			() => {
				this.paymentOptions.setValue({ isStripeConnected: true });
				this.StripeStatus = true;
				this._snackBar.open('Stripe Connected', 'DISMISS', { duration: 2500, panelClass: 'Success' });
				this.isStripeVerifyLoading = false;
			},
			() => {
				this.paymentOptions.setValue({ isStripeConnected: false });
				this.StripeStatus = false;
				this.isStripeVerifyLoading = false;
			},
			() => this.isStripeVerifyLoading = false
		);
	}

	public toggleChanged(): void {
		this._snackBar.open(`Edit Mode : ${ this.isChecked ? 'ON' : 'OFF' }`, 'DISMISS', { duration: 2500 });
	}

	public sendVerificationEmail(): void {
		Object.keys(this.generalInformation.controls).forEach(key => {
			this.formData.append(key, this.generalInformation.controls[key].value);
		});

		this.formData.append('typeOfID', this.IDType.controls.typeOfID.value);
		this.formData.append('isStripeConnected', this.paymentOptions.controls.isStripeConnected.value);
		this.formData.append('acceptedTermsAndConditions', this.GDPRConsent.controls.acceptedTermsAndConditions.value);

		this._httpClientService.get('https://jsonplaceholder.typicode.com/todos').subscribe(
			() => this._routerService.navigate(['/verification-email'], { queryParams: { ...this.queryParameters, Registration: 'Done' } }),
			() => {},
			() => {}
		);
	}
}
