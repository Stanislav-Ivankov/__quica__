import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
	selector: 'quica-edit-listing-modal',
	templateUrl: './edit-listing-modal.component.html',
	styleUrls: ['./edit-listing-modal.component.scss']
})
export class EditListingModalComponent implements OnInit {

	isLoading: boolean | null = null;
	editSubscription$: Subscription = new Subscription();

	constructor(
		private _httpService: HttpClient,
		public modalReference: MatDialogRef<EditListingModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {}

	public closeModal(): void {
		this.modalReference.close(this.data);
	}
}
