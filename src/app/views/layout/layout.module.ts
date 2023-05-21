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
    LoginServiceModule

  ],
	providers: [ {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	  }],
  exports:[LayoutComponent]
})
export class LayoutModule { }
