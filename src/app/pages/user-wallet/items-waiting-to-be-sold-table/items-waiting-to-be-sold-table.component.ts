import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SharedService } from '../../../services/shared.service';

@Component({
	selector: 'quica-items-waiting-to-be-sold-table',
	templateUrl: './items-waiting-to-be-sold-table.component.html',
	styleUrls: ['./items-waiting-to-be-sold-table.component.scss']
})
export class ItemsWaitingToBeSoldTableComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: any[] = [
		{ comission: 1, listingName: 'Hydrogen', price: 100, status: 'H', timesShared: 12 },
		{ comission: 1, listingName: 'Hydrogen', price: 150, status: 'L', timesShared: 1321 },
		{ comission: 1, listingName: 'Hydrogen', price: 1000, status: 'G', timesShared: 123 },
		{ comission: 1, listingName: 'Hydrogen', price: 1200, status: 'G', timesShared: 112312 }
	];

	// Primitives
	isLoading = true;
	totalResults = 0;
	tableColumns: string[] = ['ID', 'Listing Name', 'Price', 'Possible Max Comission', 'Date'];

	// Referentials
	fetchPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	// Decorators
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient, private _sharedService: SharedService) { }

	ngOnInit(): void {
		this._matPaginatorService.firstPageLabel = 'First Page';
		this._matPaginatorService.previousPageLabel = 'Previous Page';
		this._matPaginatorService.nextPageLabel = 'Next Page';
		this._matPaginatorService.lastPageLabel = 'Last Page';
		this._matPaginatorService.itemsPerPageLabel = 'Items Per Page';
	}

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchPipeline();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;

			this.getItemsWaitingToBeSold(
				this.sort.active, this.sort.direction,
				this.paginator.pageIndex,
				this.paginator.pageSize
			).subscribe((data: any[]) => {
				this.tableData = new MatTableDataSource<any>(data);
				this.selection = new SelectionModel<any>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
	}

	private getItemsWaitingToBeSold(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchPipeline(): void {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.isLoading = true;
				return this.getItemsWaitingToBeSold(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
			}),
			map((payload: any[] | any) => {
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
		});
	}
}
