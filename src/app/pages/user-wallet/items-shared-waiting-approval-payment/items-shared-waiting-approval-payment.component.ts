import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ItemsISharedWaitingForApprovalAndPayment } from '../../../helpers/enums';

@Component({
	selector: 'quica-items-shared-waiting-approval-payment-table',
	templateUrl: './items-shared-waiting-approval-payment.component.html',
	styleUrls: ['./items-shared-waiting-approval-payment.component.scss']
})
export class ItemsSharedWaitingApprovalPaymentComponent implements OnInit, AfterViewInit, OnDestroy {

	public sampleData = [
		{
			productImage: '../../../../assets/Laptop.svg',
			listingName: 'Lenovo',
			id: 458745,
			howManyBetweenMeAndBuyer: 2,
			price: 3500,
			comission: 1234,
			date: new Date(),
			deal: 'Sold',
			flag: 2,
			status: 'Waiting For Payment'
		},
		{
			productImage: '../../../../assets/Console.svg',
			listingName: 'Playstation 5',
			id: 458746,
			howManyBetweenMeAndBuyer: 5,
			price: 1599,
			comission: 1234,
			date: new Date(),
			deal: 'Bought',
			flag: 1,
			status: 'Can Be Credited'
		},
		{
			productImage: '../../../../assets/Glasses.svg',
			listingName: 'Ray-Ban',
			id: 458747,
			howManyBetweenMeAndBuyer: 1,
			price: 3200,
			comission: 1234,
			date: new Date(),
			deal: 'Shared',
			flag: 1,
			status: 'Can Be Credited'
		}
	];

	isLoading = true;
	totalResults = 0;
	totalSelectedSum = 0;
	tableColumns: string[] = ['Select', 'Listing Name', 'How Many Between Me And The Buyer ?', 'Price', 'Comission', 'Date', 'Status'];

	ItemsISharedWaitingForApprovalAndPayment: typeof ItemsISharedWaitingForApprovalAndPayment = ItemsISharedWaitingForApprovalAndPayment;

	readyToRefreshSubscription$: Subscription = new Subscription();
	requestPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient) { }

	ngOnInit() {
		this._matPaginatorService.itemsPerPageLabel = 'Items Per Page';
		this._matPaginatorService.firstPageLabel = 'First Page';
		this._matPaginatorService.previousPageLabel = 'Previous Page';
		this._matPaginatorService.nextPageLabel = 'Next Page';
		this._matPaginatorService.lastPageLabel = 'Last Page';
	}

	ngAfterViewInit() {
		this.requestPipeline();
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
		return this.selection.selected.length === this.sampleData.length;
	}

	public masterToggle(): void {
		if (this.areAllRowsSelected()) {
			this.selection.clear();
			this.totalSelectedSum = 0;
		} else {
			this.totalSelectedSum  = 0;
			this.sampleData.forEach((row: any) => {
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
	}
}
