import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizationComponent } from './component/customization/customization.component';
import { StoreModule } from '@ngrx/store';
import { appFeatureKey } from 'src/app/redux/app.state';
import { appReducer } from 'src/app/redux/app.reducer';
import { CustomizationRoutingModule } from './customization-routing.module';
import { StepperModule } from 'src/app/shared/components/stepper/stepper.module';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';



@NgModule({
  declarations: [
    CustomizationComponent
  ],
  imports: [
    CommonModule,
    CustomizationRoutingModule,
    StoreModule.forFeature(appFeatureKey,appReducer),
    StepperModule,
    ProductCardModule
  ]
})
export class CustomizationModule { }
