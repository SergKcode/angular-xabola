import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { LoginServiceModule } from './login.service.module';
import { AuthCredential } from '../model/login.model';
import { StoreModule } from '@ngrx/store';

@Injectable({
	providedIn: LoginServiceModule,
	useClass: LoginService,
	deps: [HttpClient, StoreModule]
})
export abstract class AbstractLoginService {
	abstract autenticateUser(credetials:AuthCredential):Observable<any>
	abstract getAccessToken():string | null
	abstract isUserAdmin(): Observable<boolean>
}
