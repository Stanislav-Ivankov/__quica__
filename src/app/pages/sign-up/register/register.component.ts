import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'quica-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	isIDScanLoading = false;
	isOTPVerifyLoading = false;
	queryParameters: Params = {};

	phoneNumber = '';
	IDScan: string | ArrayBuffer | null = '';
	OTPStatus = false;

	formData: FormData = new FormData();

	generalInformation: FormGroup = new FormGroup({
		firstName: new FormControl(null, Validators.required),
		lastname: new FormControl(null, Validators.required),
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required),
		dateOfBirth: new FormControl(null, Validators.required),
		placeOfBirth: new FormControl(null, Validators.required),
		gender: new FormControl(null),
		zipCode: new FormControl(null),
		city: new FormControl(null),
		street: new FormControl(null, Validators.required),
		houseNumber: new FormControl(null)
	});

	IDType: FormGroup = new FormGroup({
		typeOfID: new FormControl(null, Validators.required)
	});

	paymentOptions: FormGroup = new FormGroup({
		isOTPConnected: new FormControl(null, Validators.required)
	});

	GDPRConsent: FormGroup = new FormGroup({
		acceptedTermsAndConditions: new FormControl(null, Validators.required),
		acknowledgedPaymentLiabilityTowardsQuica: new FormControl(null, Validators.required)
	});

	summaryForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl({ value: window.history.state.phoneNumber, disabled: true }, Validators.required),
		firstName: new FormControl({ value: null, disabled: true }, Validators.required),
		lastName: new FormControl({ value: null, disabled: true }, Validators.required),
		email: new FormControl({ value: null, disabled: true }, Validators.required),
		password: new FormControl({ value: null, disabled: true }, Validators.required),
		dateOfBirth: new FormControl({ value: null, disabled: true }, Validators.required),
		placeOfBirth: new FormControl({ value: null, disabled: true }, Validators.required),
		street: new FormControl({ value: null, disabled: true }, Validators.required)
	});

	constructor(
		private _httpClientService: HttpClient,
		private _activatedRouteService: ActivatedRoute,
		private _routerService: Router,
		private _sharedService: SharedService,
		private _snackBar: MatSnackBar
	) {}

	@ViewChild('STEPPER')
	stepper!: MatStepper;

	ngOnInit() {
		this.phoneNumber = window.history.state.phoneNumber;
		this.queryParameters = this._activatedRouteService.snapshot.queryParams;
		console.log(this.queryParameters);
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

	public removeIDScan(): void {
		this.IDScan = '';
		this.formData.delete('IDScan');
	}

	public connectOTPSimple(): void {
		this.isOTPVerifyLoading = true;
		this._httpClientService.post('https://jsonplaceholder.typicode.com/posts', { phoneNumber: this.phoneNumber }).subscribe(
			() => {
				this.paymentOptions.setValue({ isOTPConnected: true });
				this.OTPStatus = true;
				this._snackBar.open('OTP Simple Connected', 'DISMISS', { duration: 5000, panelClass: 'Success' });
				this.isOTPVerifyLoading = false;
			},
			() => {
				this.paymentOptions.setValue({ isOTPConnected: false });
				this.OTPStatus = false;
				this.isOTPVerifyLoading = false;
			},
			() => this.isOTPVerifyLoading = false
		);
	}

	public sendVerificationEmail(): void {
		Object.keys(this.generalInformation.controls).forEach(key => {
			this.formData.append(key, this.generalInformation.controls[key].value);
		});

		this.formData.append('typeOfID', this.IDType.controls.typeOfID.value);
		this.formData.append('isOTPConnected', this.paymentOptions.controls.isOTPConnected.value);
		this.formData.append('acceptedTermsAndConditions', this.GDPRConsent.controls.acceptedTermsAndConditions.value);
		this.formData.append(
			'acknowledgedPaymentLiabilityTowardsQuica',
			this.GDPRConsent.controls.acknowledgedPaymentLiabilityTowardsQuica.value
		);

		this._httpClientService.post('https://jsonplaceholder.typicode.com/posts', this.formData).subscribe(
			() => this._routerService.navigate(['/verification-email'], { queryParams: { ...this.queryParameters, Registration: 'Done' } }),
			() => {},
			() => {}
		);
	}
}
