import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, first, forkJoin, map, of, switchMap } from 'rxjs';
import { titleTranslations } from '../../model/product-form.model';
import { HouseElementsTypes, administrationAction } from 'src/app/shared/model/shared.model';
import { Container, Extra, Product } from 'src/app/views/customization/model/customization.model';
import { ProductsService } from 'src/app/shared/service/products/products.service';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges {
	@Input() adminAction: administrationAction | null = administrationAction.ADD;
	deleteTypeSelected$: BehaviorSubject<HouseElementsTypes | null> = new BehaviorSubject<HouseElementsTypes | null>(
		null
	);
	refresh$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	listOfProducts$: Observable<Product[]> = of([]);
	disableSelectProduct$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	isContainerType$: Observable<boolean> = of(true);
	enableSubmitButton$: Observable<boolean> = of(false);
	enableDeleteSubmitButton$: Observable<boolean> = of(false);

	adminProductForm: FormGroup = new FormGroup({});
	deleteFormGroup: FormGroup = new FormGroup({});
	translateTitle: string = titleTranslations[administrationAction.ADD];
	haveBeenTypeChange: boolean = true;

	constructor(private _formBuilder: FormBuilder, private _productsService: ProductsService) {}

	ngOnInit(): void {
		this.adminProductForm = this._formBuilder.group({
			name: this._formBuilder.control('', Validators.required),
			price: this._formBuilder.control('', Validators.required),
			size: this._formBuilder.control(''),
			type: this._formBuilder.control('', Validators.required)
		});

		this.deleteFormGroup = this._formBuilder.group({
			product: this._formBuilder.control({ value: '', disabled: true }, Validators.required),
			type: this._formBuilder.control('', Validators.required)
		});

		this.enableDeleteSubmitButton$ = this.deleteFormGroup.valueChanges.pipe(map((_) => this.deleteFormGroup.valid));
		this.enableSubmitButton$ = this.adminProductForm.valueChanges.pipe(map((_) => this.adminProductForm.valid));
		this.isContainerType$ = this._getIsContainerType();
		this.listOfProducts$ = this._getListOfProducts();
		this.deleteFormGroup.get('type')?.valueChanges.subscribe((type) => this.deleteTypeSelected$.next(type));
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['adminAction']) {
			this.translateTitle = titleTranslations[this.adminAction || administrationAction.ADD];
		}
	}

	/**
	 *
	 */
	productFormSubmit() {
		const { value } = this.adminProductForm;
		/* 	this.formLoginValues$.next(value);
		this._authUser(); */
	}

	/**
	 *
	 */
	private _getListOfProducts() {
		return combineLatest([this.deleteTypeSelected$, this.refresh$]).pipe(
			switchMap(([type]) => {
				const productControl = this.deleteFormGroup.get('product');
				if (!type) {
					productControl?.disable();
					return of([]);
				}
				productControl?.enable();
				return type === HouseElementsTypes.CONTAINERS
					? this._productsService.getAllModules()
					: this._productsService.getExtrasByType(type);
			})
		);
	}

	/**
	 *
	 */
	private _getIsContainerType() {
		return this.adminProductForm.valueChanges.pipe(
			map(({ type }: { type: HouseElementsTypes }) => {
				const isContainerType = type === HouseElementsTypes.CONTAINERS;
				this._updateSizeControlRequired(isContainerType);
				return isContainerType;
			})
		);
	}

	/**
	 *
	 */
	private _updateSizeControlRequired(isRequired: boolean): void {
		const sizeControl = this.adminProductForm.get('size');
		isRequired ? sizeControl?.setValidators(Validators.required) : sizeControl?.clearValidators();
		sizeControl?.markAsPending();
		sizeControl?.updateValueAndValidity();
	}

	/**
	 *
	 */
	deleteProduct() {
		const {
			value: { type, product }
		} = this.deleteFormGroup;

		(type === HouseElementsTypes.CONTAINERS
			? this._productsService.deleteContainer(product)
			: this._productsService.deleteExtra(product)
		)
			.pipe(first())
			.subscribe((_) => this.refresh$.next(''));
	}
}
