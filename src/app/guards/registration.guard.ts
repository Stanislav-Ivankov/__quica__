import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedService } from '../services/shared.service';

@Injectable({ providedIn: 'root' })
export class RegistrationGuard implements CanActivate {

	constructor(private _sharedService: SharedService) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._sharedService.phoneNumber !== null;
	}
}
