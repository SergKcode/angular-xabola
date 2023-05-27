import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, first, forkJoin, map, of, switchMap, tap } from 'rxjs';
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
	@Input() adminAction: administrationAction | null = null;
	typeProductSelected$: BehaviorSubject<HouseElementsTypes | null> = new BehaviorSubject<HouseElementsTypes | null>(
		null
	);
	refresh$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	disableSelectProduct$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	idProductSelected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	showSizeEditInput$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	listOfProducts$: Observable<Product[]> = of([]);
	isContainerType$: Observable<boolean> = of(true);
	enableSubmitButton$: Observable<boolean> = of(false);
	enableDeleteSubmitButton$: Observable<boolean> = of(false);
	enableEditSubmitButton$: Observable<boolean> = of(false);
	productToEdit$: Observable<Product | null> = of(null);

	editProductFormGroup: FormGroup = new FormGroup({});
	adminProductForm: FormGroup = new FormGroup({});
	deleteFormGroup: FormGroup = new FormGroup({});
	translateTitle: string = titleTranslations[administrationAction.ADD];
	haveBeenTypeChange: boolean = true;

	constructor(private _formBuilder: FormBuilder, private _productsService: ProductsService) {}

	ngOnInit(): void {
		/* 	this.adminAction = administrationAction.ADD; */
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

		this.editProductFormGroup = this._formBuilder.group({
			product: this._formBuilder.control({ value: '', disabled: true }, Validators.required),
			type: this._formBuilder.control('', Validators.required),
			name: this._formBuilder.control('', Validators.required),
			value: this._formBuilder.control('', Validators.required),
			size: this._formBuilder.control('')
		});

		this.enableDeleteSubmitButton$ = this.deleteFormGroup.valueChanges.pipe(map((_) => this.deleteFormGroup.valid));
		this.enableSubmitButton$ = this.adminProductForm.valueChanges.pipe(map((_) => this.adminProductForm.valid));
		this.enableEditSubmitButton$ = this.editProductFormGroup.valueChanges.pipe(
			map((_) => this.editProductFormGroup.valid
			)
		);
		this.isContainerType$ = this._getIsContainerType();
		this.listOfProducts$ = this._getListOfProducts();
		this.deleteFormGroup.get('type')?.valueChanges.subscribe((type) => {
			this.typeProductSelected$.next(type);
		});

		this.editProductFormGroup.get('type')?.valueChanges.subscribe((type) => {
			this.typeProductSelected$.next(type);
		});

		this.editProductFormGroup.get('product')?.valueChanges.subscribe((product) => {
			this.idProductSelected$.next(product);
		});

		this.productToEdit$ = this._getProductToEdit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['adminAction']) {
			this.translateTitle = this.adminAction ? titleTranslations[this.adminAction] : 'Selecciona una accion';
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

	_getProductToEdit() {
		return combineLatest([this.idProductSelected$, this.typeProductSelected$]).pipe(
			switchMap(([id, type]) => {
				return !type || !id
					? of(null)
					: type === HouseElementsTypes.CONTAINERS
					? this._productsService.getModule(id)
					: this._productsService.getExtra(id);
			}),
			tap((element) => {
				if (element) {
					const { size, name, value, image } = element;
					this.showSizeEditInput$.next(!!size);
					this._updateSizeControlRequired(!!size, this.editProductFormGroup)
					this.editProductFormGroup.patchValue({ name, value, ...(size && { size }) });
				}
			})
		);
	}

	/**
	 *
	 */
	private _getListOfProducts() {
		return combineLatest([this.typeProductSelected$]).pipe(
			switchMap(([type]) => {
				const productControl =
					this.adminAction === administrationAction.DELETE
						? this.deleteFormGroup.get('product')
						: this.editProductFormGroup.get('product');
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
				this._updateSizeControlRequired(isContainerType, this.adminProductForm);
				return isContainerType;
			})
		);
	}

	/**
	 *
	 */
	private _updateSizeControlRequired(isRequired: boolean, formGroup:FormGroup): void {
		const sizeControl = formGroup.get('size');
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
			.subscribe((_) => this.deleteFormGroup.reset());
	}

	/**
	 *
	 */
	editProduct() {
		const { value } = this.editProductFormGroup;
		(value?.type === HouseElementsTypes.CONTAINERS
			? this._productsService.editContainer(this.idProductSelected$.getValue(),value)
			: this._productsService.editExtra(this.idProductSelected$.getValue(),value)
		)
			.pipe(first())
			.subscribe((_) => this.editProductFormGroup.reset());
	}
}
