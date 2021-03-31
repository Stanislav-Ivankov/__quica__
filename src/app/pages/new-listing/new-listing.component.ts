import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { } from 'googlemaps';

@Component({
	selector: 'quica-new-listing',
	templateUrl: './new-listing.component.html',
	styleUrls: ['./new-listing.component.scss']
})
export class NewListingComponent implements OnInit, AfterViewInit {

	public newLisingForm: FormGroup = new FormGroup({
		category: new FormControl('laptops', Validators.required),
		listingName: new FormControl('MacBook Pro', Validators.required),
		condition: new FormControl('Brand New', Validators.required),
		description: new FormControl('Brand new laptops', Validators.required),
		price: new FormControl('20 000', Validators.required),
		comission: new FormControl('3000', Validators.required),
		shippingOptions: new FormControl('Delivery', Validators.required)
	});

	id = '';
	queryParameters: Params = {};
	defaultSelected = 'laptops';
	map!: google.maps.Map;

	@ViewChild('MAP')
	mapElement!: ElementRef;

	constructor(private _router: Router, private _httpClient: HttpClient, private _activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this._activatedRoute.params.subscribe(id => this.id = id.id);
		this.queryParameters = this._activatedRoute.snapshot.queryParams;
	}

	ngAfterViewInit() {
		const mapProperties = {
			center: new google.maps.LatLng(35.2271, -80.8431),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15
		};

		const marker = new google.maps.Marker({
			position: new google.maps.LatLng(35.2271, -80.8431)
		});

		this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
		marker.setMap(this.map);
	}

	uploadImages(event: Event): void {}
}
