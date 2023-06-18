import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { ProductTypeCode, administrationAction } from 'src/app/shared/model/shared.model';
import { ProductsService } from 'src/app/shared/service/products/products.service';
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
		private _utilsService: AbstractUtilsService
	) {}

	ngOnInit(): void {
		/* Declaramos el formulario reactivo */
		this.addNewProductForm = this._formBuilder.group({
			name: this._formBuilder.control('', Validators.required),
			price: this._formBuilder.control('', Validators.required),
			size: this._formBuilder.control(''),
			type: this._formBuilder.control('', Validators.required)
		});

		/* Comprobamos el tipo de producto seleccionado  */
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
	 * Función para enviar al backend el body del nuevo producto a crear
	 */
	createNewProductSubmit() {
		const file = this.selectedFile$.getValue();
		const { value } = this.addNewProductForm;
		this._utilsService
			.getProductTypeIdByTypeCode(value.type)
			.pipe(
				switchMap((typeId) => {
					debugger
					return this._productsService.createNewProduct({ ...value, typeId }, file);
				})
			)
			.subscribe((_) => {
				this.selectedFile$.next(null);
				this.addNewProductForm.reset();
			});
	}

	/**
	 * Actualiza la validación y el estado de un control de formulario en función de si se requiere o no un tamaño.
	 * @param isRequired Indica si se requiere un tamaño o no.
	 * @param formGroup El FormGroup que contiene el control de formulario.
	 */
	private _updateSizeControlRequired(isRequired: boolean, formGroup: FormGroup): void {
		// Obtener una referencia al control de formulario llamado 'size'
		const sizeControl = formGroup.get('size');
		// Establecer o borrar la validación según si se requiere o no un tamaño
		isRequired ? sizeControl?.setValidators(Validators.required) : sizeControl?.clearValidators();
		// Marcar el control como pendiente
		sizeControl?.markAsPending();
		// Actualizar el valor y el estado de validación del control
		sizeControl?.updateValueAndValidity();
	}

	/**
	 * Se dispara cuando se produce un cambio en la seleccion de la imagen
	 */
	onFileSelected(event: any) {
		this.selectedFile$.next(event.target.files[0] as File);
		this.fileLoaded = false;
	}

	
	/**
	 * Función que se dispara cuando se termina de cargar la imagen
	 */
	onFileLoad() {
		this.fileLoaded = true;
	}
}
