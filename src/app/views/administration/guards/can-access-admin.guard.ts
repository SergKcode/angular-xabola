import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AbstractLoginService } from '../../login/service/abstract-login.service';
import { of, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CanAccessToAdmin {
	constructor(private _loginService: AbstractLoginService, private router: Router) {}

	canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		/* Comprobamos que el usuario tenga el token y que sea usuario administrador */
		return forkJoin([of(this._loginService.getAccessToken()), this._loginService.isUserAdmin()]).pipe(
			map(([token, isAdmin]) => {
				if (token && isAdmin) {
					return true;
				} else {
					/* Si el usuario no es valido se reedirige a la pantalla principal*/
					return this.router.parseUrl('/');
				}
			})
		);
	}
}
