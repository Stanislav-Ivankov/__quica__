import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
	selector: 'quica-sold-listings-table',
	templateUrl: './sold-listings-table.component.html',
	styleUrls: ['./sold-listings-table.component.scss']
})
export class SoldListingsTableComponent implements OnInit, AfterViewInit, OnDestroy {

	public sampleData = [
		{ productImage: "../../../../assets/Laptop.svg", listingName: "Microsoft surface 2 laptop", id: 458745, price: 350000, comission: 32020, timesShared: 51},
		{ productImage: "../../../../assets/Console.svg", listingName: "Playstation 5", id: 458746, price: 159990, comission: 7000, timesShared: 1 },
		{ productImage: "../../../../assets/Glasses.svg", listingName: "Ray-Ban", id: 458747, price: 32000, comission: 251, timesShared: 19 }
	];

	public isLoading = true;
	public totalResults = 0;
	public tableColumns: string[] = ["Listing Name", "Price", "Comission", "Times Shared"];

	public tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	private refreshPipelineSubscription$: Subscription = new Subscription();

	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	constructor(private _httpService: HttpClient, private _matPaginatorService: MatPaginatorIntl) { }

	ngOnInit() {
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
		this._matPaginatorService.firstPageLabel = "First Page";
		this._matPaginatorService.previousPageLabel = "Previous Page";
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.lastPageLabel = "Last Page";
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.refreshPipeline();
	}

	private getSoldListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>("https://jsonplaceholder.typicode.com/todos/1");
	}

	private refreshPipeline(): void {
		this.refreshPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.isLoading = true;
				return this.getSoldListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
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

	ngOnDestroy() {
		this.refreshPipelineSubscription$.unsubscribe();
	}
}
