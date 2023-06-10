import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './component/layout/layout.component';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/shared/interceptors/auth.interceptor';
import { LoginServiceModule } from '../login/service/login.service.module';
import { StoreModule } from '@ngrx/store';
import { appFeatureKey } from 'src/app/redux/app.state';
import { appReducer } from 'src/app/redux/app.reducer';
import {  EffectsModule } from '@ngrx/effects';
import { AppEffects } from 'src/app/redux/app.effect';
import { ProductsServiceModule } from 'src/app/shared/service/products/products.service.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
    MenuModule,
    FooterModule,
    LoginServiceModule,
    ProductsServiceModule,
    StoreModule.forFeature(appFeatureKey,appReducer),
    EffectsModule.forFeature([AppEffects])
  
   

  ],
	providers: [ {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	  }],
  exports:[LayoutComponent]
})
export class LayoutModule { }
