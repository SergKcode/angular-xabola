import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { CustomizationService } from '../../service/customization.service';
import { CUSTOMIZATION_LIST_VIEW_CONFIG } from '../../model/customization.config';
import { CustomizationTypes } from '../../model/customization.model';
import { AbstractCustomizationService } from '../../service/abstract-customization.service';

@Component({
	selector: 'app-customization',
	templateUrl: './customization.component.html',
	styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
	listOfSelectables$: Observable<any> = of({});
	selectionOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(2);

	constructor(private _customizationService: AbstractCustomizationService) {}

	ngOnInit(): void {
		this.listOfSelectables$ = this._getListOfCustomization();
	}

	private _getListOfCustomization() {
		debugger
		return this.selectionOrder$.pipe(
			switchMap((order) => {
				if (order === 1) {
					return this._customizationService.getAllModules();
				}
				if (order > 1 && order <= 5) {
					const type: CustomizationTypes =
						CUSTOMIZATION_LIST_VIEW_CONFIG.find((element) => element.order === order)?.type ||
						CustomizationTypes.EXTERIOR;
					return this._customizationService.getExtrasByType(type);
				}

				return of([]);
			}), 
			tap(data=>{console.log(data)})
		);
	}
}
