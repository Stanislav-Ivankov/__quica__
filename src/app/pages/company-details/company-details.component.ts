import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'quica-company-details',
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

	public companyDetails = {
		contacts: 'info@quica.io',
		headquarters: 'János Pál Pápa Tér 7, H-1081 Budapest',
		taxNumber: '000000-0-00',
		registrationNumber: '000000-0-00',
		importantCompanyInformation: ['000000-0-00', '000000-0-00', '000000-0-00']
	};

	constructor() { }

	ngOnInit() { }
}
