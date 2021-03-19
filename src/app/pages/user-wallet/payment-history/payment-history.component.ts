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
	selector: 'quica-payment-history-table',
	templateUrl: './payment-history.component.html',
	styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: any[] = [
		{ comission: 1000, listingName: 'Hydrogen', price: 1.0079, status: 'H', timesShared: 12 },
		{ comission: 1123, listingName: 'Hydrogen', price: 1.0123, status: 'AS', timesShared: 44 },
		{ comission: 132321, listingName: 'Hydrogen', price: 2.312, status: 'GT', timesShared: 54 }
	];

	// Primitives
	isLoading = true;
	totalResults = 0;
	tableColumns: string[] = ['ID', 'Listing Name', 'Deal', 'Price', 'Comission', 'Date', 'Status'];

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

	ngOnInit() {
		this._matPaginatorService.firstPageLabel = 'First Page';
		this._matPaginatorService.previousPageLabel = 'Previous Page';
		this._matPaginatorService.nextPageLabel = 'Next Page';
		this._matPaginatorService.lastPageLabel = 'Last Page';
		this._matPaginatorService.itemsPerPageLabel = 'Items Per Page';
	}

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchSavedListings();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.getPaymentHistory(
				this.sort.active,
				this.sort.direction,
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

	private getPaymentHistory(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://jsonplaceholder.typicode.com/todos/1?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchSavedListings() {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.isLoading = true;
				return this.getPaymentHistory(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
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
