import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'quica-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
	id: any = "";

	constructor(private _activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this._activatedRoute.params.subscribe(id => this.id = id.id);
	}
}
