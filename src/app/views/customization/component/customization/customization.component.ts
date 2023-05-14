import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, combineLatest } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { CUSTOMIZATION_LIST_VIEW_CONFIG, MODULE_LITERAL } from '../../model/customization.config';
import { Container, Extra, Product } from '../../model/customization.model';
import { AbstractCustomizationService } from '../../service/abstract-customization.service';
import { GenericObject, HouseElementsTypes } from 'src/app/shared/model/shared.model';
import { Store } from '@ngrx/store';
import { resetCustomSelection, saveCustomSelection } from 'src/app/redux/app.action';
import { selectCustomizationSelection, selectIsAdmin } from 'src/app/redux/app.selector';

@Component({
	selector: 'app-customization',
	templateUrl: './customization.component.html',
	styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
	listOfSelectables$: Observable<any> = of({});
	houseElementsSelected$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	selectionOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	selectionOnProcess: boolean = true;
	totalCounter$: Observable<number> = of(0);
	disableButtonNext$: Observable<boolean> = of(false);
	idsSelected$: Observable<string[]> = of([]);

	constructor(private _customizationService: AbstractCustomizationService, private _store: Store) {}

	ngOnInit(): void {
		this.listOfSelectables$ = this._getListOfCustomization();
		this._store
			.select(selectCustomizationSelection)
			.pipe(skipWhile((value) => !value))
			.subscribe((product) => {
				this._buildSelectionResume(product);
			});
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
	private _buildSelectionResume(product: any) {
		if (product) {
			const type = product.description;
			const previousValue = this.houseElementsSelected$.getValue();
			const index = previousValue.findIndex((element) => element.description === type);
			if (index >= 0) {
				previousValue[index] = product;
				this.houseElementsSelected$.next([...previousValue]);
			} else {
				this.houseElementsSelected$.next([...previousValue, product]);
			}
		}
	}

	/**
	 *
	 */
	private _disabledButton() {
		return combineLatest([this.houseElementsSelected$, this.selectionOrder$]).pipe(
			map(([elementsSelected, order]) => {
				return elementsSelected.length !== order;
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
		return this.selectionOrder$.pipe(
			switchMap((order) => {
				if (order === 1) {
					return this._customizationService.getAllModules();
				}
				if (order > 1 && order <= 5) {
					const type: HouseElementsTypes =
						CUSTOMIZATION_LIST_VIEW_CONFIG.find((element) => element.order === order)?.type ||
						HouseElementsTypes.EXTERIOR;
					return this._customizationService.getExtrasByType(type);
				}

				return of([]);
			})
		);
	}

	/**
	 *
	 */
	selectProductHandler(customizationSelection: Product) {
		this._store.dispatch(saveCustomSelection({ customizationSelection }));
	}

	/**
	 *
	 */
	nextHandler() {
		const currentValue = this.selectionOrder$.getValue();
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
}
