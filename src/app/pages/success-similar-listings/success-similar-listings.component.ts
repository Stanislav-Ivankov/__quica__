import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
	selector: 'quica-success-similar-listings',
	templateUrl: './success-similar-listings.component.html',
	styleUrls: ['./success-similar-listings.component.scss']
})
export class SuccessSimilarListingsComponent implements OnInit {

	successMessage = '';
	queryParameters: Params = {};
	listingData: any = [
		{
			id: 1,
			price: 650000,
			comission: 100000,
			imageURL: '../../../assets/Cottage.png',
			title: 'Forest Cottage'
		},
		{
			id: 2,
			price: 300000,
			comission: 20000,
			imageURL: '../../../assets/Golf GTI.png',
			title: 'Volkswagen Gold GTI'
		},
		{
			id: 3,
			price: 50000,
			comission: 25000,
			imageURL: '../../../assets/Fossil.png',
			title: 'Watch Fossil'
		},
		{
			id: 4,
			price: 50000,
			comission: 2500,
			imageURL: '../../../assets/Guitar.png',
			title: 'Guitar'
		},
		{
			id: 5,
			price: 3200,
			comission: 250,
			imageURL: '../../../assets/Chairs.png',
			title: 'Wooden Chairs'
		}
	];

	constructor(private loginService: LoginService, private _activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.queryParameters = this._activatedRoute.snapshot.queryParams;
		this.loginService.loggedStatus.emit(true);

		if (this.queryParameters.Registration === 'Done' && this.queryParameters.Process === 'Buy') {
			this.successMessage = 'Your Registration Is Complete And You Bought The Product !';
		} else if (this.queryParameters.Registration === 'Done' && this.queryParameters.Process === 'Sell') {
			this.successMessage = 'Your Registration Is Complete And Your Listing Is LIVE !';
		} else if (this.queryParameters.Registration === 'Done' && this.queryParameters.Process === 'Share') {
			this.successMessage = 'Your Registration Is Complete And You Shared The Product !';
		} else if (this.queryParameters.Process === 'Buy') {
			this.successMessage = 'You Bought The Product !';
		} else if (this.queryParameters.Process === 'Sell') {
			this.successMessage = 'Your Listing Is LIVE !';
		} else if (this.queryParameters.Process === 'Share') {
			this.successMessage = 'You Shared The Product !';
		}
	}
}
