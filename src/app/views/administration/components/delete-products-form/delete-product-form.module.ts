import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteProductFormComponent } from './component/delete-product-form.component';



@NgModule({
  declarations: [
    DeleteProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[DeleteProductFormComponent]
})
export class DeleteProductFormModule { }
