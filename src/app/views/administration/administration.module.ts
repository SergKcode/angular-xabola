import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './component/administration/administration.component';
import { AdministrationRoutingModule } from './administation-routing.module';
import { ProductFormComponent } from 'src/app/shared/components/admin-card/component/product-form/product-form.component';
import { ProductFormModule } from 'src/app/shared/components/admin-card/product-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsServiceModule } from 'src/app/shared/service/products/products.service.module';
import { ProductsService } from 'src/app/shared/service/products/products.service';



@NgModule({
  declarations: [
    AdministrationComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ProductFormModule, 
    ReactiveFormsModule,
    ProductsServiceModule
  ],
  providers:[ProductsService],
  exports:[AdministrationComponent]
})
export class AdministrationModule { }
