import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
	selector: 'quica-payment-history-table',
	templateUrl: './payment-history.component.html',
	styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

	public sampleData = [
		{ productImage: "../../../../assets/Laptop.svg", listingName: "Microsoft surface 2 laptop", id: 458745, price: 350000, maxPossibleComission: 32020, date: new Date(), deal: "Sold", status: "Sold" },
		{ productImage: "../../../../assets/Console.svg", listingName: "Playstation 5", id: 458746, price: 159990, maxPossibleComission: 7000, date: new Date(), deal: "Bought", status: "Selling" },
		{ productImage: "../../../../assets/Glasses.svg", listingName: "Ray-Ban", id: 458747, price: 32000, maxPossibleComission: 251, date: new Date(), deal: "Shared", status: "Awaiting Comission" }
	];

	// Primitives
	isLoading = true;
	totalResults = 0;
	tableColumns: string[] = ['Listing Name', 'Deal', 'Price', 'Comission', 'Date', 'Status'];

	// Referentials
	fetchPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	// Decorators
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient) { }

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
	}

	ngOnDestroy(): void {
		this.fetchPipelineSubscription$.unsubscribe();
	}

	private getPaymentHistory(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>("https://jsonplaceholder.typicode.com/todos/1");
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
