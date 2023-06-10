import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductFormComponent } from './component/edit-product-form.component';



@NgModule({
  declarations: [
    EditProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[EditProductFormComponent]
})
export class EditProductFormModule { }
