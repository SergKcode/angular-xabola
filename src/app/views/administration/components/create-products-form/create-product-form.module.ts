import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProductFormComponent } from './component/create-product-form.component';
import { UtilsServiceModule } from 'src/app/shared/service/utils/utils.service.module';



@NgModule({
  declarations: [
    CreateProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilsServiceModule
  ],
  exports:[CreateProductFormComponent]
})
export class CreateProductFormModule { }
