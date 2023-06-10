import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { ProductTypeCode, administrationAction } from 'src/app/shared/model/shared.model';
import { ProductsService } from 'src/app/shared/service/products/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { AbstractUtilsService } from 'src/app/shared/service/utils/abstract-utils.service';
import { adminTitleFormsTranslations } from '../../../model/admin.model';

@Component({
	selector: 'app-create-product-form',
	templateUrl: './create-product-form.component.html',
	styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent implements OnInit {
	selectedFile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	isContainerType$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	enableSubmitButton$: Observable<boolean> = of(false);

	addNewProductForm: FormGroup = new FormGroup({});
	translateTitle: string = adminTitleFormsTranslations[administrationAction.ADD];
	fileLoaded: boolean = false;

	constructor(
		private _formBuilder: FormBuilder,
		private _productsService: ProductsService,
		private _store: Store<AppState>,
		private _utilsService: AbstractUtilsService
	) {}

	ngOnInit(): void {
		this.addNewProductForm = this._formBuilder.group({
			name: this._formBuilder.control('', Validators.required),
			price: this._formBuilder.control('', Validators.required),
			size: this._formBuilder.control(''),
			type: this._formBuilder.control('', Validators.required)
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
	}

	/**
	 *
	 */
	createNewProductSubmit() {
		const file = this.selectedFile$.getValue();
		const { value } = this.addNewProductForm;
		this._utilsService
			.getProductTypeIdByTypeCode(value.type)
			.pipe(
				switchMap((typeId) => {
					return this._productsService.createNewProduct({ ...value, typeId }, file);
				})
			)
			.subscribe((_) => {
				this.selectedFile$.next(null);
				this.addNewProductForm.reset();
			});
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
	onFileSelected(event: any) {
		this.selectedFile$.next(event.target.files[0] as File);
		this.fileLoaded = false;
	}

	onFileLoad() {
		this.fileLoaded = true;
	}
}
