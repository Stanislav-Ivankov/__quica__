import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
	selector: 'quica-share',
	templateUrl: './share.component.html',
	styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

	id: Params = {};
	queryParameters: Params = {};
	shareLink = '';

	constructor(
		private loginService: LoginService,
		private _activateRouteService: ActivatedRoute,
		private _httpClient: HttpClient,
		private _router: Router
	) { }

	ngOnInit() {
		this._activateRouteService.params.subscribe(id => this.id = id.id);
		this.queryParameters = this._activateRouteService.snapshot.queryParams;
		this.shareLink = `www.quica.io/listing-details/${ this.id }`;
		this.loginService.loggedStatus.emit(true);
	}

	public copy() {}

	goToSucessPage() {
		this._httpClient.post('https://jsonplaceholder.typicode.com/posts', {}).subscribe(
			() => this._router.navigate(['/success'], { queryParams: this.queryParameters }),
			() => {},
			() => {}
		);
	}
}
