import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VerifyNumberModalComponent } from "./verify-number-modal/verify-number-modal.component";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'quica-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
	verifyPhoneNumberForm: FormGroup = new FormGroup({
		phoneNumber: new FormControl(null, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g))
	});

	query: any

	constructor(public dialog: MatDialog, private _activatedRoute: ActivatedRoute, private route: Router) { }

	ngOnInit() {
		this.query = this._activatedRoute.snapshot.queryParams;
	}

	open() {
		const ref = this.dialog.open(VerifyNumberModalComponent, { width: "375px", data: { phoneNumber: this.verifyPhoneNumberForm.value } });
		ref.afterClosed().subscribe(() => {
			switch (this.query.Process) {
				case "Buy":
					this.route.navigate(['/sign-up/register-buy'], { queryParams: this._activatedRoute.snapshot.queryParams });
					break;
				case "Share":
					this.route.navigate(['/sign-up/register-share'], { queryParams: this._activatedRoute.snapshot.queryParams });
					break;
				default:
					this.route.navigate(['/sign-up/register-normal'], { queryParams: this._activatedRoute.snapshot.queryParams });
					break;
			}
		});
	}
}
