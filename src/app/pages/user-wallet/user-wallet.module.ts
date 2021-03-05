import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { WarrantiesComponent } from './warranties.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { WarrantyPrintComponent } from './warranty-print/warranty-print.component';

const routesArray: Routes = [
	{ path: '', component: WarrantiesComponent }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routesArray)
	],
	declarations: [
		AddEditComponent,
		WarrantyPrintComponent,
		WarrantiesComponent
	],
	exports: [
		WarrantiesComponent
	]
})

export class UserWalletModule {}