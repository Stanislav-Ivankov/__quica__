import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SharedService } from "../../services/shared.service";

import { IUserSavedListing } from "../../models/user-saved-listing";

@Component({
	selector: 'quica-items-waiting-to-be-sold-table',
	templateUrl: './items-waiting-to-be-sold-table.component.html',
	styleUrls: ['./items-waiting-to-be-sold-table.component.scss']
})
export class ItemsWaitingToBeSoldTableComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: IUserSavedListing[] = [
		{ comission: 1, listingName: 'Hydrogen', price: 100, status: 'H', timesShared: 12 },
		{ comission: 1, listingName: 'Hydrogen', price: 150, status: 'L', timesShared: 1321 },
		{ comission: 1, listingName: 'Hydrogen', price: 1000, status: 'G', timesShared: 123 },
		{ comission: 1, listingName: 'Hydrogen', price: 1200, status: 'G', timesShared: 112312 }
	];

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ["ID", "Listing Name", "Price", "Possible Max Comission", "Date"];

	// Referentials
	fetchPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<IUserSavedListing> = new MatTableDataSource<IUserSavedListing>([]);
	selection: SelectionModel<IUserSavedListing> = new SelectionModel<IUserSavedListing>(true, []);

	// Decorators
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient, private _sharedService: SharedService) { }

	ngOnInit(): void {
		this._matPaginatorService.firstPageLabel = "First Page";
		this._matPaginatorService.previousPageLabel = "Previous Page"
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.lastPageLabel = "Last Page";
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
	}

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchPipeline();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;

			this.getItemsWaitingToBeSold(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: IUserSavedListing[]) => {
				this.tableData = new MatTableDataSource<IUserSavedListing>(data);
				this.selection = new SelectionModel<IUserSavedListing>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
	}

	private getItemsWaitingToBeSold(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchPipeline(): void {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.isLoading = true;
				return this.getItemsWaitingToBeSold(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
			}),
			map((payload: IUserSavedListing[] | any) => {
				this.totalResults = payload.total_count;
				return payload.items;
			}),
			catchError(() => {
				this.isLoading = true;
				return EMPTY;
			})
		).subscribe((payload: IUserSavedListing[]) => {
			this.tableData = new MatTableDataSource<IUserSavedListing>(payload);
			this.selection = new SelectionModel<IUserSavedListing>(true, []);
			this.isLoading = false;
		});
	}
}
