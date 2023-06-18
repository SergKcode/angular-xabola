import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/model/shared.model';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges, OnInit {
	productImagesLoaded$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	showSkeletons$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	@Input() products: any[] = [];
	@Input() selectedIdProducts: string[] | null = [];
	@Output() productSelected = new EventEmitter<Product>();

	ids: string[] = [];

	constructor() {}

	ngOnInit(): void {}

	/**
	 * evento que emite el producto seleccionado
	 */
	productSelectHandler(product: Product) {
		this.productSelected.emit(product);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['selectedIdProducts']) {
			this.ids = this.selectedIdProducts || [];
		}
		if (changes['products']) {
			this.productImagesLoaded$.next([]);
			this.showSkeletons$.next(true);
		}
	}

	/* Evento de fin de carga de imagen */
	imageLoaded(product: Product) {
		const previousImagesLoaded = this.productImagesLoaded$.getValue();
		this.productImagesLoaded$.next([...previousImagesLoaded, product]);
		this.showSkeletons$.next(this.productImagesLoaded$.getValue().length !== this.products.length);
	}
}
