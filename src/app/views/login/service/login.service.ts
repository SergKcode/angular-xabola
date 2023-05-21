import { Injectable } from '@angular/core';
import { AbstractLoginService } from './abstract-login.service';
import { AuthCredential } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService implements AbstractLoginService {
	private accessToken: string = '';
	constructor(private _httpClient: HttpClient) {}

	authUser(credetials: AuthCredential): Observable<any> {
		return this._httpClient.post<any>(`${environment.baseUrl}/auth`, credetials).pipe(
			catchError((error) => {
				console.log(error);
				return '';
			}),
			tap((response) => {
				const accessToken = response.accessToken;
				this._setAccessToken(accessToken);
				
			})
		);
	}

	private _setAccessToken(token: string) {
		localStorage.setItem('accessToken', token);
		this.accessToken = token;
	}

	getAccessToken() {
		return this.accessToken || localStorage.getItem('accessToken');
	}
}
