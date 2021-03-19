import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'quica-items-shared-waiting-approval-payment-table',
	templateUrl: './items-shared-waiting-approval-payment.component.html',
	styleUrls: ['./items-shared-waiting-approval-payment.component.scss']
})
export class ItemsSharedWaitingApprovalPaymentComponent implements OnInit, AfterViewInit, OnDestroy {

	ELEMENT_DATA: any[] = [
		{ comission: 1, listingName: 'Hydrogen', price: 1000, status: 'H', timesShared: 12 },
		{ comission: 2, listingName: 'JAVA', price: 1250, status: 'M', timesShared: 14 },
		{ comission: 5, listingName: 'ME', price: 3000, status: 'TRR', timesShared: 1234 },
	];

	isLoading = true;
	totalResults = 0;
	totalSelectedSum = 0;
	tableColumns: string[] = ['Select', 'Listing Name', 'How Many Between Me And The Buyer ?', 'Price', 'Comission', 'Date', 'Status'];

	readyToRefreshSubscription$: Subscription = new Subscription();
	requestPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient, private _sharedService: SharedService) { }

	ngOnInit() {
		this._matPaginatorService.itemsPerPageLabel = 'Items Per Page';
		this._matPaginatorService.firstPageLabel = 'First Page';
		this._matPaginatorService.previousPageLabel = 'Previous Page';
		this._matPaginatorService.nextPageLabel = 'Next Page';
		this._matPaginatorService.lastPageLabel = 'Last Page';
	}

	ngAfterViewInit() {
		this.requestPipeline();

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.getListings(this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: any[]) => {
				this.tableData = new MatTableDataSource<any>(data);
				this.selection = new SelectionModel<any>(true, []);
				this.totalSelectedSum = 0;
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy() {
		this.requestPipelineSubscription$.unsubscribe();
		this.readyToRefreshSubscription$.unsubscribe();
	}

	private getListings(page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://api.github.com/search/issues?q=repo:angular/components&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private requestPipeline() {
		this.requestPipelineSubscription$ = merge<EventEmitter<PageEvent>>(this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.totalSelectedSum = 0;
				this.isLoading = true;
				return this.getListings(this.paginator.pageIndex, this.paginator.pageSize);
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
			this.selection.clear();
			this.totalSelectedSum = 0;
		} else {
			this.totalSelectedSum  = 0;
			this.ELEMENT_DATA.forEach((row: any) => {
				this.selection.select(row);
				this.totalSelectedSum += row.price;
			});
		}
	}

	public askForPaymentForSelected(): void {
		if (0 === this.selection.selected.length) {
			this.totalSelectedSum = 0;
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
