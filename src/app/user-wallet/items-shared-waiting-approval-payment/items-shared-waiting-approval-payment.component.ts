import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { IUserSavedListing } from "../../models/user-saved-listing";
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'quica-items-shared-waiting-approval-payment',
	templateUrl: './items-shared-waiting-approval-payment.component.html',
	styleUrls: ['./items-shared-waiting-approval-payment.component.scss']
})
export class ItemsSharedWaitingApprovalPaymentComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: IUserSavedListing[] = [
		{ comission: 1, listingName: 'Hydrogen', price: 1.0079, status: 'H', timesShared: 12 }
	];

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ["Select", 'Listing Name', 'How Many Between Me And The Buyer ?', "Price", "Comission", "Date", "Status", "test"];

	// Referentials
	readyToRefreshSubscription$: Subscription = new Subscription();
	fetchItemsSharedWaitingApprovalPaymentSubscription$: Subscription = new Subscription();
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
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.previousPageLabel = "Previous Page"
		this._matPaginatorService.lastPageLabel = "Last Page";
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
	}

	ngAfterViewInit(): void {
		this.fetchActiveListings();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.getSavedListings(this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: IUserSavedListing[]) => {
				this.tableData = new MatTableDataSource<IUserSavedListing>(data);
				this.selection = new SelectionModel<IUserSavedListing>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.fetchItemsSharedWaitingApprovalPaymentSubscription$.unsubscribe();
	}

	private getSavedListings(page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://api.github.com/search/issues?q=repo:angular/components&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchActiveListings() {
		this.fetchItemsSharedWaitingApprovalPaymentSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.paginator.page).pipe(
			startWith({}), 
			switchMap(() => {
				this.isLoading = true;
				return this.getSavedListings(this.paginator.pageIndex, this.paginator.pageSize);
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

			this._sharedService.readyToRefresh.emit(true);
		});
	}

	public areAllRowsSelected(): boolean {
		return this.selection.selected.length === this.ELEMENT_DATA.length;
	}

	public masterToggle(): void {
		this.areAllRowsSelected() ? this.selection.clear() : this.ELEMENT_DATA.forEach((row: IUserSavedListing) => this.selection.select(row));
	}

	public removeSelectedListings(): void {		
		if (0 === this.selection.selected.length) {
			return;
		}

		this.fetchItemsSharedWaitingApprovalPaymentSubscription$.unsubscribe();
		this.fetchActiveListings();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}
}
