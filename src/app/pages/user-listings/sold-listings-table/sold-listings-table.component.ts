import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { merge, Observable, EMPTY, Subscription } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SharedService } from "../../services/shared.service";

@Component({
	selector: 'quica-sold-listings-table',
	templateUrl: './sold-listings-table.component.html',
	styleUrls: ['./sold-listings-table.component.scss']
})
export class SoldListingsTableComponent implements OnInit, AfterViewInit, OnDestroy {
	ELEMENT_DATA = [
		{ comission: 1, listingName: 'Hydrogen', price: 1.0079, status: 'H', timesShared: 12 },
		{ comission: 2, listingName: 'Helium', price: 4.0026, status: 'He', timesShared: 12 },
		{ comission: 3, listingName: 'Lithium', price: 6.941, status: 'Li', timesShared: 12 }
	];

	isLoading: boolean = true;
	totalResults: number = 0;
	tableColumns: string[] = ['Listing Name', 'Price', 'Comission', 'Times Shared', "Use As Template"];

	requestPipelineSubscription$: Subscription = new Subscription();
	tableData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	soldListingsColumns: string[] = ["Listing Name", "Price", "Comission", "Times Shared", "Use As Template"];

	constructor(private _matPaginatorService: MatPaginatorIntl, private _httpService: HttpClient, private _sharedService: SharedService) { }

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

		this._sharedService.refreshNotification.subscribe(() => {
			this.isLoading = true;
			this.getListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize).subscribe((data: any[]) => {
				this.tableData = new MatTableDataSource<any>(data);
				this.selection = new SelectionModel<any>(true, []);
				this.isLoading = false;
			});
		});
	}

	ngOnDestroy() {
		this.requestPipelineSubscription$.unsubscribe();
	}

	private getListings(sortBy: string, orderBy: string, page: number, pageSize: number): Observable<any[]> {
		return this._httpService.get<any[]>(`https://api.github.com/search/issues?q=repo:angular/components&sortBy=${ sortBy }&sortOrder=${ orderBy }&page=${ page + 1 }&pageSize=${ pageSize }`);
	}

	private requestPipeline() {
		this.requestPipelineSubscription$ = merge<EventEmitter<Sort>, EventEmitter<PageEvent>>(this.sort.sortChange, this.paginator.page).pipe(
			startWith({}),
			switchMap(() => {
				this.isLoading = true;
				return this.getListings(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
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

	useAsTemplate(row: Element) { }
}
