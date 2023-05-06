import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractCustomizationService } from './abstract-customization.service';

@Injectable()
export class CustomizationService implements AbstractCustomizationService {
	constructor(private _httpClient: HttpClient) {}

	/**
	 *
	 *
	 */
	getAllModules(): Observable<any> {
		return this._httpClient.get<any>(`${environment.baseUrl}/containers`);
	}

	/**
	 *
	 *
	 */
	getModule(id: number): Observable<any> {
		return this._httpClient.get<any>(`${environment.baseUrl}/containers/${id}`);
	}

	/**
	 *
	 *
	 */
	getAllExtras(): Observable<any> {
		return this._httpClient.get<any>(`${environment.baseUrl}/extras`);
	}

	/**
	 *
	 *
	 */
	getExtra(id: number): Observable<any> {
		return this._httpClient.get<any>(`${environment.baseUrl}/extras/${id}`);
	}

	/**
	 *
	 *
	 */
	getExtrasByType(type: string): Observable<any> {
		return this._httpClient.get<any>(`${environment.baseUrl}/extras/${type}`);
	}
}
