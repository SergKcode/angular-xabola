import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/views/customization/model/customization.model';
import { StyleProductsStatus } from '../../model/product-card.config';
import { BehaviorSubject } from 'rxjs';

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

	constructor(private _store: Store) {}

	ngOnInit(): void {}

	productSelectHandler(product: Product) {
		this.productSelected.emit(product);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('1',this.products)
		if (changes['selectedIdProducts']) {
			this.ids = this.selectedIdProducts || [];
		}
		if (changes['products']) {
			this.productImagesLoaded$.next([]);
			this.showSkeletons$.next(true);
		}
	}

	imageLoaded(product: Product) {
		const previousImagesLoaded = this.productImagesLoaded$.getValue();
		this.productImagesLoaded$.next([...previousImagesLoaded, product]);
		this.showSkeletons$.next(this.productImagesLoaded$.getValue().length !== this.products.length);
	}
}
