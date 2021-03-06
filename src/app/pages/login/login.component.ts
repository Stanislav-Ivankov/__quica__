import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { LoginService } from '../../services/login.service';

@Component({
	selector: 'quica-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public isLoading = false;
	public queryParameters: Params = {};

	public loginForm: FormGroup = new FormGroup({
		email: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required)
	});

	constructor(
		private _activatedRouteServce: ActivatedRoute,
		private _routeService: Router,
		private _httpClientService: HttpClient, private loginService: LoginService) { }

	ngOnInit() {
		this.queryParameters = this._activatedRouteServce.snapshot.queryParams;
	}

	public login(): void {
		this.isLoading  = true;
		this._httpClientService.post('https://jsonplaceholder.typicode.com/posts', this.loginForm.value).subscribe(
			() => {
				if (this.loginForm.controls.email.value === 'test@test.com' && this.loginForm.controls.password.value === '12345') {
					localStorage.setItem('Username', 'Test_User');

					switch (this.queryParameters.Process) {
						case 'Sell':
							this._routeService.navigate(['/listing-summary'],
								{ queryParams: { Process: this.queryParameters.Process, Registration: this.queryParameters.Registration } });
							break;

						case 'Buy':
							this._routeService.navigate(['/checkout', this.queryParameters.id],
								{ queryParams: { Process: this.queryParameters.Process, Registration: this.queryParameters.Registration } });
							break;

						case 'Share':
							this._routeService.navigate(['/share', this.queryParameters.id],
								{ queryParams: { Process: this.queryParameters.Process, Registration: this.queryParameters.Registration } });
							break;

						default:
							this._routeService.navigate(['/']);
							break;
					}
				}

				this.isLoading = false;
			},
			() => this.isLoading = false,
			() => this.isLoading = false
		);
	}
}
