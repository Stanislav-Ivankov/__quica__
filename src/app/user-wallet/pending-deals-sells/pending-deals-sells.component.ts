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
	selector: 'quica-pending-deals-sells-table',
	templateUrl: './pending-deals-sells.component.html',
	styleUrls: ['./pending-deals-sells.component.scss']
})
export class PendingDealsSellsComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: IUserSavedListing[] = [
		{ comission: 12000, listingName: 'Hydrogen', price: 1.0079, status: 'H', timesShared: 12 },
		{ comission: 5000, listingName: 'Sun', price: 1.0079, status: 'H', timesShared: 12 },
		{ comission: 100000, listingName: 'REAH', price: 1.0079, status: 'H', timesShared: 12 }
	];

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	totalSelectedSum: number = 0;
	tableColumns: string[] = ["Select", 'Listing Name', "Price", "Comission", "Approved By Other Party ?", "Date", "Payment Due", "Cancel", "Approve"];

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

	ngOnInit() {
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
			this.getPendingDealsSells(this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: IUserSavedListing[]) => {
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

	private getPendingDealsSells(page: number, pageSize: number): Observable<IUserSavedListing[]> {
		return this._httpService.get<IUserSavedListing[]>(`https://jsonplaceholder.typicode.com/todos/1?q=repo:angular/components&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchPipeline() {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.paginator.page).pipe(
			startWith({}), 
			switchMap(() => {
				this.totalSelectedSum = 0;
				this.isLoading = true;
				return this.getPendingDealsSells(this.paginator.pageIndex, this.paginator.pageSize);
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
			this.totalSelectedSum += row.comission;
		} else {
			this.totalSelectedSum -= row.comission;
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
				this.totalSelectedSum += row.comission;
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

	public approveAndPayComission(row: IUserSavedListing) {
		console.log(row);
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public askForPaymentForSelected(): void {
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
