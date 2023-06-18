import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductsServiceModule } from './products.service.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductType } from '../../model/shared.model';

@Injectable({
	providedIn: ProductsServiceModule,
	useClass: ProductsService,
	deps: [HttpClient]
})
export abstract class AbstractProductsService {
	abstract getProduct(id: string): Observable<Product>;
	abstract getAllProducts(): Observable<Product[]>;
	abstract getAllProductsByType(typeId: string): Observable<Product[]>;
	abstract getProductsTypes(): Observable<ProductType[]>;
	abstract createNewProduct(values: { [key: string]: any }, file: File): Observable<Product>;
	abstract editProduct(id: string, values: Partial<Product>): Observable<any>;
	abstract deleteProduct(id: string): Observable<any>;
}
