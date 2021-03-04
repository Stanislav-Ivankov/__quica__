import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

	constructor() { }

	public profilePictureChangeNotification: EventEmitter<string | ArrayBuffer | null> = new EventEmitter<string | ArrayBuffer | null>();
}
