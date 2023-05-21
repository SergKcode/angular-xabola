import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { SkeletonCardModule } from '../skeleton-card/skeleton-card.module';

@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    SkeletonCardModule
  ],
  exports:[ProductCardComponent]
})
export class ProductCardModule { }
