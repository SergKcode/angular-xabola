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
	getAllProducts(): Observable<any[]> {
		return this._httpClient.get<any>(`${environment.baseUrl}/products`);
	}

	/**
	 *
	 *
	 */
	getAllProductsByType(typeId: string): Observable<any[]> {
		debugger;
		return this._httpClient.get<any>(`${environment.baseUrl}/products/types/${typeId}`);
	}

	/**
	 *
	 *
	 */
	getProductsTypes(): Observable<ProductTypes[]> {
		return this._httpClient.get<ProductTypes[]>(`${environment.baseUrl}/products/types`);
	}

	/**
	 *
	 *
	 */
	getProduct(id: string): Observable<Product> {
		return this._httpClient.get<any>(`${environment.baseUrl}/products/${id}`);
	}

	/**
	 *
	 *
	 */
	createNewProduct(values: { [key: string]: any }, file: File): Observable<Product> {
		const formData = new FormData();
		const { name, size, price, typeId } = values;
		formData.append('value', price);
		formData.append('file', file);
		size && formData.append('size', size);
		formData.append('name', name);
		formData.append('typeId', typeId);

		return this._httpClient.post<any>(`${environment.baseUrl}/products`, formData);
	}

	/**
	 *
	 *
	 */
	editProduct(id: string, values: Partial<Product>): Observable<any> {
		const { name, value, size } = values;
		return this._httpClient.patch<any>(`${environment.baseUrl}/products/${id}`, {
			name,
			value,
			...(size && { size })
		});
	}

	/**
	 *
	 *
	 */
	deleteProduct(id: string): Observable<any> {
		return this._httpClient.delete<any>(`${environment.baseUrl}/products/${id}`);
	}
}
