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
	selector: 'quica-payment-history',
	templateUrl: './payment-history.component.html',
	styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: IUserSavedListing[] = [
		{ comission: 1, listingName: 'Hydrogen', price: 1.0079, status: 'H', timesShared: 12 }
	];

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	itemsWaitingToBeSharedColumns: string[] = ["ID", "Listing Name", "Deal", "Price", "Comission", "Date", "Status"];

	// Referentials
	fetchSoldListingsSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<IUserSavedListing> = new MatTableDataSource<IUserSavedListing>([]);
	selection: SelectionModel<IUserSavedListing> = new SelectionModel<IUserSavedListing>(true, []);

	// Decorators
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient, private _sharedService: SharedService) { }

	ngOnInit() {
		this._matPaginatorService.firstPageLabel = "First Page";
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.previousPageLabel = "Previous Page"
		this._matPaginatorService.lastPageLabel = "Last Page";
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
	}

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchSavedListings();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.getSavedListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: IUserSavedListing[]) => {
				this.tableData = new MatTableDataSource<IUserSavedListing>(data);
				this.selection = new SelectionModel<IUserSavedListing>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.fetchSoldListingsSubscription$.unsubscribe();
	}

	private getSavedListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://jsonplaceholder.typicode.com/todos/1?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchSavedListings() {
		this.fetchSoldListingsSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
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
