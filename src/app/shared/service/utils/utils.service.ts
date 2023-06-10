import { Injectable } from '@angular/core';
import { AbstractUtilsService } from './abstract-utils.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductTypeCode } from '../../model/shared.model';
import { selectProductTypes } from 'src/app/redux/app.selector';
import { Observable, map, switchMap } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Product } from 'src/app/views/customization/model/customization.model';
import { AbstractProductsService } from '../products/abstract-products.service';

@Injectable()
export class UtilsService implements AbstractUtilsService {
	constructor(private _store: Store<AppState>, private _productsService: AbstractProductsService) {}

	/**
	 * Metodo para devolver el id de producto segun el codigo de tipo
	 */
	getProductTypeIdByTypeCode(code: ProductTypeCode): Observable<string> {
		return this._store.select(selectProductTypes).pipe(
			map((types) => {
	
				return types.find((type) => type.typeCode === code)?.id || '';
			})
		);
	}

	/**
	 * Metodo para devolver una lista de productos por el codigo de tipo
	 */
	getListOfProductsByTypeCode(code: ProductTypeCode): Observable<Product[]> {
		return this.getProductTypeIdByTypeCode(code).pipe(
			switchMap((id) => this._productsService.getAllProductsByType(id))
		);
	}


}
