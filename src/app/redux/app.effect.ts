import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { getProductTypes, getProductTypesError, getProductTypesSuccess } from './app.action';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AbstractProductsService } from '../shared/service/products/abstract-products.service';

@Injectable()
export class AppEffects {
	constructor(private actions$: Actions, private _productsService: AbstractProductsService) {}

	getProductTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getProductTypes),
			exhaustMap(() => {
				return this._productsService.getProductsTypes().pipe(
					map((response) => getProductTypesSuccess({ productTypes: response })),
					catchError(() => of(getProductTypesError()))
				);
			})
		)
	);

	/*  getUserRole$= createEffect(()=>
    this.actions$.pipe(
        ofType(getUserRole), 
        exhaustMap(()=>{
            //llamada al servicio
            //create succes and fail
            return of(true)
        })
    )) */
}
