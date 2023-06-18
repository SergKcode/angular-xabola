import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { UtilsServiceModule } from './utils.service.module';
import { Store } from '@ngrx/store';
import { Product, ProductTypeCode } from '../../model/shared.model';
import { Observable } from 'rxjs';
import { ProductsService } from '../products/products.service';

@Injectable({
	providedIn: UtilsServiceModule,
	useClass: UtilsService,
	deps: [Store, ProductsService]
})
export abstract class AbstractUtilsService {

	/**
	 * Metodo para devolver el id de producto segun el codigo de tipo
	 */
	abstract getProductTypeIdByTypeCode(code: ProductTypeCode): Observable<string>;

	/**
	 * Metodo para devolver una lista de productos por el codigo de tipo
	 */
	abstract getListOfProductsByTypeCode(code: ProductTypeCode): Observable<Product[]>;
}
