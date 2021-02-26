import { Component, OnInit } from '@angular/core';

import { ICompanyDetails } from "../models/company-details";

@Component({
	selector: 'quica-company-details',
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
	public companyDetails: ICompanyDetails = {
		email: "info@quica.io",
		address: "Some Address, NY, 12345",
		taxNumber: 1234567890,
		companyRegistryNumber: 1234567890,
		otherLegalInformation: [
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

	ngOnInit(): void { }
}
