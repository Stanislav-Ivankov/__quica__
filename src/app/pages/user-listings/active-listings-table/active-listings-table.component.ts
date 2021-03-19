import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SharedService } from '../../../services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { EditListingModalComponent } from '../edit-listing-modal/edit-listing-modal.component';

@Component({
	selector: 'quica-active-listings-table',
	templateUrl: './active-listings-table.component.html',
	styleUrls: ['./active-listings-table.component.scss']
})
export class ActiveListingsTableComponent implements OnInit, AfterViewInit, OnDestroy {
	sampleData = [
		{ comission: 10, listingName: 'Stock', price: 100, status: 'S', timesShared: 12, action: 1 },
		{ comission: 22, listingName: 'Laptop', price: 400, status: 'L', timesShared: 134, action: 2 },
		{ comission: 35, listingName: 'House', price: 6500, status: 'H', timesShared: 12342, action: 1 }
	];

	isLoading = true;
	totalResults = 0;
	tableColumns: string[] = ['Select', 'Price', 'Comission', 'Times Shared', 'Action', 'Edit Listing', 'Remove All'];

	readyToRefreshSubscription$: Subscription = new Subscription();
	refreshPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(
		private _httpService: HttpClient,
		private _sharedService: SharedService,
		public modal: MatDialog,
		private _matPaginatorService: MatPaginatorIntl
	) { }

	ngOnInit() {
		this._matPaginatorService.itemsPerPageLabel = 'Items Per Page';
		this._matPaginatorService.firstPageLabel = 'First Page';
		this._matPaginatorService.previousPageLabel = 'Previous Page';
		this._matPaginatorService.nextPageLabel = 'Next Page';
		this._matPaginatorService.lastPageLabel = 'Last Page';
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.refreshPipeline();
	}

	ngOnDestroy() {
		this.refreshPipelineSubscription$.unsubscribe();
		this.readyToRefreshSubscription$.unsubscribe();
	}

	private getListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private refreshPipeline() {
		this.refreshPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
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
		return this.selection.selected.length === this.sampleData.length;
	}

	public masterToggle(): void {
		this.areAllRowsSelected() ? this.selection.clear() : this.sampleData.forEach((row: any) => this.selection.select(row));
	}

	public action(row: any): void {
		this.refreshPipelineSubscription$.unsubscribe();
		this.refreshPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public editListing(row: any): void {
		this.refreshPipelineSubscription$.unsubscribe();
		this.refreshPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public removeListing(row: any): void {
		this.refreshPipelineSubscription$.unsubscribe();
		this.refreshPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public removeSelectedListings(): void {
		if (0 === this.selection.selected.length) {
			return;
		}

		this.refreshPipelineSubscription$.unsubscribe();
		this.refreshPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}
}
