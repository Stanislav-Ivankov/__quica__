import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'quica-company-details',
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

	public companyDetails = {
		email: "info@quica.io",
		address: "Some Address, NY, 12345",
		taxNumber: 1234567890,
		companyRegistryNumber: 1234567890,
		additionalInformation: [
			"Information.......\
				Information.......\
				Information.......",
			"More Information.......\
				More Information.......\
				More Information.......\
				More Information.......",
			"Additional Information.......\
				Additional Information.......\
				Additional Information.......\
				Additional Information.......\
				Additional Information......."
		]
	};

	constructor() { }

	ngOnInit() { }
}
