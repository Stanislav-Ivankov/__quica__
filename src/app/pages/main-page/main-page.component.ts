import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
	selector: 'quica-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

	listingData: any = [
		{
			id: 1,
			price: 650000,
			comission: 100000,
			imageURL: '../../../assets/Cottage.png',
			title: 'Forest Cottage'
		},
		{
			id: 2,
			price: 300000,
			comission: 20000,
			imageURL: '../../../assets/Golf GTI.png',
			title: 'Volkswagen Gold GTI'
		},
		{
			id: 3,
			price: 50000,
			comission: 25000,
			imageURL: '../../../assets/Fossil.png',
			title: 'Watch Fossil'
		},
		{
			id: 4,
			price: 50000,
			comission: 2500,
			imageURL: '../../../assets/Guitar.png',
			title: 'Guitar'
		},
		{
			id: 5,
			price: 3200,
			comission: 250,
			imageURL: '../../../assets/Chairs.png',
			title: 'Wooden Chairs'
		},
		{
			id: 6,
			price: 300000,
			comission: 20000,
			imageURL: '../../../assets/Golf GTI.png',
			title: 'Volkswagen Gold GTI'
		},
		{
			id: 7,
			price: 50000,
			comission: 25000,
			imageURL: '../../../assets/Fossil.png',
			title: 'Watch Fossil'
		},
		{
			id: 8,
			price: 50000,
			comission: 2500,
			imageURL: '../../../assets/Guitar.png',
			title: 'Guitar'
		},
		{
			id: 9,
			price: 3200,
			comission: 250,
			imageURL: '../../../assets/Chairs.png',
			title: 'Wooden Chairs'
		},
		{
			id: 10,
			price: 3200,
			comission: 250,
			imageURL: '../../../assets/Cottage.png',
			title: 'Forest Cottage'
		},
		{
			id: 11,
			price: 3200,
			comission: 250,
			imageURL: '../../../assets/Guitar.png',
			title: 'Guitar'
		},
		{
			id: 12,
			price: 3200,
			comission: 250,
			imageURL: '../../../assets/Golf GTI.png',
			title: 'Volkswagen Gold GTI'
		}
	];

	constructor(public dialog: MatDialog) { }

	ngOnInit() {}

	showFilterDialog() {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '500px',
			data: {
				title: 'Filters',
				filters: [
					{
						title: 'Price',
						type: 'range',
						min: '25 000 Ft',
						max: '10mrd Ft'
					},
					{
						title: 'Percent',
						type: 'range',
						min: '25 000 Ft',
						max: '10mrd Ft'
					},
					{
						title: 'Price',
						type: 'range',
						min: '25 000 Ft',
						max: '10mrd Ft'
					}
				]
			}
		  });
	  
		  dialogRef.afterClosed().subscribe(result => {
			console.log('Result of filtering is: ', result);
		  });
	}
}
