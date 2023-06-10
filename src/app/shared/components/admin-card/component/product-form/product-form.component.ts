import { Component, Input, AfterContentInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	BehaviorSubject,
	Observable,
	combineLatest,
	distinctUntilChanged,
	first,
	forkJoin,
	map,
	of,
	switchMap,
	tap
} from 'rxjs';
import { titleTranslations } from '../../model/product-form.model';
import { ProductTypeCode, administrationAction } from 'src/app/shared/model/shared.model';
import { Container, Extra, Product } from 'src/app/views/customization/model/customization.model';
import { ProductsService } from 'src/app/shared/service/products/products.service';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges, OnInit {
	@Input() adminAction: administrationAction | null = null;
	action$: BehaviorSubject<administrationAction | null> = new BehaviorSubject<administrationAction | null>(null);
	typeProductSelected$: BehaviorSubject<ProductTypeCode | null> = new BehaviorSubject<ProductTypeCode | null>(
		null
	);
	refresh$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	disableSelectProduct$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	idProductSelected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	showSizeEditInput$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	selectedFile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	isContainerType$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	listOfProducts$: Observable<Product[]> = of([]);

	enableSubmitButton$: Observable<boolean> = of(false);
	enableDeleteSubmitButton$: Observable<boolean> = of(false);
	enableEditSubmitButton$: Observable<boolean> = of(false);
	productToEdit$: Observable<Product | null> = of(null);

	editProductFormGroup: FormGroup = new FormGroup({});
	addNewProductForm: FormGroup = new FormGroup({});
	deleteFormGroup: FormGroup = new FormGroup({});
	translateTitle: string = titleTranslations[administrationAction.ADD];
	haveBeenTypeChange: boolean = true;
	fileLoaded: boolean = false;

	constructor(private _formBuilder: FormBuilder, private _productsService: ProductsService) {}

	ngOnInit(): void {
		/* 	this.adminAction = administrationAction.ADD; */
		this.addNewProductForm = this._formBuilder.group({
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

		this.enableEditSubmitButton$ = this.editProductFormGroup.valueChanges.pipe(
			map((_) => this.editProductFormGroup.valid)
		);

		this.listOfProducts$ = this._getListOfProducts();
		this.deleteFormGroup.get('type')?.valueChanges.subscribe((type) => {
			this.typeProductSelected$.next(type);
		});

		this.editProductFormGroup.get('type')?.valueChanges.subscribe((type) => {
			this.typeProductSelected$.next(type);
		});

		this.addNewProductForm.get('type')?.valueChanges.subscribe((type) => {
			const isContainerType = type === ProductTypeCode.CONTAINERS;
			this._updateSizeControlRequired(isContainerType, this.addNewProductForm);
			this.isContainerType$.next(isContainerType);
		});

		this.enableSubmitButton$ = this.addNewProductForm.statusChanges.pipe(
			map((_) => {
				return this.addNewProductForm.valid;
			})
		);

		this.editProductFormGroup.get('product')?.valueChanges.subscribe((product) => {
			this.idProductSelected$.next(product);
		});

		this.productToEdit$ = this._getProductToEdit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['adminAction']) {
			this.translateTitle = this.adminAction ? titleTranslations[this.adminAction] : 'Selecciona una accion';
			this.action$.next(this.adminAction);
		}
	}

	/**
	 *
	 */
	createNewProductSubmit() {
		const file = this.selectedFile$.getValue();
		const { value } = this.addNewProductForm;

		(value.type === ProductTypeCode.CONTAINERS
			? this._productsService.createNewContainer(value, file)
			: this._productsService.createNewExtra(value, file)
		).subscribe((_) => {
			this.selectedFile$.next(null);
			this.addNewProductForm.reset()
		});
	}

	_getProductToEdit() {
		return combineLatest([this.idProductSelected$, this.typeProductSelected$]).pipe(
			switchMap(([id, type]) => {
				return !type || !id
					? of(null)
					: type === ProductTypeCode.CONTAINERS
					? this._productsService.getModule(id)
					: this._productsService.getExtra(id);
			}),
			tap((element) => {
				if (element) {
					const { size, name, value, image } = element;
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
				return type === ProductTypeCode.CONTAINERS
					? this._productsService.getAllModules()
					: this._productsService.getExtrasByType(type);
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
	deleteProduct() {
		const {
			value: { type, product }
		} = this.deleteFormGroup;

		(type === ProductTypeCode.CONTAINERS
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
		(value?.type === ProductTypeCode.CONTAINERS
			? this._productsService.editContainer(this.idProductSelected$.getValue(), value)
			: this._productsService.editExtra(this.idProductSelected$.getValue(), value)
		)
			.pipe(first())
			.subscribe((_) => this.editProductFormGroup.reset());
	}

	/**
	 *
	 */
	onFileSelected(event: any) {
		this.selectedFile$.next(event.target.files[0] as File);
		this.fileLoaded = false;
	}

	onFileLoad() {
		this.fileLoaded = true;
	}
}
