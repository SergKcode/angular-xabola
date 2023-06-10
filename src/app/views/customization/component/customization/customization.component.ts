import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, combineLatest } from 'rxjs';
import { first, map, skipWhile, tap } from 'rxjs/operators';
import { CUSTOMIZATION_LIST_VIEW_CONFIG, MODULE_LITERAL } from '../../model/customization.config';
import { Container, Extra, Product } from '../../model/customization.model';
import { AbstractProductsService } from '../../../../shared/service/products/abstract-products.service';
import { AppRoutes, GenericObject, ProductTypeCode, ProductTypes } from 'src/app/shared/model/shared.model';
import { Store } from '@ngrx/store';
import { resetCustomSelection, saveCustomSelection } from 'src/app/redux/app.action';
import { selectCustomizationSelection, selectIsAdmin, selectProductTypes } from 'src/app/redux/app.selector';
import { Router } from '@angular/router';

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
		private _router: Router
	) {}

	ngOnInit(): void {
		this.productTypes$ = this._getListOfProductTypes();
		this.listOfSelectables$ = this._getListOfCustomization();
		this.totalCounter$ = this._getTotal();
		this.disableButtonNext$ = this._disabledButton();
		this.idsSelected$ = this._getSelectedIds();
	}

	/**
	 *
	 */
	private _getSelectedIds() {
		return this.houseElementsSelected$.pipe(
			map((products) => {
				return products.map((product) => product.id);
			})
		);
	}

	/**
	 *
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
	 *
	 */
	private _getListOfProductTypes(): Observable<any> {
		return this._store.select(selectProductTypes);
	}

	/**
	 *
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
	 *
	 */
	private _getTotal() {
		return this.houseElementsSelected$.pipe(
			map((elements) => {
				return (elements || []).reduce((acc, products) => acc + products.value, 0);
			})
		);
	}

	/**
	 *
	 */
	private _getListOfCustomization(): Observable<Product[]> {
		return combineLatest([this.productTypes$, this.selectionOrder$]).pipe(
			switchMap(([productTypes, order]: [ProductTypes[], number]) => {
				if (productTypes.length) {
					const productCode =
						CUSTOMIZATION_LIST_VIEW_CONFIG.find((element) => element.order === order)?.type || 'CO';
					const idType = (productTypes || []).find((e) => e?.typeCode === productCode)?.id;
					if (order <= 5 && idType) {
						return this._customizationService.getAllProductsByType(idType);
					}
				}

				return of([]);
			})
		);
	}

	/**
	 *
	 */
	selectProductHandler(customizationSelection: Product) {
		this._buildSelectionResume(customizationSelection);
	}

	/**
	 *
	 */
	nextHandler() {
		const currentValue: number = this.selectionOrder$.getValue();
		this.selectionOnProcess = !(currentValue >= 6);
		this.selectionOrder$.next(currentValue + 1);
	}

	/**
	 *
	 */
	cancelSelectionProcess() {
		this._store.dispatch(resetCustomSelection());
		this.selectionOrder$.next(1);
		this.houseElementsSelected$.next([]);
	}
	/**
	 *
	 */
	requestBadget() {
		this._router.navigateByUrl(`/${AppRoutes.CONTACT}`);
	}
}
