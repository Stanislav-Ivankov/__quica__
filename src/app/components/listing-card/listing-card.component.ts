import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'quica-listing-card',
	templateUrl: './listing-card.component.html',
	styleUrls: ['./listing-card.component.scss']
})
export class ListingCardComponent implements OnInit {

	constructor() { }

	@Input()
	listingData: any;

	ngOnInit() {}
}
