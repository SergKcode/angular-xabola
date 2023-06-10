import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, first, map, of, switchMap, tap } from 'rxjs';
import { ProductTypeCode, administrationAction } from 'src/app/shared/model/shared.model';
import { ProductsService } from 'src/app/shared/service/products/products.service';
import { Product } from 'src/app/views/customization/model/customization.model';
import { adminTitleFormsTranslations } from '../../../model/admin.model';
import { AbstractUtilsService } from 'src/app/shared/service/utils/abstract-utils.service';

@Component({
	selector: 'app-edit-product-form',
	templateUrl: './edit-product-form.component.html',
	styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {
	typeProductSelected$: BehaviorSubject<ProductTypeCode | null> = new BehaviorSubject<ProductTypeCode | null>(null);
	idProductSelected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	showSizeEditInput$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	listOfProducts$: Observable<Product[]> = of([]);

	enableEditSubmitButton$: Observable<boolean> = of(false);
	productToEdit$: Observable<Product | null> = of(null);

	editProductFormGroup: FormGroup = new FormGroup({});
	translateTitle: string = adminTitleFormsTranslations[administrationAction.EDIT];

	constructor(
		private _formBuilder: FormBuilder,
		private _productsService: ProductsService,
		private _utilsService: AbstractUtilsService
	) {}

	ngOnInit(): void {
		this.listOfProducts$ = this._getListOfProducts();
		this.productToEdit$ = this._getProductToEdit();
		this.editProductFormGroup = this._formBuilder.group({
			product: this._formBuilder.control({ value: '', disabled: true }, Validators.required),
			type: this._formBuilder.control('', Validators.required),
			name: this._formBuilder.control('', Validators.required),
			value: this._formBuilder.control('', Validators.required),
			size: this._formBuilder.control('')
		});

		this.enableEditSubmitButton$ = this.editProductFormGroup.valueChanges.pipe(
			map((_) => this.editProductFormGroup.valid)
		);
		this.editProductFormGroup.get('type')?.valueChanges.subscribe((type) => {
			this.typeProductSelected$.next(type);
		});
		this.editProductFormGroup.get('product')?.valueChanges.subscribe((product) => {
			this.idProductSelected$.next(product);
		});
	}

	_getProductToEdit() {
		return this.idProductSelected$.pipe(
			switchMap((id) => {
				return !id ? of(null) : this._productsService.getProduct(id);
			}),
			tap((element) => {
				if (element) {
					const { size, name, value } = element;
					this.showSizeEditInput$.next(!!size);
					this._updateSizeControlRequired(!!size, this.editProductFormGroup);
					this.editProductFormGroup.patchValue({ name, value, ...(size && { size }) });
				}
			})
		);
	}

	/**
	 *
	 */
	private _getListOfProducts(): Observable<Product[]> {
		return this.typeProductSelected$.pipe(
			switchMap((type) => {
				debugger
				const productControl = this.editProductFormGroup.get('product');
				if (!type) {
					productControl?.disable();
					return of([]);
				}
				productControl?.enable();
				return this._utilsService.getListOfProductsByTypeCode(type);
			})
		);
	}

	/**
	 *
	 */
	private _updateSizeControlRequired(isRequired: boolean, formGroup: FormGroup): void {
		const sizeControl = formGroup.get('size');
		isRequired ? sizeControl?.setValidators(Validators.required) : sizeControl?.clearValidators();
		sizeControl?.markAsPending();
		sizeControl?.updateValueAndValidity();
	}

	/**
	 *
	 */
	editProduct() {
		const { value } = this.editProductFormGroup;
		this._productsService
			.editProduct(this.idProductSelected$.getValue(), value)
			.pipe(first())
			.subscribe((_) => this.editProductFormGroup.reset());
	}
}
