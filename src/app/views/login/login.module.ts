import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { LoginFormModule } from 'src/app/shared/components/login-form/login-form.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginServiceModule } from './service/login.service.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginFormModule,
    LoginServiceModule
  ]
})
export class LoginModule { }
