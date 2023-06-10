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
	abstract getAllModules(): Observable<Product[]>;
	abstract getModule(id: string): Observable<Product>;
	abstract getExtra(id: string): Observable<Product>;
	abstract getAllExtras(): Observable<Product[]>;
	abstract getExtrasByType(type: ProductTypeCode): Observable<Product[]>;
	abstract deleteContainer(id: string): Observable<any>;
	abstract deleteExtra(id: string): Observable<any>;
	abstract editContainer(id: string, values: Partial<Container>): Observable<Container>;
	abstract editExtra(id: string, values: Partial<Extra>): Observable<Extra>;
	abstract createNewContainer(values: { [key: string]: any }, file: File): Observable<any>;
	abstract createNewExtra(values: { [key: string]: any }, file: File): Observable<any>;
	abstract getAllProducts(): Observable<any[]>;
	abstract getAllProductsByType(typeId: string): Observable<any[]>;
	abstract getProductsTypes(): Observable<any[]>;
}
