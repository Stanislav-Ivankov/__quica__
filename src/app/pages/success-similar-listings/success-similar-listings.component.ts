import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'quica-success-similar-listings',
	templateUrl: './success-similar-listings.component.html',
	styleUrls: ['./success-similar-listings.component.scss']
})
export class SuccessSimilarListingsComponent implements OnInit {

	successMessage = '';

	constructor(private _activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		const queryParameters = this._activatedRoute.snapshot.queryParams;

		if (queryParameters.Registration === 'Done' && queryParameters.Process === 'Buy') {
			this.successMessage = 'Your Registration Is Complete And You Bought The Product !';
		} else if (queryParameters.Registration === 'Done' && queryParameters.Process === 'Share') {
			this.successMessage = 'Your Registration Is Complete And You Shared The Product !';
		} else if (queryParameters.Process === 'Buy') {
			this.successMessage = 'You Bought The Product !';
		} else if (queryParameters.Process === 'Share') {
			this.successMessage = 'You Shared The Product !';
		}
	}
}
