import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'quica-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	queryParameters!: Params;

	loginForm: FormGroup = new FormGroup({
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required)
	});

	constructor(private _activatedRouteServce: ActivatedRoute, private _routeService: Router) { }

	ngOnInit() {
		this.queryParameters = this._activatedRouteServce.snapshot.queryParams;
	}

	login() {
		// if (this.loginForm.controls['email'].value == 'test@test.com' && this.loginForm.controls['password'].value == 12345) {
		// 	localStorage.setItem('Username', 'Test_User');
		// }

		switch (this.queryParameters.Process) {
			case "Buy":
				// this.route.navigate(['/checkout', this._activatedRoute.snapshot.queryParams.id], { queryParams: { Process: this.query.Process } });
				break;

			case "Share":
				// this.route.navigate(['/share', this._activatedRoute.snapshot.queryParams.id], { queryParams: { Process: this.query.Process } });
				break;

			default:
				// this.route.navigate(['/about']);
				break;
		}
	}
}
