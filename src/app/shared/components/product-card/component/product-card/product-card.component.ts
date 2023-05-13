
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Container, Extra, Product } from 'src/app/views/customization/model/customization.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() products:any[]=[]
  @Output() productSelected = new EventEmitter<Product>();

  constructor(private _store:Store) { }

  ngOnInit(): void {
  }


  productSelectHandler(product:Product){
    this.productSelected.emit(product)
  }
}
