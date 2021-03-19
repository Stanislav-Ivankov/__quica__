import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SharedService } from '../../../services/shared.service';

@Component({
	selector: 'quica-pending-deals-sells-table',
	templateUrl: './pending-deals-sells.component.html',
	styleUrls: ['./pending-deals-sells.component.scss']
})
export class PendingDealsSellsComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: any[] = [
		{ comission: 12000, listingName: 'Hydrogen', price: 1.0079, status: 'H', timesShared: 12 },
		{ comission: 5000, listingName: 'Sun', price: 1.0079, status: 'H', timesShared: 12 },
		{ comission: 100000, listingName: 'REAH', price: 1.0079, status: 'H', timesShared: 12 }
	];

	// Primitives
	isLoading = true;
	totalResults = 0;
	totalSelectedSum = 0;
	tableColumns: string[] = ['Select', 'Listing Name', 'Price', 'Comission', 'Approved By Other Party ?', 'Date', 'Payment Due', 'Cancel', 'Approve'];

	// Referentials
	readyToRefreshSubscription$: Subscription = new Subscription();
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
		this.fetchPipeline();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.totalSelectedSum = 0;
			this.getPendingDealsSells(this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: any[]) => {
				this.tableData = new MatTableDataSource<any>(data);
				this.selection = new SelectionModel<any>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
		this.readyToRefreshSubscription$.unsubscribe();
	}

	private getPendingDealsSells(page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://jsonplaceholder.typicode.com/todos/1?q=repo:angular/components&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private fetchPipeline() {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.totalSelectedSum = 0;
				this.isLoading = true;
				return this.getPendingDealsSells(this.paginator.pageIndex, this.paginator.pageSize);
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

			this._sharedService.readyToRefresh.emit(true);
		});
	}

	public getSelectedRow(row: any) {
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
			this.selection.clear();
			this.totalSelectedSum = 0;
		} else {
			this.totalSelectedSum  = 0;
			this.ELEMENT_DATA.forEach((row: any) => {
				this.selection.select(row);
				this.totalSelectedSum += row.comission;
			});
		}
	}

	public cancel(row: any) {
		console.log(row);
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();

		this.readyToRefreshSubscription$ = this._sharedService.readyToRefresh.subscribe(() => {
			this._sharedService.refreshNotification.next();
			this.readyToRefreshSubscription$.unsubscribe();
		});
	}

	public approveAndPayComission(row: any) {
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
