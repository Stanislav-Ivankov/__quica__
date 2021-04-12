import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'quica-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	public title = '';
	public filters = [];

	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.title = data.title;
		this.filters = data.filters;
	}
	
	  onCancelClick(): void {
		this.dialogRef.close();
	  }

	  onApplyClick(): void {
		this.dialogRef.close();
	  }
}
