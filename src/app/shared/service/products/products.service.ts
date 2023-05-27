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
	getModule(id: string): Observable<Product> {
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
	getExtra(id: string): Observable<Product> {
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
	deleteContainer(id: string): Observable<any> {
		return this._httpClient.delete<any>(`${environment.baseUrl}/containers/${id}`);
	}

	/**
	 *
	 *
	 */
	deleteExtra(id: string): Observable<any> {
		return this._httpClient.delete<any>(`${environment.baseUrl}/extras/${id}`);
	}

	/**
	 *
	 *
	 */
	editContainer(id: string, values: Partial<Container>): Observable<any> {
		const { name, value } = values;
		return this._httpClient.patch<any>(`${environment.baseUrl}/containers/${id}`, { name, value });
	}

	/**
	 *
	 *
	 */
	editExtra(id: string, values: Partial<Extra>): Observable<any> {
		const { name, value } = values;
		return this._httpClient.patch<any>(`${environment.baseUrl}/extras/${id}`, { name, value });
	}
}
