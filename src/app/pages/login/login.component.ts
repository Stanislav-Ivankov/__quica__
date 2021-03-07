import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

	query: any

	constructor(private _activatedRoute: ActivatedRoute, private route: Router) { }

	ngOnInit() {
		this.query = this._activatedRoute.snapshot.queryParams;
	}

	login() {
		localStorage.setItem('Username', 'Test_User');

		switch (this.query.Process) {
			case "Buy":
				this.route.navigate(['/checkout', this._activatedRoute.snapshot.queryParams.id], { queryParams: { Process: this.query.Process } });
				break;
			case "Share":
				this.route.navigate(['/checkout', this._activatedRoute.snapshot.queryParams.id], { queryParams: { Process: this.query.Process } });
				break;
			default:
				this.route.navigate(['/about']);
				break;
		}
	}
}
