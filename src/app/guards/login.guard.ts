import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

	constructor(private _routerService: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {		
		const param: Params = next.queryParams

		if (param.process === "Buy") {
			this._routerService.navigate(["/company-details", param.productId], { queryParams: { process: "Buy" } });
		} else {
			this._routerService.navigate(["/sign-up"], { queryParams: { a: 12 } });
		}

		return false;
	}
}
