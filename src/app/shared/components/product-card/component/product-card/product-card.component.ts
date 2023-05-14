
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges   } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Product } from 'src/app/views/customization/model/customization.model';
import { StyleProductsStatus } from '../../model/product-card.config';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges, OnInit {
  @Input() products:any[]=[]
  @Input() selectedIdProducts:string[] |null=[]
  @Output() productSelected = new EventEmitter<Product>();

  ids: string[]=[]

  constructor(private _store:Store) { }

  ngOnInit(): void {
  }

  productSelectHandler(product:Product){
    this.productSelected.emit(product)
  }

  ngOnChanges(changes: SimpleChanges): void {
		if (changes['selectedIdProducts']) {
			this.ids=this.selectedIdProducts ||[]
		}
	}
}
