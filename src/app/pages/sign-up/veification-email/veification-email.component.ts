import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'quica-veification-email',
	templateUrl: './veification-email.component.html',
	styleUrls: ['./veification-email.component.scss']
})
export class VeificationEmailComponent implements OnInit {

	isLoading = false;
	queryParameters: Params = {};

	constructor(
		private _httpService: HttpClient,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _snackbar: MatSnackBar
	) { }

	ngOnInit() {
		this.queryParameters = this._activatedRoute.snapshot.queryParams;
	}

	public resendEmail(): void {
		let link = '';

		if (this.queryParameters.Process === 'Buy') {
			link = `localhost:4200/checkout/${ this.queryParameters.id }?Process=${ this.queryParameters.Process }&Registration=${ this.queryParameters.Registration }`;
		} else if (this.queryParameters.Process === 'Share') {
			link = `localhost:4200/share/${ this.queryParameters.id }?Process=${ this.queryParameters.Process }&Registration=${ this.queryParameters.Registration }`;
		}

		this._httpService.post('https://jsonplaceholder.typicode.com/posts', {}).subscribe(
			() => console.log(link),
			() => console.log(link),
			() => {},
		);

		this._snackbar.open('Email Sent', 'DISMISS', { duration: 5000, panelClass: 'Success' });
	}

	public imitiateClick(): void {
		if (this.queryParameters.Process === 'Buy') {
			this._router.navigate(['/checkout', this.queryParameters.id], {
				queryParams: { Process: this.queryParameters.Process, Registration: this.queryParameters.Registration }
			});
		} else if (this.queryParameters.Process === 'Share') {
			this._router.navigate(['/share', this.queryParameters.id], {
				queryParams: { Process: this.queryParameters.Process, Registration: this.queryParameters.Registration }
			});
		} else {
			this._router.navigate(['/', this.queryParameters.id], {
				queryParams: { Process: this.queryParameters.Process, Registration: this.queryParameters.Registration }
			});
		}
	}

	public goToLogin(): void {
		this._router.navigate(['/']);
	}
}
