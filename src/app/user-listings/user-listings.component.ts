import { Component, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'quica-user-listings',
	templateUrl: './user-listings.component.html',
	styleUrls: ['./user-listings.component.scss']
})
export class UserListingsComponent implements OnInit {
	ELEMENT_DATA: any[] = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
	];

	selection = new SelectionModel<any>(true, []);
	dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

	activeListingsColumns: string[] = ["select", "Price", "Comission", "Times Shared", "Actions", "Edit", "Delete All"];
	soldListingsColumns: string[] = ["selectSold", "position", "name", "weight", "symbol"];
	data: any;

	constructor() { }

	ngOnInit(): void {
		this.data = Object.assign(this.ELEMENT_DATA);
	}

	areAllRowsSelected() {
		return this.selection.selected.length === this.dataSource.data.length;
	}

	masterToggle() {
		this.areAllRowsSelected() ?
		this.selection.clear() :
		this.dataSource.data.forEach(row => this.selection.select(row));
	}

	actionListingHandler(row: Element) {
		console.log(row);
	}

	editListingHandler(row: Element) {
		console.log(row);
	}

	deleteListingHandler(row: Element) {
		console.log(row);
	}

	removeSelectedRows() {
		this.selection.selected.forEach(item => {
			let index: number = this.data.findIndex((d: any) => d === item);
			this.data.splice(index,1);
			this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
		});

		this.data = Object.assign(this.ELEMENT_DATA);
		this.selection = new SelectionModel<Element>(true, []);
	}
}
