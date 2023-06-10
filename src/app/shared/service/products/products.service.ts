import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractProductsService } from './abstract-products.service';
import { ProductTypes, ProductTypeCode } from '../../model/shared.model';
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
	getAllProducts(): Observable<any[]> {
		return this._httpClient.get<any>(`${environment.baseUrl}/products`);
	}

	/**
	 *
	 *
	 */
	getAllProductsByType(typeId:string): Observable<any[]> {
		return this._httpClient.get<any>(`${environment.baseUrl}/products/types/${typeId}`);
	}


	/**
	 *
	 *
	 */
	getProductsTypes(): Observable<ProductTypes[]>{
		return this._httpClient.get<ProductTypes[]>(`${environment.baseUrl}/products/types`);
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
	getExtrasByType(type: ProductTypeCode): Observable<Product[]> {
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

	
	/**
	 *
	 *
	 */
	createNewContainer(values: {[key:string]:any}, file:File): Observable<any> {
		const formData= new FormData()
		const { name, size, price} = values;
		formData.append('value', price)
		formData.append('file', file)
		formData.append('size', size)
		formData.append('name', name)

		return this._httpClient.post<any>(`${environment.baseUrl}/containers`, formData);
	}

	/**
	 *
	 *
	 */
	createNewExtra(values: {[key:string]:any}, file:File): Observable<any> {
		const formData= new FormData()
		const { name, type, price} = values;
		formData.append('value', price)
		formData.append('file', file)
		formData.append('type', type)
		formData.append('name', name)

		return this._httpClient.post<any>(`${environment.baseUrl}/extras`, formData);
	}
}
