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

	sampleData = [
		{ productImage: "../../../../assets/Laptop.svg", listingName: "Microsoft surface 2 laptop", id: 458745, approvedByOtherParty: "no", price: 350000, comission: 3422, date: new Date(), paymentDue: "1 Day" },
		{ productImage: "../../../../assets/Console.svg", listingName: "Playstation 5", id: 458746, price: 159990, approvedByOtherParty: "yes", comission: 3422, date: new Date(), paymentDue: "2 Day" },
		{ productImage: "../../../../assets/Glasses.svg", listingName: "Ray-Ban", id: 458747, price: 32000, approvedByOtherParty: "no", comission: 3422, date: new Date(), paymentDue: "3 Day" }
	];

	isLoading = true;
	totalResults = 0;
	totalSelectedSum = 0;
	tableColumns: string[] = ['Select', 'Listing Name', 'Price', 'Comission', 'Approved By Other Party ?', 'Date', 'Payment Due', 'Cancel'];

	readyToRefreshSubscription$: Subscription = new Subscription();
	fetchPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

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
	}

	private getPendingDealsSells(page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>("https://jsonplaceholder.typicode.com/todos/1");
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
				this.totalSelectedSum += row.comission;
			});
		}
	}

	public cancel(row: any) {
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();
	}

	public approveAndPayComission(row: any) {
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();
	}

	public askForPaymentForSelected(): void {
		if (0 === this.selection.selected.length) {
			return;
		}

		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
		this.readyToRefreshSubscription$.unsubscribe();
	}
}
