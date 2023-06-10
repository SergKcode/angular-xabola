import { Injectable } from '@angular/core';
import { AbstractLoginService } from './abstract-login.service';
import { AuthCredential } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of , map} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginService implements AbstractLoginService {
	private accessToken: string = '';
	constructor(private _httpClient: HttpClient, private _store:Store) {}

	autenticateUser(credetials: AuthCredential): Observable<boolean> {
		return this._httpClient.post<any>(`${environment.baseUrl}/auth`, credetials).pipe(
			catchError((error) => {
				console.log(error);
				return of(false);
			}),
			map((response) => {
				const accessToken = response.accessToken;
				this._setAccessToken(accessToken);

				return !!accessToken
			})
		);
	}

	private _setAccessToken(token: string) {
		localStorage.setItem('accessToken', token);
		this.accessToken = token;
	}

	getAccessToken():string | null{
		return this.accessToken || localStorage.getItem('accessToken');
	}
}
