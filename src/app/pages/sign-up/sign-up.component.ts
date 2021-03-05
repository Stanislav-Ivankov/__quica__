import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VerifyNumberModalComponent } from "./verify-number-modal/verify-number-modal.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'quica-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
	verifyPhoneNumberForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(null, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g))
	});

	constructor(public dialog: MatDialog) { }

	ngOnInit() {}

	open() {
		this.dialog.open(VerifyNumberModalComponent, { width: "375px", data: { phoneNumber: this.verifyPhoneNumberForm.value } });
	}
}
