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

	queryParameters: Params = {};

	phoneNumberForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)]))
	});

	constructor(private _activatedRouteService: ActivatedRoute, private _routeService: Router, public modal: MatDialog) { }

	ngOnInit() {
		this.queryParameters = this._activatedRouteService.snapshot.queryParams;
	}

	openModal() {
		const modalReference = this.modal.open(VerifyNumberModalComponent, { width: "375px", data: { phoneNumber: this.phoneNumberForm.value.phoneNumber } });

		modalReference.afterClosed().subscribe(() => {
			switch (this.queryParameters.Process) {
				case "Buy":
					this._routeService.navigate(['/sign-up/register-buy'],
						{ state: { "phoneNumber": this.phoneNumberForm.value.phoneNumber },
							queryParams: this._activatedRouteService.snapshot.queryParams });
					break;

				case "Share":
					this._routeService.navigate(['/sign-up/register-share'],
						{ state: { "phoneNumber": this.phoneNumberForm.value.phoneNumber },
							queryParams: this._activatedRouteService.snapshot.queryParams });
					break;

				default:
					this._routeService.navigate(['/sign-up/register'],
						{ state: { "phoneNumber": this.phoneNumberForm.value.phoneNumber },
							queryParams: this._activatedRouteService.snapshot.queryParams });
					break;
			}
		});
	}
}
