import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedService {

	phoneNumber: string | null = null;

	constructor() { }

	public readyToRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();
	public refreshNotification: EventEmitter<boolean> = new EventEmitter<boolean>();
}
