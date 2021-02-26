import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { IUserSavedListing } from "../../models/user-saved-listing";

@Component({
	selector: 'quica-sold-listings-table',
	templateUrl: './sold-listings-table.component.html',
	styleUrls: ['./sold-listings-table.component.scss']
})
export class SoldListingsTableComponent implements AfterViewInit {

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ["Select", 'Status', 'Price', 'Comission', 'Times Shared', "Remove All"];

	// Referentials
	fetchPipeline: Subscription = new Subscription();
	tableData: MatTableDataSource<IUserSavedListing> = new MatTableDataSource<IUserSavedListing>([]);
	selection: SelectionModel<IUserSavedListing> = new SelectionModel<IUserSavedListing>(true, []);

	// Decorators
	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	activeListingsColumns: string[] = ["Listing Name", "Price", "Comission", "Times Shared", "Use Template"];

	constructor(private _httpService: HttpClient) { }

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchSavedListings();
	}

	private getSavedListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchSavedListings() {
		this.fetchPipeline = merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({ }), 
				switchMap(() => {
					this.isLoading = true;
					return this.getSavedListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
				}),
				map((data: IUserSavedListing[] | any) => {			  
					this.isLoading = false;
					this.totalResults = data.total_count;
					return data.items;
				}),
				catchError(() => {
					this.isLoading = false;
					return EMPTY;
				})
			)
			.subscribe((data: IUserSavedListing[]) => {
				this.tableData = new MatTableDataSource<IUserSavedListing>(data);
			});

		this.selection = new SelectionModel<IUserSavedListing>(true, []);
	}

	useTemplate(row: IUserSavedListing) {
		console.log(row);
	}
}
