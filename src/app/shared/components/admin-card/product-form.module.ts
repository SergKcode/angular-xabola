import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './component/product-form/product-form.component';



@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ProductFormComponent]
})
export class ProductFormModule { }
