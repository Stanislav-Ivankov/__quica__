import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticateGuard implements CanActivate {

	constructor(private _routerService: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// if (localStorage.getItem('Username') === 'Test_User') {
		// 	return true;
		// } else {
		// 	return this._routerService.navigate(['/login'], { queryParams: { ...next.params, ...next.queryParams } });
		// }

		return true;
	}
}
