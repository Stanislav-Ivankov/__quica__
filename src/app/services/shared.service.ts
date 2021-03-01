import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedService {

	constructor() { }

	public refreshNotification: EventEmitter<boolean> = new EventEmitter<boolean>();
	public readyToRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();
}
