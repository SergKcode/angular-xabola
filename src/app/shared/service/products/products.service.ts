import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractProductsService } from './abstract-products.service';
import { Product, ProductType } from '../../model/shared.model';

@Injectable()
export class ProductsService implements AbstractProductsService {
	constructor(private _httpClient: HttpClient) {}

	/**
	 *Metodo para traer de la bbdd todos los productos
	 */
	getAllProducts(): Observable<Product[]> {
		return this._httpClient.get<Product[]>(`${environment.baseUrl}/products`);
	}

	/**
	 * Metodo para traer de la bbdd todos los productos filtrando por tipo de producto
	 * @param typeId
	 */
	getAllProductsByType(typeId: string): Observable<Product[]> {
		return this._httpClient.get<Product[]>(`${environment.baseUrl}/products/types/${typeId}`);
	}

	/**
	 *Metodo para traer de la bbdd todos los tipos de producto
	 */
	getProductsTypes(): Observable<ProductType[]> {
		return this._httpClient.get<ProductType[]>(`${environment.baseUrl}/products/types`);
	}

	/**
	 * Metodo para traer un producto por id
	 * @param id
	 */
	getProduct(id: string): Observable<Product> {
		return this._httpClient.get<any>(`${environment.baseUrl}/products/${id}`);
	}

	/**
	 * Metodo para crear un nuevo producto
	 * @param values
	 * @param file
	 */
	createNewProduct(values: { [key: string]: any }, file: File): Observable<Product> {
		const formData = new FormData();
		const { name, size, price, typeId } = values;
		formData.append('value', price);
		formData.append('file', file);
		size && formData.append('size', size);
		formData.append('name', name);
		formData.append('typeId', typeId);

		return this._httpClient.post<Product>(`${environment.baseUrl}/products`, formData);
	}

	/**
	 * Metodo para editar un producto
	 * @param id
	 * @param values
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
	 * Metodo para eliminar un producto
	 * @param id
	 */
	deleteProduct(id: string): Observable<any> {
		return this._httpClient.delete<any>(`${environment.baseUrl}/products/${id}`);
	}
}
