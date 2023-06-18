import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administation-routing.module';
import { CreateProductFormModule } from 'src/app/views/administration/components/create-products-form/create-product-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsServiceModule } from 'src/app/shared/service/products/products.service.module';
import { ProductsService } from 'src/app/shared/service/products/products.service';
import { DeleteProductFormModule } from './components/delete-products-form/delete-product-form.module';
import { EditProductFormModule } from './components/edit-products-form/edit-product-form.module';
import { AdministrationComponent } from './component/administration.component';
import { UtilsServiceModule } from 'src/app/shared/service/utils/utils.service.module';

@NgModule({
	declarations: [AdministrationComponent],
	imports: [
		CommonModule,
		AdministrationRoutingModule,
		CreateProductFormModule,
		ReactiveFormsModule,
		ProductsServiceModule,
		DeleteProductFormModule,
		EditProductFormModule,
		UtilsServiceModule
	],
	providers: [ProductsService],
	exports: [AdministrationComponent]
})
export class AdministrationModule {}
