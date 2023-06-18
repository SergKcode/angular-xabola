import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CUSTOMIZATION_LIST_VIEW_CONFIG } from '../../model/customization.config';
import { AbstractProductsService } from '../../../../shared/service/products/abstract-products.service';
import { AppRoutes, Product, ProductTypeCode } from 'src/app/shared/model/shared.model';
import { Store } from '@ngrx/store';
import { resetCustomSelection } from 'src/app/redux/app.action';
import { selectProductTypes } from 'src/app/redux/app.selector';
import { Router } from '@angular/router';
import { AbstractUtilsService } from 'src/app/shared/service/utils/abstract-utils.service';

@Component({
	selector: 'app-customization',
	templateUrl: './customization.component.html',
	styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
	listOfSelectables$: Observable<any> = of({});
	productTypes$: Observable<any> = of([]);
	houseElementsSelected$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	selectionOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	selectionOnProcess: boolean = true;
	totalCounter$: Observable<number> = of(0);
	disableButtonNext$: Observable<boolean> = of(false);
	idsSelected$: Observable<string[]> = of([]);

	constructor(
		private _customizationService: AbstractProductsService,
		private _store: Store,
		private _router: Router,
		private _utilsService: AbstractUtilsService
	) {}

	ngOnInit(): void {
		this.productTypes$ = this._getListOfProductTypes();
		this.listOfSelectables$ = this._getListOfCustomization();
		this.totalCounter$ = this._getTotal();
		this.disableButtonNext$ = this._disabledButton();
		this.idsSelected$ = this._getSelectedIds();
	}

	/**
	 * Funcion de obtención de Ids de productos seleccionados
	 */
	private _getSelectedIds() {
		return this.houseElementsSelected$.pipe(
			map((products) => {
				return products.map((product) => product.id);
			})
		);
	}

	/**
	 * Funcion que dibuja el resumen de productos seleccionados por el usuario
	 */
	private _buildSelectionResume(product: Product) {
		if (product) {
			const type = product?.typeId?.typeCode;
			const previousValue = this.houseElementsSelected$.getValue();
			const indexProductWithSameType = previousValue.findIndex((element) => element?.typeId?.typeCode === type);
			const isProductSelectedDuplicated = previousValue.findIndex((element) => element?.id === product.id) >= 0;

			if (isProductSelectedDuplicated) {
				//Toggle de producto seleccionado
				const unSelectProduct = previousValue.filter((element) => element.id !== product.id);
				this.houseElementsSelected$.next([...unSelectProduct]);
			} else if (
				indexProductWithSameType >= 0 &&
				type !== ProductTypeCode.EQUIPAMIENTO &&
				type !== ProductTypeCode.AUTOSUFICIENCIA
			) {
				// Si se elige un producto del mismo tipo que no sea multiseleccionable se sustituye el antiguo por el nuevo
				previousValue[indexProductWithSameType] = product;
				this.houseElementsSelected$.next([...previousValue]);
			} else {
				this.houseElementsSelected$.next([...previousValue, product]);
			}
		}
	}

	/**
	 * Funcion que obtiene los tipos de productos
	 */
	private _getListOfProductTypes(): Observable<any> {
		return this._store.select(selectProductTypes);
	}

	/**
	 * Funcion que habilita o desabilita el boton siguiente
	 */
	private _disabledButton() {
		return combineLatest([this.houseElementsSelected$, this.selectionOrder$]).pipe(
			map(([elementsSelected, order]) => {
				if (order <= 3) {
					return elementsSelected.length !== order;
				}
				return false;
			})
		);
	}

	/**
	 * Funcion que devuelve el precio total de los elementos seleccionados
	 */
	private _getTotal() {
		return this.houseElementsSelected$.pipe(
			map((elements) => {
				return (elements || []).reduce((acc, products) => acc + products.value, 0);
			})
		);
	}

	/**
	 * Funcion que devuelve la lista de productos segun el tipo de producto
	 */
	private _getListOfCustomization(): Observable<Product[]> {
		return this.selectionOrder$.pipe(
			switchMap((order) => {
				const productCode =
					CUSTOMIZATION_LIST_VIEW_CONFIG.find((element) => element.order === order)?.type ||
					ProductTypeCode.CONTAINERS;

				return this._utilsService.getProductTypeIdByTypeCode(productCode).pipe(
					switchMap((typeId) => {
						if (order <= 5 && typeId) {
							return this._customizationService.getAllProductsByType(typeId);
						}
						return of([]);
					})
				);
			})
		);
	}

	/**
	 * Evento de seleccion de producto
	 * @param customizationSelection
	 */
	selectProductHandler(customizationSelection: Product) {
		this._buildSelectionResume(customizationSelection);
	}

	/**
	 * Evento de boton siguiente
	 */
	nextHandler() {
		const currentValue: number = this.selectionOrder$.getValue();
		this.selectionOnProcess = !(currentValue >= 6);
		this.selectionOrder$.next(currentValue + 1);
	}

	/**
	 * Evento de cancelación del proceso de seleccón
	 */
	cancelSelectionProcess() {
		this._store.dispatch(resetCustomSelection());
		this.selectionOrder$.next(1);
		this.houseElementsSelected$.next([]);
	}
	
	/**
	 * Evento para solicitar contacto
	 */
	requestBadget() {
		this._router.navigateByUrl(`/${AppRoutes.CONTACT}`);
	}
}
