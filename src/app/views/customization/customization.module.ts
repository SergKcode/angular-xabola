import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizationComponent } from './component/customization/customization.component';
import { CustomizationRoutingModule } from './customization-routing.module';
import { StepperModule } from 'src/app/shared/components/stepper/stepper.module';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';
import { ProductsServiceModule } from 'src/app/shared/service/products/products.service.module';



@NgModule({
  declarations: [
    CustomizationComponent
  ],
  imports: [
    CommonModule,
    CustomizationRoutingModule,
    StepperModule,
    ProductCardModule,
    ProductsServiceModule
  ]
})
export class CustomizationModule { }
