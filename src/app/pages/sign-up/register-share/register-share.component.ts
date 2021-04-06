import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'quica-register-share',
	templateUrl: './register-share.component.html',
	styleUrls: ['./register-share.component.scss']
})
export class RegisterShareComponent implements OnInit {

	queryParameters: Params = {};
	phoneNumber = '';
	isChecked = false;
	passwordVisible = false;

	formData: FormData = new FormData();

	basicInformation: FormGroup = new FormGroup({
		firstName: new FormControl(null, Validators.required),
		lastName: new FormControl(null, Validators.required),
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required)
	});

	GDPRConsent: FormGroup = new FormGroup({
		acceptedTermsAndConditions: new FormControl(null, Validators.required)
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
	}

	public toggleChanged(): void {
		this._snackBar.open(`Edit Mode : ${ this.isChecked ? 'ON' : 'OFF' }`, 'DISMISS', { duration: 2500 });
	}

	public sendVerificationEmail(): void {
		Object.keys(this.basicInformation.controls).forEach(key => {
			this.formData.append(key, this.basicInformation.controls[key].value);
		});

		this.formData.append('acceptedTermsAndConditions', this.GDPRConsent.controls.acceptedTermsAndConditions.value);

		this._httpClientService.get('https://jsonplaceholder.typicode.com/todos').subscribe(
			() => this._routerService.navigate(['/verification-email'],
				{ queryParams: { ...this.queryParameters, Registration: 'Done' } }),
			() => {},
			() => {}
		);
	}
}
