import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'quica-saved-listings-table',
	templateUrl: './saved-listings-table.component.html',
	styleUrls: ['./saved-listings-table.component.scss']
})
export class SavedListingsTableComponent implements OnInit, AfterViewInit, OnDestroy {

	public isLoading = true;
	public totalResults = 0;
	public tableColumns: string[] = ['Select', 'Status', 'Price', 'Comission', 'Times Shared', 'Remove'];

	public tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	private refreshPipelineSubscription$: Subscription = new Subscription();

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	constructor(private _httpService: HttpClient, private _matPaginatorService: MatPaginatorIntl) { }

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

	private getSavedListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any> {
		return this._httpService.get<any>('https://jsonplaceholder.typicode.com/todos/1');
	}

	private refreshPipeline(): void {
		this.refreshPipelineSubscription$ = merge(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.isLoading = true;
				return this.getSavedListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
			}),
			map((payload: any) => {
				this.totalResults = payload.total_count;
				return payload.items;
			}),
			catchError(() => {
				this.isLoading = false;
				return EMPTY;
			})).subscribe((payload: any) => {
				this.tableData =  new MatTableDataSource<any>([
					{
						productImage: '../../../../assets/Laptop.svg',
						listingName: 'Microsoft surface 2 laptop',
						id: 458745,
						status: 'active',
						price: 350000,
						comission: 32020,
						timesShared: 51
					},
					{
						productImage: '../../../../assets/Console.svg',
						listingName: 'Playstation 5',
						id: 458746,
						status: 'sold',
						price: 159990,
						comission: 7000,
						timesShared: 2
					},
					{
						productImage: '../../../../assets/Glasses.svg',
						listingName: 'Ray-Ban',
						id: 458747,
						status: 'active',
						price: 32000,
						comission: 251,
						timesShared: 19
					},
					{
						productImage: '../../../../assets/Laptop.svg',
						listingName: 'Microsoft surface 2 laptop',
						id: 458748,
						status: 'active',
						price: 350000,
						comission: 32020,
						timesShared: 51
					},
					{
						productImage: '../../../../assets/Console.svg',
						listingName: 'Playstation 5',
						id: 458749,
						status: 'sold',
						price: 159990,
						comission: 7000,
						timesShared: 1
					}
				]);
				this.selection = new SelectionModel<any>(true, []);
				this.isLoading = false;
			});
	}

	public removeListing(row: any): void {
		this.refreshPipelineSubscription$.unsubscribe();
		this.refreshPipeline();
	}

	ngOnDestroy() {
		this.refreshPipelineSubscription$.unsubscribe();
	}
}
