import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'quica-edit-listing-modal',
	templateUrl: './edit-listing-modal.component.html',
	styleUrls: ['./edit-listing-modal.component.scss']
})
export class EditListingModalComponent implements OnInit {

	public listingDetails = {
		productImage: null,
		price: null,
		comission: null
	};

	public productPicture: string | ArrayBuffer | null = null;

	private fileReader = new FileReader();
	private formData = new FormData();

	constructor(public modalReference: MatDialogRef<EditListingModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		this.listingDetails = { ...this.data };
		this.productPicture = this.data.productImage;
	}

	public closeModal(): void {
		this.modalReference.close(this.data);
	}

	public uploadProductPicture(event: Event): void {
		const inputElement = event.target as HTMLInputElement;

		if (!inputElement.files || !inputElement.files[0]) {
			return;
		}

		const fileReader = new FileReader();

		this.formData.append('productImage', inputElement.files[0], inputElement.files[0].name);
		fileReader.readAsDataURL(inputElement.files[0]);

		fileReader.onload = () => {
			this.productPicture = fileReader.result;
		};
	}

	public removeProductPicture(event: Event): void {
		this.productPicture = null;
		this.formData.delete('productImage');
	}

	public saveChanges(): void {
		this.modalReference.close(this.data);
	}
}
