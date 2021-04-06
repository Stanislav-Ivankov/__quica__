import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Params } from '@angular/router';

import { VerifyNumberModalComponent } from './verify-number-modal/verify-number-modal.component';

@Component({
	selector: 'quica-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	public queryParameters: Params = {};

	public phoneNumberForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(null, Validators.required)
	});

	constructor(public modal: MatDialog) { }

	ngOnInit() {}

	public openModal(): void {
		this.modal.open(VerifyNumberModalComponent, {
			width: '450px',
			data: { ...this.phoneNumberForm.value }
		});
	}
}
