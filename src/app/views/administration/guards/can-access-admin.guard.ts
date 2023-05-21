import { Injectable } from '@angular/core';
import {  Router,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractLoginService } from '../../login/service/abstract-login.service';
import {of, map} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CanAccessToAdmin {
  constructor(private _loginService: AbstractLoginService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(this._loginService.getAccessToken()).pipe(map(token=>{
        if (token) {
            return true;
          } else {
            return this.router.parseUrl('/');
          }
    }))
   
  }
}