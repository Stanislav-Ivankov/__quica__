import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'quica-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup = new FormGroup({
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required)
	});

	constructor() { }

	ngOnInit() { }

	login() {
		console.log(this.loginForm.value);
	}
}
