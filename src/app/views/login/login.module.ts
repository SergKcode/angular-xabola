import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginServiceModule } from './service/login.service.module';
import { StoreModule } from '@ngrx/store';
import { LoginFormModule } from './components/login-form/login-form.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginFormModule,
    LoginServiceModule,
    StoreModule
  ],
})
export class LoginModule { }
