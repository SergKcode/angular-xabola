import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, first, map, of, switchMap, tap } from 'rxjs';

import { ProductTypeCode, administrationAction } from 'src/app/shared/model/shared.model';

import { ProductsService } from 'src/app/shared/service/products/products.service';
import { Product } from 'src/app/views/customization/model/customization.model';
import { adminTitleFormsTranslations } from '../../../model/admin.model';
import { AbstractUtilsService } from 'src/app/shared/service/utils/abstract-utils.service';

@Component({
	selector: 'app-delete-product-form',
	templateUrl: './delete-product-form.component.html',
	styleUrls: ['./delete-product-form.component.scss']
})
export class DeleteProductFormComponent implements OnInit {
	typeProductSelected$: BehaviorSubject<ProductTypeCode | null> = new BehaviorSubject<ProductTypeCode | null>(null);
	listOfProducts$: Observable<Product[]> = of([]);
	enableDeleteSubmitButton$: Observable<boolean> = of(false);

	deleteFormGroup: FormGroup = new FormGroup({});
	translateTitle: string = adminTitleFormsTranslations[administrationAction.ADD];

	constructor(private _formBuilder: FormBuilder, private _productsService: ProductsService, private _utilsService:AbstractUtilsService) {}

	ngOnInit(): void {
		this.deleteFormGroup = this._formBuilder.group({
			product: this._formBuilder.control({ value: '', disabled: true }, Validators.required),
			type: this._formBuilder.control('', Validators.required)
		});

		this.enableDeleteSubmitButton$ = this.deleteFormGroup.valueChanges.pipe(map((_) => this.deleteFormGroup.valid));

		this.listOfProducts$ = this._getListOfProducts();
		this.deleteFormGroup.get('type')?.valueChanges.subscribe((type) => {
			this.typeProductSelected$.next(type);
		});
	}

	/**
	 *
	 */
	private _getListOfProducts():Observable<Product[]> {
		return this.typeProductSelected$.pipe(
			switchMap((type) => {
				const productControl = this.deleteFormGroup.get('product')
				if (!type) {
					productControl?.disable();
					return of([]);
				}
				productControl?.enable();
				return this._utilsService.getListOfProductsByTypeCode(type)
			}),
	
		);
	}

	/**
	 *
	 */
	deleteProduct() {
		const {
			value: { type, product }
		} = this.deleteFormGroup;

		this._productsService.deleteProduct(product)
			.pipe(first())
			.subscribe((_) => this.deleteFormGroup.reset());
	}
}
