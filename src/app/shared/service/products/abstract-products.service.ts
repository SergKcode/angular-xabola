import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductsServiceModule } from './products.service.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container, Extra, Product } from 'src/app/views/customization/model/customization.model';
import { ProductTypeCode } from '../../model/shared.model';

@Injectable({
	providedIn: ProductsServiceModule,
	useClass: ProductsService,
	deps: [HttpClient]
})
export abstract class AbstractProductsService {
	abstract getProduct(id: string): Observable<Product>;
	abstract getAllProducts(): Observable<any[]>;
	abstract getAllProductsByType(typeId: string): Observable<any[]>;
	abstract getProductsTypes(): Observable<any[]>;
	abstract createNewProduct(values: { [key: string]: any }, file: File): Observable<Product>;
	abstract editProduct(id: string, values: Partial<Product>): Observable<any>;
	abstract deleteProduct(id: string): Observable<any>;
}
