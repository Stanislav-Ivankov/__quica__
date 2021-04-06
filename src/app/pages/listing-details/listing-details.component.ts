import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
	selector: 'quica-listing-details',
	templateUrl: './listing-details.component.html',
	styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit, AfterViewInit {

	id = '';
	queryParameters: Params = {};
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
}
