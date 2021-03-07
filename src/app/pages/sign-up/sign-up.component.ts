import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VerifyNumberModalComponent } from "./verify-number-modal/verify-number-modal.component";

@Component({
	selector: 'quica-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	queryParameters!: Params;

	phoneNumberForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)]))
	});

	constructor(private _activatedRouteService: ActivatedRoute, private _routeService: Router, public dialog: MatDialog) { }

	ngOnInit() {
		this.queryParameters = this._activatedRouteService.snapshot.queryParams;
	}

	openModal() {
		const modalReference = this.dialog.open(VerifyNumberModalComponent, { width: "375px", data: { phoneNumber: this.phoneNumberForm.value.phoneNumber } });

		modalReference.afterClosed().subscribe(() => {
			switch (this.queryParameters.Process) {
				case "Buy":
					// this.route.navigate(['/sign-up/register-buy'], { queryParams: this._activatedRoute.snapshot.queryParams });
					break;

				case "Share":
					// this.route.navigate(['/sign-up/register-share'], { queryParams: this._activatedRoute.snapshot.queryParams });
					break;

				default:
					// this.route.navigate(['/sign-up/register'], { queryParams: this._activatedRoute.snapshot.queryParams });
					break;
			}
		});
	}
}
