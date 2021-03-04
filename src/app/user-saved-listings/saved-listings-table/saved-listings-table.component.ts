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

	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ["Select", 'Status', 'Price', 'Comission', 'Times Shared', "Remove All"];

	requestPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	// Decorators
	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient) { }

	ngOnInit() {
		this._matPaginatorService.itemsPerPageLabel = "Items Per Page";
		this._matPaginatorService.firstPageLabel = "First Page";
		this._matPaginatorService.previousPageLabel = "Previous Page"
		this._matPaginatorService.nextPageLabel = "Next Page";
		this._matPaginatorService.lastPageLabel = "Last Page";
	}

	ngAfterViewInit() {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.requestPipeline();
	}

	ngOnDestroy() {
		this.requestPipelineSubscription$.unsubscribe();
	}

	private getListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any> {
		return this._httpService.get<any>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private requestPipeline() {
		this.requestPipelineSubscription$ = merge(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}), 
			switchMap(() => {
				this.isLoading = true;
				return this.getListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
			}),
			map((payload: any) => {
				this.totalResults = payload.total_count;
				return payload.items;
			}),
			catchError(() => {
				this.isLoading = false;
				return EMPTY;
			})).subscribe((payload: any) => {
				this.tableData =  new MatTableDataSource<any>(payload);
				this.selection = new SelectionModel<any>(true, []);
				this.isLoading = false;
			});
	}

	public areAllRowsSelected(): boolean {
		return this.selection.selected.length === this.tableData.data.length;
	}

	public masterToggle(): void {
		this.areAllRowsSelected() ? this.selection.clear() : this.tableData.data.forEach((row: any) => this.selection.select(row));
	}

	public removeListing(row: any): void {
		this.requestPipelineSubscription$.unsubscribe();
		this.requestPipeline();
	}

	public removeSelectedListings(): void {
		if (0 === this.selection.selected.length) {
			return;
		}

		this.requestPipelineSubscription$.unsubscribe();
		this.requestPipeline();
	}
}
