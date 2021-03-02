import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { IUserSavedListing } from "../../models/user-saved-listing";
import { SharedService } from '../../services/shared.service';

@Component({
	selector: 'quica-pending-deals-buys-table',
	templateUrl: './pending-deals-buys.component.html',
	styleUrls: ['./pending-deals-buys.component.scss']
})
export class PendingDealsBuysComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: IUserSavedListing[] = [
		{ comission: 1, listingName: 'Hydrogen', price: 10000, status: 'H', timesShared: 12 },
		{ comission: 1, listingName: 'Hydrogen', price: 120000, status: 'H', timesShared: 13 },
		{ comission: 1, listingName: 'Hydrogen', price: 1500, status: 'H', timesShared: 14 },
		{ comission: 1, listingName: 'Hydrogen', price: 12000, status: 'H', timesShared: 15 },
	];

	// Primitives
	isLoading: boolean = true;
	totalSelectedSum: number = 0;
	totalResults: number = 0;
	tableColumns: string[] = ["Select", 'Listing Name', "Price", "Approved By Other Part ?", "Date", "Cancel", "Approve"];

	// Referentials
	readyToRefreshSubscription$: Subscription = new Subscription();
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
		this.fetchPipeline();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.totalSelectedSum = 0;
			this.getPendingDealsBuys(this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: IUserSavedListing[]) => {
				this.tableData = new MatTableDataSource<IUserSavedListing>(data);
				this.selection = new SelectionModel<IUserSavedListing>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
		this.readyToRefreshSubscription$.unsubscribe();
	}

	private getPendingDealsBuys(page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://jsonplaceholder.typicode.com/todos/1?q=repo:angular/components&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchPipeline(): void {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.paginator.page).pipe(
			startWith({}), 
			switchMap(() => {
				this.totalSelectedSum = 0;
				this.isLoading = true;
				return this.getPendingDealsBuys(this.paginator.pageIndex, this.paginator.pageSize);
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

	public getSelectedRow(row: IUserSavedListing) {
		if (!this.selection.isSelected(row)) {
			this.totalSelectedSum += row.price;
		} else {
			this.totalSelectedSum -= row.price;
		}
	}

	public areAllRowsSelected(): boolean {
		return this.selection.selected.length === this.ELEMENT_DATA.length;
	}

	public masterToggle(): void {
		if (this.areAllRowsSelected()) {
			this.selection.clear()
			this.totalSelectedSum = 0;
		} else {
			this.totalSelectedSum  = 0;
			this.ELEMENT_DATA.forEach((row: IUserSavedListing) => {
				this.selection.select(row);
				this.totalSelectedSum += row.price;
			});
		}
	}

	public cancel(row: IUserSavedListing) {
		console.log(row);
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public approve(row: IUserSavedListing) {
		console.log(row);
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public payForSelected(): void {
		if (0 === this.selection.selected.length) {
			return;
		}

		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}
}
