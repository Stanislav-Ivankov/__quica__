import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
	selector: 'quica-pending-deals-buys-table',
	templateUrl: './pending-deals-buys.component.html',
	styleUrls: ['./pending-deals-buys.component.scss']
})
export class PendingDealsBuysComponent implements OnInit, AfterViewInit, OnDestroy {

	public sampleData = [
		{
			productImage: '../../../../assets/Laptop.svg',
			listingName: 'Microsoft surface 2 laptop',
			id: 458745,
			approvedByOtherParty: 'no',
			price: 350000,
			date: new Date(),
			deal: 'Sold',
			status: 'Sold'
		},
		{
			productImage: '../../../../assets/Console.svg',
			listingName: 'Playstation 5',
			id: 458746,
			price: 159990,
			approvedByOtherParty: 'yes',
			date: new Date(),
			deal: 'Bought',
			status: 'Selling'
		},
		{
			productImage: '../../../../assets/Glasses.svg',
			listingName: 'Ray-Ban',
			id: 458747,
			price: 32000,
			approvedByOtherParty: 'no',
			date: new Date(),
			deal: 'Shared',
			status: 'Awaiting Comission'
		}
	];

	// Primitives
	isLoading = true;
	totalSelectedSum = 0;
	totalResults = 0;
	tableColumns: string[] = ['Select', 'Listing Name', 'Price', 'Approved By Other Part ?', 'Date', 'Cancel', 'Approve'];

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

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient) { }

	ngOnInit(): void {
		this._matPaginatorService.firstPageLabel = 'First Page';
		this._matPaginatorService.previousPageLabel = 'Previous Page';
		this._matPaginatorService.nextPageLabel = 'Next Page';
		this._matPaginatorService.lastPageLabel = 'Last Page';
		this._matPaginatorService.itemsPerPageLabel = 'Items Per Page';
	}

	ngAfterViewInit(): void {
		this.fetchPipeline();
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
	}

	private getPendingDealsBuys(page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>('https://jsonplaceholder.typicode.com/todos/1');
	}

	private fetchPipeline(): void {
		this.fetchPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.totalSelectedSum = 0;
				this.isLoading = true;
				return this.getPendingDealsBuys(this.paginator.pageIndex, this.paginator.pageSize);
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

	public cancel(row: any) {
		console.log(row);
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();
	}

	public approve(row: any) {
		console.log(row);
		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();
	}

	public payForSelected(): void {
		if (0 === this.selection.selected.length) {
			return;
		}

		this.fetchPipelineSubscription$.unsubscribe();
		this.fetchPipeline();
	}
}
