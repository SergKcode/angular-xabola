import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ProductCardComponent]
})
export class ProductCardModule { }
