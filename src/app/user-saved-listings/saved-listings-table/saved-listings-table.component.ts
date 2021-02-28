import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { IUserSavedListing } from "../../models/user-saved-listing";

@Component({
	selector: 'quica-saved-listings-table',
	templateUrl: './saved-listings-table.component.html',
	styleUrls: ['./saved-listings-table.component.scss']
})
export class SavedListingsTableComponent implements OnInit, AfterViewInit, OnDestroy {

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ["Select", 'Status', 'Price', 'Comission', 'Times Shared', "Remove All"];

	// Referentials
	fetchSavedListingsSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<IUserSavedListing> = new MatTableDataSource<IUserSavedListing>([]);
	selection: SelectionModel<IUserSavedListing> = new SelectionModel<IUserSavedListing>(true, []);

	// Decorators
	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient) { }

	ngOnInit(): void {
		this._matPaginatorService.firstPageLabel = "First Page";
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.previousPageLabel = "Previous Page"
		this._matPaginatorService.lastPageLabel = "Last Page";
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
	}

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchSavedListings();
	}

	ngOnDestroy(): void {
		this.fetchSavedListingsSubscription$.unsubscribe();
	}

	private getSavedListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchSavedListings() {
		this.fetchSavedListingsSubscription$ = merge(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}), 
			switchMap(() => {
				this.isLoading = true;
				return this.getSavedListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
			}),
			map((payload: IUserSavedListing[] | any) => {
				this.totalResults = payload.total_count;
				return payload.items;
			}),
			catchError(() => {
				this.isLoading = false;
				return EMPTY;
			})).subscribe((payload: IUserSavedListing[]) => {
				this.tableData =  new MatTableDataSource<IUserSavedListing>(payload);
				this.selection = new SelectionModel<IUserSavedListing>(true, []);
				this.isLoading = false;
			});
	}

	public areAllRowsSelected(): boolean {
		return this.selection.selected.length === this.tableData.data.length;
	}

	public masterToggle(): void {
		this.areAllRowsSelected() ? this.selection.clear() : this.tableData.data.forEach((row: IUserSavedListing) => this.selection.select(row));
	}

	public removeListing(): void {
		this.fetchSavedListingsSubscription$.unsubscribe();
		this.fetchSavedListings();
	}

	public removeSelectedListings(): void {
		this.fetchSavedListingsSubscription$.unsubscribe();
		this.fetchSavedListings();
	}
}
