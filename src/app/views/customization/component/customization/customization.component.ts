import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { first, map, skipWhile } from 'rxjs/operators';
import { CUSTOMIZATION_LIST_VIEW_CONFIG, MODULE_LITERAL } from '../../model/customization.config';
import { Container, Extra, Product } from '../../model/customization.model';
import { AbstractCustomizationService } from '../../service/abstract-customization.service';
import { GenericObject, HouseElementsTypes } from 'src/app/shared/model/shared.model';
import { Store } from '@ngrx/store';
import { saveCustomSelection } from 'src/app/redux/app.action';
import { selectCustomizationSelection, selectIsAdmin } from 'src/app/redux/app.selector';

@Component({
	selector: 'app-customization',
	templateUrl: './customization.component.html',
	styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
	listOfSelectables$: Observable<any> = of({});
	houseElementsSelected$:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	selectionOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	selectionOnProcess:boolean= true

	constructor(private _customizationService: AbstractCustomizationService, private _store: Store) {}

	ngOnInit(): void {
		this.listOfSelectables$ = this._getListOfCustomization();
		this._store.select(selectCustomizationSelection).pipe(skipWhile(value=>!value)).subscribe(product=>{
			this._buildSelectionResume(product)
		
		})
	}

	private _buildSelectionResume(product:any){
		if(product){
			const type= product.description
			const previousValue= this.houseElementsSelected$.getValue()
			const index=previousValue.findIndex((element) => element.description === type);
			if (index >= 0) {
				previousValue[index] = product;
				this.houseElementsSelected$.next([...previousValue])
			} else {
				this.houseElementsSelected$.next([...previousValue, product])
			}

		}

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
	nextHandler(){
		const currentValue= this.selectionOrder$.getValue()
		this.selectionOnProcess = !(currentValue >=6)
		this.selectionOrder$.next(currentValue+1)

	}
}
