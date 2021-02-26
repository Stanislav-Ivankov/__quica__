import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'quica-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public isLogged: boolean = true;

	constructor() { }

	ngOnInit(): void { }
}
