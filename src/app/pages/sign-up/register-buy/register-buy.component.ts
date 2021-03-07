import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'quica-register-buy',
	templateUrl: './register-buy.component.html',
	styleUrls: ['./register-buy.component.scss']
})
export class RegisterBuyComponent implements OnInit {
	ID: any;
	paymentStatus: any;

	generalInformation: FormGroup = new FormGroup({
		firstName: new FormControl(''),
		lastname: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
		dateOfBirth: new FormControl(''),
		placeOfBirth: new FormControl(''),
		gender: new FormControl(''),
		zipCode: new FormControl(''),
		city: new FormControl(''),
		street: new FormControl(''),
		houseNumber: new FormControl('')
	});

	IDType: FormGroup = new FormGroup({
		typeOfID: new FormControl('', Validators.required)
	});

	paymentOptions: FormGroup = new FormGroup({

	})

	GDPRConsent: FormGroup = new FormGroup({
		acceptedTermsAndConditions: new FormControl('', Validators.required),
		acknowledgedPaymentLiabilityTowardsQuica: new FormControl('', Validators.required)
	});

	constructor() {}

	ngOnInit() { }
}
