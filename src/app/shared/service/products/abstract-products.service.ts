import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductsServiceModule } from './products.service.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container, Extra, Product } from 'src/app/views/customization/model/customization.model';
import { HouseElementsTypes } from '../../model/shared.model';

@Injectable({
	providedIn: ProductsServiceModule,
	useClass: ProductsService,
	deps: [HttpClient]
})
export abstract class AbstractProductsService {
	abstract getAllModules(): Observable<Product[]>;
	abstract getModule(id: number): Observable<Product>;
	abstract getExtra(id: number): Observable<Product>;
	abstract getAllExtras(): Observable<Product[]>;
	abstract getExtrasByType(type: HouseElementsTypes): Observable<Product[]>;
	abstract deleteContainer(id:string): Observable<any> 
	abstract deleteExtra(id:string): Observable<any> 

}
