import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractProductsService } from './abstract-products.service';
import { HouseElementsTypes } from '../../model/shared.model';
import { Container, Extra, Product } from 'src/app/views/customization/model/customization.model';

@Injectable()
export class ProductsService implements AbstractProductsService {
	constructor(private _httpClient: HttpClient) {}

	/**
	 *
	 *
	 */
	getAllModules(): Observable<Product[]> {
		return this._httpClient.get<any>(`${environment.baseUrl}/containers`);
	}

	/**
	 *
	 *
	 */
	getModule(id: number): Observable<Product> {
		return this._httpClient.get<any>(`${environment.baseUrl}/containers/${id}`);
	}

	/**
	 *
	 *
	 */
	getAllExtras(): Observable<Product[]> {
		return this._httpClient.get<any>(`${environment.baseUrl}/extras`);
	}

	/**
	 *
	 *
	 */
	getExtra(id: number): Observable<Product> {
		return this._httpClient.get<any>(`${environment.baseUrl}/extras/${id}`);
	}

	/**
	 *
	 *
	 */
	getExtrasByType(type: HouseElementsTypes): Observable<Product[]> {
		return this._httpClient.get<any>(`${environment.baseUrl}/extras/type/${type}`);
	}

	/**
	 *
	 *
	 */
	deleteContainer(id:string): Observable<any> {
		return this._httpClient.delete<any>(`${environment.baseUrl}/containers/${id}`);
	}

	/**
	 *
	 *
	 */
	deleteExtra(id:string): Observable<any> {
		return this._httpClient.delete<any>(`${environment.baseUrl}/extras/${id}` );
	}
}
