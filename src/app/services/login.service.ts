import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class LoginService {

	constructor() { }

	loggedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
}
