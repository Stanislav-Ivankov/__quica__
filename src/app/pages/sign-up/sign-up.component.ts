import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VerifyNumberModalComponent } from './verify-number-modal/verify-number-modal.component';

@Component({
	selector: 'quica-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	public queryParameters: Params = {};

	public phoneNumberForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g)]))
	});

	constructor(private _activatedRouteService: ActivatedRoute, public modal: MatDialog, private _routerService: Router) { }

	ngOnInit() {
		this.queryParameters = this._activatedRouteService.snapshot.queryParams;
	}

	public openModal(): void {
		const modalReference: MatDialogRef<VerifyNumberModalComponent> = this.modal.open(VerifyNumberModalComponent, {
			width: '375px',
			data: { ...this.phoneNumberForm.value }
		});

		modalReference.afterClosed().subscribe(() => {
			switch (this.queryParameters.Process) {
				case 'Buy':
					this._routerService.navigate(['/sign-up/register-buy'],
						{ state: { phoneNumber: this.phoneNumberForm.value.phoneNumber },
							queryParams: this._activatedRouteService.snapshot.queryParams });
					break;

				case 'Share':
					this._routerService.navigate(['/sign-up/register-share'],
						{ state: { phoneNumber: this.phoneNumberForm.value.phoneNumber },
							queryParams: this._activatedRouteService.snapshot.queryParams });
					break;

				default:
					this._routerService.navigate(['/sign-up/register'],
						{ state: { phoneNumber: this.phoneNumberForm.value.phoneNumber },
							queryParams: this._activatedRouteService.snapshot.queryParams });
					break;
			}
		});
	}
}
