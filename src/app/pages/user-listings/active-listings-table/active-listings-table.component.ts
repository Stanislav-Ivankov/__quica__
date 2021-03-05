import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SharedService } from "../../services/shared.service";

@Component({
	selector: 'quica-active-listings-table',
	templateUrl: './active-listings-table.component.html',
	styleUrls: ['./active-listings-table.component.scss']
})
export class ActiveListingsTableComponent implements OnInit, AfterViewInit, OnDestroy {
	ELEMENT_DATA = [
		{ comission: 1, listingName: 'Hydrogen', price: 100, status: 'H', timesShared: 12 },
		{ comission: 2, listingName: 'Helium', price: 400, status: 'He', timesShared: 134 },
		{ comission: 3, listingName: 'Lithium', price: 6500, status: 'Li', timesShared: 12342 }
	];

	// Primitives
	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ["Select", 'Price', 'Comission', 'Times Shared', "Action", "Edit Listing", "Remove All"];

	// Referentials
	readyToRefreshSubscription$: Subscription = new Subscription();
	requestPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	// Decorators
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient, private _sharedService: SharedService) { }

	ngOnInit() {
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
		this._matPaginatorService.firstPageLabel = "First Page";
		this._matPaginatorService.previousPageLabel = "Previous Page"
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.lastPageLabel = "Last Page";
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.requestPipeline();
	}

	ngOnDestroy() {
		this.requestPipelineSubscription$.unsubscribe();
		this.readyToRefreshSubscription$.unsubscribe();
	}

	private getListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private requestPipeline() {
		this.requestPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}), 
			switchMap(() => {
				this.isLoading = true;
				return this.getListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
			}),
			map((payload: any) => {			  
				this.totalResults = payload.total_count;
				return payload.items;
			}),
			catchError(() => {
				this.isLoading = true;
				return EMPTY;
			})
		).subscribe((payload: any[]) => {
			this.tableData = new MatTableDataSource<any>(payload);
			this.selection = new SelectionModel<any>(true, []);
			this.isLoading = false;

			this._sharedService.readyToRefresh.emit(true);
		});
	}

	public areAllRowsSelected(): boolean {
		return this.selection.selected.length === this.ELEMENT_DATA.length;
	}

	public masterToggle(): void {
		this.areAllRowsSelected() ? this.selection.clear() : this.ELEMENT_DATA.forEach((row: any) => this.selection.select(row));
	}

	public action(row: any): void {
		this.requestPipelineSubscription$.unsubscribe();
		this.requestPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public editListing(row: any): void {
		this.requestPipelineSubscription$.unsubscribe();
		this.requestPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public removeListing(row: any): void {
		this.requestPipelineSubscription$.unsubscribe();
		this.requestPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public removeSelectedListings(): void {
		if (0 === this.selection.selected.length) {
			return;
		}

		this.requestPipelineSubscription$.unsubscribe();
		this.requestPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}
}
