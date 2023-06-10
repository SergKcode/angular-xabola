import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizationComponent } from './component/customization/customization.component';
import { CustomizationRoutingModule } from './customization-routing.module';
import { StepperModule } from 'src/app/shared/components/stepper/stepper.module';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';
import { UtilsServiceModule } from 'src/app/shared/service/utils/utils.service.module';
import { ProductsService } from 'src/app/shared/service/products/products.service';

@NgModule({
	declarations: [CustomizationComponent],
	imports: [CommonModule, CustomizationRoutingModule, StepperModule, ProductCardModule, UtilsServiceModule],
	providers: [ProductsService]
})
export class CustomizationModule {}
